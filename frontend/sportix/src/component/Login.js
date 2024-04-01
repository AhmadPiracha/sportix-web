import React, { useState } from "react";
import {
  Button,
  CardContent,
  Container,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import FrontPic from "./images/aa.jpg";
import Logo from "./images/Sportslogo.png";
import axios from "axios";
import LoginIcon from "@mui/icons-material/Login";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleAdd = (e) => {
    if (user.email === "") {
      NotificationManager.warning("", "Please Enter Your Email", 3000);
    } else if (user.password === "") {
      NotificationManager.warning("", "Please Enter Your Password", 3000);
    } else {
      e.preventDefault();
      axios
        .post("http://localhost:8001/AdminLogin", {
          email: user.email,
          password: user.password,
        })
        .then((response) => {
          if (response.data.message) {
            alert("Wrong password");
          } else {
            const token = response.data.token;
            console.log(token)
            localStorage.setItem('token', token);
            NotificationManager.success("Successfully Logged in");
            window.location.href = "/Home";
          }
        })
        .catch((error) => {
          
          console.error("Login failed:", error);
        })
        .finally(() => {
          setUser({
            email: "",
            password: "",
          });
        });
    }
  };
    return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          lg={6}
          sm={12}
          sx={{
            backgroundImage: `url(${FrontPic})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid item lg={6} sm={12} sx={{ background: "#242629", pl: "60px" }}>
          <Card
            sx={{
              width: 480,
              background: "#242629",
              border: "none",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography textAlign="center">
                <img src={Logo} style={{ width: "200px", height: "200px" }} />
              </Typography>
              <Typography variant="h5" color="#fff">
                <b>Login</b>
              </Typography>
              <Typography textAlign="start">
                <label style={{ color: "#A6ADB8" }}> Email</label>
              </Typography>
              <TextField
                id="outlined-basic"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  border: "1px solid #A3A9B2",
                  color: "#fff",
                  width: "100%",
                  borderRadius: 2,
                }}
              />
              <br />
              <br />
              <Typography textAlign="start">
                <label style={{ color: "#A6ADB8" }}> Password</label>
              </Typography>
              <TextField
                id="outlined-basic"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  border: "1px solid #A3A9B2",
                  width: "100%",
                  borderRadius: 2,
                }}
              />
              <br />
              <br />
              <button
                className="button-85" 
                role="button"
                onClick={handleAdd}
              >
                <LoginIcon />
                Login
              </button>

              <br />
              <br />
              
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <NotificationContainer />
    </>
  );
};

export default Login;
