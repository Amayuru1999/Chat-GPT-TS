import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel'; // Adjust the import
import errorResponse from '../utils/errorResponse';

// JWT TOKEN
const sendToken = (user: any, statusCode: number, res: Response) => { // Update the type of 'user'
  const token = user.getSignedToken(); // Adjust the method call
  res.status(statusCode).json({
    success: true,
    token,
  });
};

// REGISTER
export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    // existing user
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already registered", 500));
    }
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// LOGIN
export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials", 401));
    }
    // res
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// LOGOUT
export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logged out Successfully",
  });
};
