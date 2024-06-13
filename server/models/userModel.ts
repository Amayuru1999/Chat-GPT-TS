import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  customerId?: string;
  subscription?: string;
  matchPassword(password: string): Promise<boolean>;
  getSignedToken(res: Response): void;
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: [true, 'Username is Required']
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    minLength: [6, 'Password length should be greater than 6 characters']
  },
  customerId: {
    type: String,
    default: ''
  },
  subscription: {
    type: String,
    default: ''
  },
});

// hashed password before saving (pre)
userSchema.pre<UserDocument>('save', async function (next) {
  // update
  if (!this.isModified('password')) {
    return next();
  }
  // hashing
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// match password
userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// SIGN TOKEN
userSchema.methods.getSignedToken = function (this: UserDocument, res: Response) {
  const accessToken = jwt.sign(
    {
      id: this._id
    },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIREIN as string
    }
  );

  const refreshToken = jwt.sign(
    {
      id: this._id
    },
    process.env.JWT_REFRESH_TOKEN as string,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIREIN as string
    }
  );

  res.cookie('refreshToken', `${refreshToken}`, {
    maxAge: 86400 * 7000,
    httpOnly: true,
  });
};

const User: Model<UserDocument> = mongoose.model('User', userSchema);

export default User;
