import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import axios from "axios";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Paper,
  Table,
  TableHead,
  TableContainer,
  Typography,
  MenuItem,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { RxUpdate } from "react-icons/rx";
import DeleteIcon from "@mui/icons-material/Delete";
import Fron from "../images/jmk.jpg";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { RiTeamFill } from "react-icons/ri";
import { MdSportsVolleyball } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import "../Inventory/inventory.css";
import Axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Logo from "../images/pi.png";
import Header from "../Resuable/Header";
import "../Inventory/Button.css";
import SearchIcon from "@mui/icons-material/Search";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "../dashboard/Navbar.css";
import { createTheme, ThemeProvider } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BookingDash = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Mono", "monospace"].join(","),
      fontSize: 13,
      fontWeightBold: 600,
    },
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [temp, setTemp] = useState(false);
  const [cric, setCric] = useState([]);

  const handleAdd = () => {
    Axios.post("http://localhost:8001/dummy", {}).then((responce) => {
      if (responce.data.message) {
        alert(responce.data.message);
      } else {
        alert("submitted succesfully");
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/getBooking");

      if (result?.data) setCric(result.data);
    };

    fetchData();
    console.log(cric);
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.replace("/");
    }
  }, []);
  const delP = (id, count, name) => {
    axios
      .put("http://localhost:8001/Updatebooking", {
        id: id,
      })
      .then((res) => {
        if (res) {
          alert(res.data.message);
        } else {
        }
      });
    axios
      .put("http://localhost:8001/UpdateProduct", {
        count: count,
        name: name,
      })
      .then((res) => {
        if (res) {
          alert(res.data.message);
        } else {
        }
      });
    NotificationManager.success("", "Booking Confirmed", 5000);
    window.location.reload(false);
  };

  const delP1 = (id) => {
    axios
      .put("http://localhost:8001/Updatebooking1", {
        id: id,
      })
      .then((res) => {
        if (res) {
          alert(res.data.message);
        } else {
        }
      });
    NotificationManager.error(
      "Error message",
      "Booking Declined",
      50000,
      () => {
        alert("callback");
      }
    );
    window.location.reload(false);
  };
  const filteredCric = cric.filter((p) =>
    p.userRollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div style={{ background: "#EDEDED" }}>
      <Navbar />
      <Header backgroundImage={Fron} title={"Booking"} title1={"Dashboard"} />
      <ThemeProvider theme={theme}>
        {!temp ? (
          <>
            {cric.length >= 0 && (
              <Container maxWidth="lg" sx={{ mt: "40px" }}>
                <Stack direction="row" justifyContent="space-between">
                  <Link to="/Home" style={{ textDecoration: "none" }}>
                    {" "}
                    <button class="bn30" role="button">
                      <ArrowBackIcon />
                      Back
                    </button>
                  </Link>

                  <TextField
                    label="19F-XXXX"
                    variant="outlined"
                    value={searchQuery}
                    size="small"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ marginLeft: "520px", width: "20%" }}
                    InputProps={{
                      style: { background: "white" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Link to="/Bookingrecord" style={{ textDecoration: "none" }}>
                    <button class="button-85" role="button">
                      <AddIcon />
                      Booking Record
                    </button>
                  </Link>
                </Stack>
                <br />
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead sx={{ background: "#8BC34A" }}>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" color={"White"}>
                            ID
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" color={"White"}>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" color={"White"}>
                            Roll No
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" color={"White"}>
                            Requested Equipment
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" color={"White"}>
                            Count
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" color={"White"}>
                            Duration
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" color={"White"}>
                            {" "}
                            Booking Status
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCric.map((p) => {
                        return (
                          <>
                            <TableRow>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {p.id}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {p.displayName}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {p.userRollNo}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {p.name}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {p.count}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {p.timeSlotDuration}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {p.status}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Button
                                  color="success"
                                  onClick={() => delP(p.id, p.count, p.name)}
                                  sx={{ borderRadius: "15px" }}
                                >
                                  {" "}
                                  <Typography variant="subtitle1">
                                    Allow
                                  </Typography>
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => delP1(p.id)}
                                  sx={{ borderRadius: "15px" }}
                                >
                                  {" "}
                                  <Typography variant="subtitle1" color="red">
                                    Decline
                                  </Typography>
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>{" "}
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
  );
};
export default BookingDash;
