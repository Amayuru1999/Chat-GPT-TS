import React from "react";
import { Box, Typography, useTheme, Theme } from "@mui/material";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const theme: Theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken") || "false");

  // handle logout
  const handleLogout = async () => {
    try {
      await axios.post("https://chatgpt-clone-server-p2dj.onrender.com/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      width="100%"
      p="1rem 6%"
      textAlign="center"
      sx={{ 
        backgroundColor: theme.palette.background.default, // Changed from 'alt' to 'default'
        boxShadow: 3, 
        mb: 2 
      }}
    >
      <Typography variant="h1" color="primary" fontWeight="medium">
        <Link to="/">AI GPT3 Clone</Link>
      </Typography>
      {loggedIn ? (
        <>
          <NavLink to="/" style={{ padding: "1rem" }}>
            Home
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} style={{ padding: "1rem" }}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/" style={{ padding: "1rem" }}>
            Home
          </NavLink>
          <NavLink to="/register" style={{ padding: "1rem" }}>
            Register
          </NavLink>
          <NavLink to="/login" style={{ padding: "1rem" }}>
            Login
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
