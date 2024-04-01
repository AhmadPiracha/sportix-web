import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Button,
  Modal,
  TextField,
  CardContent,
  Card,
} from "@mui/material";
import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Stack,
  TableBody,
} from "@mui/material";
import { Link ,useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { RxUpdate } from "react-icons/rx";
import Fron from "../images/opll.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Header from "../Resuable/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import Logo from "../images/sps.png";
import ReactHTMLTableToExcel from "react-html-table-to-excel";


const Managevenue = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Mono", "monospace"].join(","),
      fontSize: 16,
      fontWeightBold: 600,
    },
  });

  const navigate = useNavigate();
  const [temp, setTemp] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [cric, setCric] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [venueToUpdate, setVenueToUpdate] = useState({
    id: "",
    name: "",
    type: "",
    location: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/getVenue");

      if (result?.data) setCric(result.data);
    };

    fetchData();
  }, []);
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);
  const delVenue = (id) => {
    NotificationManager.error(
      "Error message",
      "Deleted Successfully",
      50000,
      () => {
        alert("callback");
      }
    );

    axios
      .put("http://localhost:8001/deleteVenue", {
        id: id,
      })
      .then((res) => {
        if (res) {
          alert(res.data.message);
        } else {
          alert("Deleted successfully");
        }
      });

    window.location.reload(false);
  };
  const openUpdateModal = (venue) => {
    setVenueToUpdate(venue);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };
  const updateVenue = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const locationTypeRegex = /^[A-Za-z0-9\s]+$/;
  
    if (venueToUpdate.name.trim() === "") {
      NotificationManager.error("", "Venue name cannot be empty.");
      return;
    }
  
    if (venueToUpdate.type.trim() === "") {
      NotificationManager.error("", "Venue type cannot be empty.");
      return;
    }
  
    if (venueToUpdate.location.trim() === "") {
      NotificationManager.error("", "Venue location cannot be empty.");
      return;
    }
  
    if (!nameRegex.test(venueToUpdate.name)) {
      NotificationManager.error(
        "",
        "Invalid venue name. Only letters and spaces are allowed."
      );
      return;
    }
  
    if (!locationTypeRegex.test(venueToUpdate.type)) {
      NotificationManager.error(
        "",
        "Invalid venue type. Only letters, numbers, and spaces are allowed."
      );
      return;
    }
  
    if (!locationTypeRegex.test(venueToUpdate.location)) {
      NotificationManager.error(
        "",
        "Invalid venue location. Only letters, numbers, and spaces are allowed."
      );
      return;
    }
    axios
      .put(`http://localhost:8001/updateVenue/${venueToUpdate.id}`, {
        name: venueToUpdate.name,
        type: venueToUpdate.type,
        location: venueToUpdate.location,
      })
      .then((response) => {
        if (response.data.message) {
          NotificationManager.success("Venue updated successfully");
          closeUpdateModal();
          fetchData();
        } else {
          console.error("Error updating venue: ", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating venue: ", error);
      });
  };
  
  const fetchData = async () => {
    const result = await axios("http://localhost:8001/getVenue");
    setCric(result.data);
  };

  return (
    <>
      <div style={{ background: "#EDEDED" }}>
        <Navbar />
        <Header backgroundImage={Fron} title={"Manage"} title1={"Venue"} />
        <ThemeProvider theme={theme}>
          {!temp ? (
            <>
              {cric.length >= 0 && (
                <Container maxWidth="lg" sx={{ mt: "40px" }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Link to="/Inventory" style={{ textDecoration: "none" }}>
                      {" "}
                      <button class="bn30" role="button">
                        <ArrowBackIcon />
                        Back
                      </button>
                    </Link>
                    <Link to="/Addvenue" style={{ textDecoration: "none" }}>
                      <button class="button-85" role="button">
                        <AddIcon />
                        Add Venue
                      </button>
                    </Link>
                    <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-success mb-4"
              table="table-to-xls"
              filename="Inventory Record"
              sheet="tablexls"
              buttonText="Record"
            />
                  </Stack>
                  <br />
                  <TableContainer component={Paper}>
                  <Table id="table-to-xls">
                      <TableHead sx={{ background: "#8BC34A" }}>
                        <TableRow>
                          <TableCell>
                            <Typography
                              color="white"
                              variant="h6"
                              fontWeight="bold"
                            >
                              Id
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              color="white"
                              variant="h6"
                              fontWeight="bold"
                            >
                              Venue
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              color="white"
                              variant="h6"
                              fontWeight="bold"
                            >
                              Type
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              color="white"
                              variant="h6"
                              fontWeight="bold"
                            >
                              Location
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              color="white"
                              variant="h6"
                              fontWeight="bold"
                            >
                              Action
                            </Typography>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cric.map((p) => {
                          return (
                            <TableRow key={p.id}>
                              <TableCell>
                                <Typography variant="subtitle1">{p.id}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">{p.name}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">{p.type}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">{p.location}</Typography>
                              </TableCell>
                              <TableCell>
                                <button
                                  class="custom-button small"
                                  role="button"
                                  onClick={() => delVenue(p.id)}
                                >
                                  <DeleteIcon />
                                  Delete
                                </button>
                              </TableCell>
                              <TableCell>
                                <button
                                  class="button-32"
                                  role="button"
                                  onClick={() => openUpdateModal(p)}
                                >
                                  <RxUpdate />
                                  Update
                                </button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br />
                </Container>
              )}
            </>
          ) : (
            <></>
          )}
          <NotificationContainer />
        </ThemeProvider>
      </div>

      <Modal
        open={updateModalOpen}
        onClose={closeUpdateModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ padding: "20px", minWidth: "400px", maxWidth: "80%" }}>
          <Container maxWidth="md">
            <Card>
            <Typography textAlign="center">
                <img src={Logo} style={{ width: "200px", height: "200px" }} />
              </Typography>
              <CardContent>
                <div className="gradient-text">
                  <Typography textAlign="center" variant="h5">
                    Update Venue
                  </Typography>
                </div>

                <br />
                <Stack direction="row" justifyContent="space-evenly">
                  <TextField
                    label="Venue Name"
                    name="name"
                    value={venueToUpdate.name}
                    onChange={(e) =>
                      setVenueToUpdate({
                        ...venueToUpdate,
                        name: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Venue Type"
                    name="type"
                    value={venueToUpdate.type}
                    onChange={(e) =>
                      setVenueToUpdate({
                        ...venueToUpdate,
                        type: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Stack>
                <TextField
                  label="Venue Location"
                  name="location"
                  value={venueToUpdate.location}
                  onChange={(e) =>
                    setVenueToUpdate({
                      ...venueToUpdate,
                      location: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Stack direction="row" justifyContent="space-evenly">
                  <button
                    class="button-85"
                    role="button"
                    onClick={updateVenue}
                  >
                    <AddIcon />
                    Update Venue
                  </button>
                </Stack>
              </CardContent>
            </Card>
          </Container>
        </Paper>
      </Modal>
    </>
  );
};

export default Managevenue;
