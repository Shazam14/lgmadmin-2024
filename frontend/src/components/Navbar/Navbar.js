import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.grey[100] }}>
      <Toolbar>
        <Typography
          variant="body1"
          component={Link}
          to="/"
          sx={{
            marginRight: theme.spacing(2),
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          Home
        </Typography>
        <Typography
          variant="body1"
          component={Link}
          to="/chatbot"
          sx={{
            marginRight: theme.spacing(2),
            color: "#286e34",
            textDecoration: "none",
          }}
        >
          Chatbot
        </Typography>
        <Button
          aria-controls="courses-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{
            marginRight: theme.spacing(2),
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          Courses
        </Button>
        <Menu
          id="courses-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/courses" onClick={handleMenuClose}>
            All Courses
          </MenuItem>
        </Menu>
        <Typography
          variant="body1"
          component={Link}
          to="/about"
          sx={{
            marginRight: theme.spacing(2),
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          About
        </Typography>
        <Typography
          variant="body1"
          component={Link}
          to="/contact"
          sx={{
            marginRight: theme.spacing(2),
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          component={Link}
          to="/enroll"
          sx={{
            marginRight: theme.spacing(2),
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          Enroll
        </Typography>
        <Button
          aria-controls="portal-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          LGMS Portal
        </Button>
        <Menu
          id="portal-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/portal" onClick={handleMenuClose}>
            Portal Home
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
