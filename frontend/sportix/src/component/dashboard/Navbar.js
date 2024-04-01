import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../images/Sportslogo.png";
import { Select, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import { Menu } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dropdown from "./Dropdown";
import CricketLogo from "../images/icon2.png";
import futsalLogo from "../images/op5.png";
import badmintonLogo from "../images/op1.png";
import vollyBallLogo from "../images/op3.png";
import basketballLogo from "../images/op2.png";
import "./Navbar.css"
const Navbar = () => {
  const cricketLogo = (
    <img
      src={CricketLogo}
      alt="Cricket Logo"
      style={{ width: "24px", height: "24px", marginRight: "10px" }}
    />
  );
  const FutsalLogo = (
    <img
      src={futsalLogo}
      alt="Cricket Logo"
      style={{ width: "24px", height: "24px", marginRight: "10px" }}
    />
  );
  const BadmintonLogo = (
    <img
      src={badmintonLogo}
      alt="Cricket Logo"
      style={{ width: "24px", height: "24px", marginRight: "10px" }}
    />
  );
  const VollyBallLogo = (
    <img
      src={vollyBallLogo}
      alt="Cricket Logo"
      style={{ width: "24px", height: "24px", marginRight: "10px" }}
    />
  );
  const BasketballLogo = (
    <img
      src={basketballLogo}
      alt="Cricket Logo"
      style={{ width: "24px", height: "24px", marginRight: "10px" }}
    />
  );
  const [scheduleAnchorEl, setScheduleAnchorEl] = useState(null);

  const handleScheduleOpenMenu = (event) => {
    setScheduleAnchorEl(event.currentTarget);
  };

  const handleScheduleCloseMenu = () => {
    setScheduleAnchorEl(null);
  };
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuItemClick = (route) => {
    navigate(route);
    setMenuAnchorEl(null);
  };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const [aanchorEl, setAanchorEl] = useState(null);

  const HHandleOpenMenu = (event) => {
    setAanchorEl(event.currentTarget);
  };

  const HHandleCloseMenu = () => {
    setAanchorEl(null);
  };
  const [AnchorEl1, setAnchorEl1] = useState(null);

  const handleOpenMenu1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleCloseMenu1 = () => {
    setAnchorEl1(null);
  };
  const [AnchorEl, setAnchorel] = useState(null);

  const HandleOpenMenu = (event) => {
    setAnchorel(event.currentTarget);
  };

  const HandleCloseMenu = () => {
    setAnchorel(null);
  };
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleSelect = (selectedOption) => {
    console.log(`Selected option: ${selectedOption}`);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    
    navigate("/", { replace: true }); 
  };
  
  return (
    <>
      <AppBar position="relative" sx={{ background: "#4CAF50", color: "#fff" }}>
        <Toolbar>
          <Stack direction="row">
            <img src={logo} style={{ width: "42px", height: "42px" }} />
            <div className="Logo">
            <IconButton onClick={() => navigate("/Home")}>
              <Typography
                variant="h5"
                fontFamily="Sedgwick Ave Display"
                color="#fff"
              >
                SportiX
              </Typography>
              </IconButton>
            </div>
          </Stack>
          <Container
            sx={{ display: "flex", justifyContent: "end", mr: "20px" }}
          >
            <Stack direction="row" spacing={3}>
              <IconButton onClick={() => navigate("/Home")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="#fff"
                >
                  Home
                </Typography>
              </IconButton>

              <IconButton onClick={() => navigate("/Inventory")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="#fff"
                >
                  Inventory
                </Typography>
              </IconButton>

              <IconButton onClick={handleOpenMenu}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="#fff"
                >
                  <ArrowDropDownIcon />
                  Booking
                </Typography>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => navigate("/BookingDash")}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    fontFamily="Ysabeau"
                    color="black"
                  >
                    Equipment Booking
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/VenueDash")}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    fontFamily="Ysabeau"
                    color="black"
                  >
                    Venue Booking
                  </Typography>
                </MenuItem>
              </Menu>
             
              <IconButton onClick={() => navigate("/BiddingDash")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="#fff"
                >
                  Auction
                </Typography>
              </IconButton>
              
              <IconButton onClick={() => navigate("/League")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="#fff"
                >
                  League
                </Typography>
              </IconButton>
              
              <IconButton onClick={handleMenuClick}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="#fff"
                >
                  <ArrowDropDownIcon />
                  Teams
                </Typography>
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                keepMounted
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleMenuItemClick("/_Cricket")}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    fontFamily="Ysabeau"
                    color="black"
                  >
                    {cricketLogo} Cricket
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/_Futsal")}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    fontFamily="Ysabeau"
                    color="black"
                  >
                    {FutsalLogo} Futsal
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/_Badminton")}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    fontFamily="Ysabeau"
                    color="black"
                  >
                    {BadmintonLogo} Badminton
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/_Vollyball")}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    fontFamily="Ysabeau"
                    color="black"
                  >
                    {VollyBallLogo} VollyBall
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/_Basketball")}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    fontFamily="Ysabeau"
                    color="black"
                  >
                    {BasketballLogo} BasketBall
                  </Typography>
                </MenuItem>
              </Menu>
              <IconButton onClick={handleScheduleOpenMenu}>
              <Typography
                display="flex"
                alignItems="center"
                fontFamily="Ysabeau"
                color="#fff"
              >
                <ArrowDropDownIcon />
                Schedule
              </Typography>
            </IconButton>
            <Menu
              anchorEl={scheduleAnchorEl}
              keepMounted
              open={Boolean(scheduleAnchorEl)}
              onClose={handleScheduleCloseMenu}
            >
              <MenuItem onClick={() => navigate("/CricketDash")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="black"
                >
                  Cricket
                </Typography>
              </MenuItem>
              
              <MenuItem onClick={() => navigate("/FutsalDash")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="black"
                >
                  Futsal
                </Typography>
              </MenuItem>
              
              <MenuItem onClick={() => navigate("/BadmintonDash")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="black"
                >
                  Badminton
                </Typography>
              </MenuItem>
              
              <MenuItem onClick={() => navigate("/BasketballDash")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="black"
                >
                  Basketball
                </Typography>
              </MenuItem>
              
              <MenuItem onClick={() => navigate("/VollyDash")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="black"
                >
                  Vollyball
                </Typography>
              </MenuItem>
            </Menu>
            <IconButton onClick={() => navigate("/Result")}>
                <Typography
                  display="flex"
                  alignItems="center"
                  fontFamily="Ysabeau"
                  color="#fff"
                >
                  
                  &nbsp;Result
                </Typography>
                </IconButton>
                <IconButton onClick={handleLogout}>
      <Typography
        display="flex"
        alignItems="center"
        fontFamily="Ysabeau"
        color="#fff"
      >
        <AiOutlineLogout />
        &nbsp;Logout
      </Typography>
    </IconButton>
             
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
