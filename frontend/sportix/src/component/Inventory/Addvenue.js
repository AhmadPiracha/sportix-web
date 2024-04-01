import React, { useState,useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import {
  Card,
  CardContent,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Axios from "axios";
import Logo from "../images/plq.png";
import Fron from "../images/ll.jpg";
import AddIcon from "@mui/icons-material/Add";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Header from "../Resuable/Header";

const Addvenue = () => {
  const currentDate = new Date().toISOString().split("T")[0];

  const [user, setUser] = useState({
    Name: "",
    Type: "",
    Location: "",
    date: "",
  });

  const [validation, setValidation] = useState({
    nameError: "",
    typeError: "",
    locationError: "",
    dateError: "",
  });
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);
  const v = ["Cricket", "Futsal", "Badminton", "BasketBall", "Volleyball", "Others"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validate = () => {
    const regex1 = /^[A-Za-z\s]*[A-Za-z\s][A-Za-z\s]*$/;
    let isValid = true;

    if (user.Name === "") {
      setValidation((prevState) => ({
        ...prevState,
        nameError: "Venue Name cannot be empty",
      }));
      isValid = false;
    } else if (!regex1.test(user.Name)) {
      setValidation((prevState) => ({
        ...prevState,
        nameError: "Venue Name doesn't include special characters or Numbers",
      }));
      isValid = false;
    } else {
      setValidation((prevState) => ({ ...prevState, nameError: "" }));
    }

    if (user.Type === "") {
      setValidation((prevState) => ({
        ...prevState,
        typeError: "Venue Type required",
      }));
      isValid = false;
    } else {
      setValidation((prevState) => ({ ...prevState, typeError: "" }));
    }

    if (user.Location === "") {
      setValidation((prevState) => ({
        ...prevState,
        locationError: "Venue Location required",
      }));
      isValid = false;
    } else if (!regex1.test(user.Location)) {
      setValidation((prevState) => ({
        ...prevState,
        locationError: "Venue Location doesn't include special characters or Numbers",
      }));
      isValid = false;
    } else {
      setValidation((prevState) => ({ ...prevState, locationError: "" }));
    }

    
    return isValid;
  };

  const handleAdd = () => {
    if (validate()) {
      Axios.post("http://localhost:8001/addVenue", {
        Name: user.Name,
        Type: user.Type,
        Location: user.Location,
        date: currentDate,
      }).then((response) => {
        if (response.data.message) {
          NotificationManager.error("", response.data.message, 50000, () => {});
        }  else {
          NotificationManager.success("Venue Added Successfully");
          window.location.href = "/Managevenue";
        }
      });
    }
  };

  return (
    <div style={{background:'#EDEDED'}}>
      <Navbar />
      <Header backgroundImage={Fron} title={"Add"} title1={"Venue"} />
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
                <b>Add Sports Venue</b>
              </Typography>
            </div>

            <br />
            <Stack direction="row" justifyContent="space-evenly">
              <TextField
                variant="outlined"
                value={user.Name}
                label="Venue Name"
                name="Name"
                onChange={handleChange}
                sx={{ width: "40%" }}
                error={!!validation.nameError}
                helperText={validation.nameError}
              />
              <TextField
                variant="outlined"
                value={user.Type}
                label="Sports Venue Type"
                name="Type"
                onChange={handleChange}
                sx={{ width: "40%" }}
                select
                error={!!validation.typeError}
                helperText={validation.typeError}
              >
                {v.map((a) => {
                  return <MenuItem value={a}>{a}</MenuItem>;
                })}
              </TextField>
            </Stack>
            <br />
            <Stack direction="row" justifyContent="space-evenly">
              <TextField
                variant="outlined"
                value={user.Location}
                label="Venue Location"
                name="Location"
                onChange={handleChange}
                sx={{ width: "40%" }}
                error={!!validation.locationError}
                helperText={validation.locationError}
              />
            </Stack>
            <br />
            <Stack direction="row" justifyContent="space-evenly">
              <Typography fontFamily={"Kanit"}>
                <button className="button-85" role="button" onClick={handleAdd}>
                  <AddIcon />
                  Add Venue
                </button>
              </Typography>
            </Stack>
            <br />
          </CardContent>
        </Card>
      </Container>
      <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
      <NotificationContainer />
    </div>
  );
};

export default Addvenue;
