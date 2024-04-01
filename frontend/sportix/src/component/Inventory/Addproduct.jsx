import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Axios from "axios";
import Logo from "../images/sps.png";
import Fron from "../images/fro.jpg";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Home from "../dashboard/Home";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./Button.css";
import Header from "../Resuable/Header";
import { createTheme, ThemeProvider } from "@mui/material";

const Addproduct = () => {
  var date = new Date();
  var mindate = date - 1;
  const currentDate = new Date().toISOString().split("T")[0];
  const [user, setUser] = useState({
    Name: "",
    Type: "",
    quantity: 0,
    Count: "",
    date: "",
  });

  const [validation, setValidation] = useState({
    typeError: "",
    nameError: "",
    countError: "",
    dateError: "",
  });

  const [equipmentNames, setEquipmentNames] = useState([]);

  const v = [
    "Cricket",
    "Futsal",
    "Badminton",
    "BasketBall",
    "Volleyball",
    "Others",
  ];
  useEffect(() => {
    let newEquipmentNames = [];

    if (user.Type === "Cricket") {
      newEquipmentNames = ["Bat", "Ball", "Gloves", "Helmet", "Pads"];
    } else if (user.Type === "Futsal") {
      newEquipmentNames = [
        "Futsal Ball",
        "Goalkeeper Gloves",
        "Shoes",
        "Jersey",
      ];
    } else if (user.Type === "Badminton") {
      newEquipmentNames = ["Racket", "Shuttlecock", "Shoes", "Grip"];
    } else if (user.Type === "BasketBall") {
      newEquipmentNames = ["Basketball", "Jersey", "Shoes", "Hoops"];
    } else if (user.Type === "Volleyball") {
      newEquipmentNames = ["Volleyball", "Knee Pads", "Shoes", "Jersey"];
    } else {
      newEquipmentNames = [];
    }

    setEquipmentNames(newEquipmentNames);
  }, [user.Type]);

  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);

  const disableDates = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validate = () => {
    const regex1 = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
    const regex = /^(?!0$)[1-9][0-9]*$/;
    let isValid = true;

    if (user.Type === "") {
      setValidation((prevState) => ({
        ...prevState,
        typeError: "Equipment Type Required",
      }));
      isValid = false;
    } else {
      setValidation((prevState) => ({ ...prevState, typeError: "" }));
    }

    if (user.Name === "") {
      setValidation((prevState) => ({
        ...prevState,
        nameError: "Equipment Name Cannot be empty",
      }));
      isValid = false;
    } else if (!regex1.test(user.Name)) {
      setValidation((prevState) => ({
        ...prevState,
        nameError: "Equipment Name Doesn't Include Special Character",
      }));
      isValid = false;
    } else {
      setValidation((prevState) => ({ ...prevState, nameError: "" }));
    }

    if (user.Count === "") {
      setValidation((prevState) => ({
        ...prevState,
        countError: "Equipment Count Required",
      }));
      isValid = false;
    } else if (!regex.test(user.Count)) {
      setValidation((prevState) => ({
        ...prevState,
        countError:
          "Equipment Count Doesn't Include Special Character, Alphabets or Zero Value",
      }));
      isValid = false;
    } else {
      setValidation((prevState) => ({ ...prevState, countError: "" }));
    }

    return isValid;
  };

  const handleAdd = () => {
    if (validate()) {
      Axios.post("http://localhost:8001/addEquipment", {
        Name: user.Name,
        Type: user.Type,
        quantity: user.quantity,
        Count: user.Count,
        date: currentDate,
      }).then((response) => {
        if (response.data.message) {
          NotificationManager.error("", response.data.message, 50000, () => {});
        } else {
          NotificationManager.success("Product Added Successfully");
          window.location.href = "/ManageInventory";
        }
      });
    }
  };

  const navigate = useNavigate();
  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Mono", "monospace"].join(","),
      fontSize: 16,
      fontWeightBold: 600,
    },
  });

  return (
    <div>
      <Navbar />
      <Header backgroundImage={Fron} title={"Add"} title1={"Equipments"} />
      <br />
      <br />
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Card sx={{ borderRadius: "30px", border: "2px solid black" }}>
            <Typography textAlign="center">
              <img src={Logo} style={{ width: "200px", height: "200px" }} />
            </Typography>
            <CardContent>
              <div className="gradient-text">
                <Typography textAlign="center" variant="h5">
                  Add Sports Equipment
                </Typography>
              </div>

              <br />

              <Stack direction="row" justifyContent="space-evenly">
                <TextField
                  variant="outlined"
                  value={user.Type}
                  label="Sports Equipment Type"
                  name="Type"
                  onChange={handleChange}
                  sx={{ width: "40%" }}
                  select
                  error={!!validation.typeError}
                  helperText={validation.typeError}
                >
                  {v.map((a) => (
                    <MenuItem key={a} value={a}>
                      {a}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  value={user.Name}
                  label="Equipment Name"
                  name="Name"
                  onChange={handleChange}
                  sx={{ width: "40%" }}
                  error={!!validation.nameError}
                  helperText={validation.nameError}
                  select
                  disabled={equipmentNames.length === 0}
                >
                  {equipmentNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <br />
              <Stack direction="row" justifyContent="space-evenly">
                <TextField
                  variant="outlined"
                  type="number"
                  value={user.Count}
                  label="Total Count"
                  name="Count"
                  onChange={handleChange}
                  sx={{ width: "30%" }}
                  error={!!validation.countError}
                  helperText={validation.countError}
                ></TextField>
              </Stack>
              <br />
              <Stack direction="row" justifyContent="space-evenly">
                <Typography fontFamily={"Kanit"}>
                  {" "}
                  <button
                    className="button-85"
                    role="button"
                    onClick={handleAdd}
                  >
                    <AddIcon />
                    Add Equipment
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
      </ThemeProvider>
      <NotificationContainer />
    </div>
  );
};

export default Addproduct;
