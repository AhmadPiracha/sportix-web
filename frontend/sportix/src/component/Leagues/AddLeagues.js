import React, { useState ,useEffect} from "react";
import Navbar from "../dashboard/Navbar";
import {
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Axios from "axios";
import Logo from "../images/Leg.png";
import Fron from "../images/mkm.jpg";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../Resuable/Header";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
const AddLeagues = () => {
  const [user, setUser] = useState({
    Name: "",
    Type: "",
  });

  const [errors, setErrors] = useState({});

  const v = ["Cricket", "Futsal"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);
  const handleAdd = () => {
    const regex1 = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
    const regex = /^(?!0$)[1-9][0-9]*$/;
    
    const newErrors = {};

    if (!user.Type) {
      newErrors.Type = "Sports Type is required";
    }
    if (!user.Name) {
      newErrors.Name = "League Name is required";
    }
    else if (!regex1.test(user.Name)) {
      newErrors.Name = "League Name should not include special characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      
      Axios.post("http://localhost:8001/addLeague", {
        Name: user.Name,
        Type: user.Type,
      }).then((response) => {
        if (response.data.message) {
          NotificationManager.error("", "League is Already Registerd", 50000, () => {});
        } else {
          NotificationManager.success(
            "",
            "League Registered",
            6000 
          );
          window.location="/League";
        }
      });
    }
  };

  return (
    <div style={{background:'#EDEDED'}}>
      <Navbar />
      <Header backgroundImage={Fron} title={"League"} title1={"Registration"} />
      <br />
      <br />
      <Container maxWidth="md">
        <Card sx={{ borderRadius: "30px", border: "2px solid black" }}>
          <Typography textAlign="center">
            <img src={Logo} style={{ width: "200px", height: "200px" }} />
          </Typography>
          <CardContent>
            <div className="gradient-text">
              <Typography textAlign="center" variant="h5" fontFamily={"Kanit"}>
                <b>Register League</b>
              </Typography>
            </div>
            <br />
            <Stack direction="row" justifyContent="space-evenly">
              <TextField
                variant="outlined"
                value={user.Type}
                label="Sports Type"
                name="Type"
                onChange={handleChange}
                error={Boolean(errors.Type)}
                helperText={errors.Type}
                sx={{ width: "40%" }}
                select
              >
                {v.map((a) => {
                  return <MenuItem value={a}>{a}</MenuItem>;
                })}
              </TextField>

              <TextField
                variant="outlined"
                value={user.Name}
                label="League Name"
                name="Name"
                onChange={handleChange}
                error={Boolean(errors.Name)}
                helperText={errors.Name}
                sx={{ width: "40%" }}
              ></TextField>
            </Stack>
            <br />
            <br />
            <Stack direction="row" justifyContent="space-evenly">
              <Link to="/League" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="medium" color="error" style={{marginTop: '7px'}} >
                  <ArrowBackIcon />
                  Back
                </Button>
              </Link>
              <Typography fontFamily={"Kanit"}>
                {" "}
                <button class="button-85" role="button" onClick={handleAdd}>
                  <AddIcon />
                  Register League
                </button>
              </Typography>
            </Stack>
            <br />
          </CardContent>
        </Card>
      </Container>
      <>
        <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
        
      </>
      <NotificationContainer />
    </div>
  );
};

export default AddLeagues;
