import Navbar from "../dashboard/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Menu } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/system";
import { Link } from "react-router-dom";
import Fron from "../images/xax.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import "./Button.css";
import Header from "../Resuable/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
const FutsalDash = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Mono", "monospace"].join(","),
      fontSize: 16,
      fontWeightBold: 600,
    },
  });
  const [temp, setTemp] = useState(false);
  const [cric, setCric] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/getLeagueFutsal");

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
  const onBidding = (leagueName, leagueType) => {
    const currentDate = new Date().toISOString().split("T")[0];
    axios
      .post("http://localhost:8001/startBiddingFutsal", {
        league: leagueName,
        type: leagueType,
        date: currentDate,
      })
      .then((response) => {
        if (response.data.message) {
          NotificationManager.error("", response.data.message, 50000, () => {});
        } else {
          NotificationManager.success("Bidding Status Updated Successfully");
          window.location.href = "/FutsalBidding";
        }
      })
      .catch((error) => {
        console.error("Error starting bidding:", error);
      });
  };

  const onStopBidding = (leagueName) => {
    axios
      .post("http://localhost:8001/stopBiddingFutsal", {
        league: leagueName,
      })
      .then((response) => {
        if (response.data.message) {
          NotificationManager.warning("Bidding Stopped Successfully");
          window.location.href = "/FutsalBidding";
        } else {
        }
      })
      .catch((error) => {
        console.error("Error starting bidding:", error);
      });
  };
  return (
    <>
      <div style={{ background: "#EDEDED" }}>
        <Navbar />

        <Header backgroundImage={Fron} title={"Bidding"} title1={""} />
        <ThemeProvider theme={theme}>
          {!temp ? (
            <>
              {cric.length >= 0 && (
                <Container maxWidth="lg" sx={{ mt: "40px" }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Link to="/Home" style={{ textDecoration: "none" }}>
                      <Button class="custom-button">
                        <ArrowBackIcon />
                        Back
                      </Button>
                    </Link>
                    <IconButton onClick={handleOpenMenu}>
                      <Typography
                        display="flex"
                        alignItems="center"
                        fontFamily="Ysabeau"
                        color="green"
                      >
                        <ArrowDropDownIcon />
                        Switch League
                      </Typography>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={() => navigate("/FutsalBidding")}>
                        <Typography
                          display="flex"
                          alignItems="center"
                          fontFamily="Ysabeau"
                          color="black"
                        >
                          Futsal DashBoard
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/BiddingDash")}>
                        <Typography
                          display="flex"
                          alignItems="center"
                          fontFamily="Ysabeau"
                          color="black"
                        >
                          Cricket DashBoard
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Stack>
                  <br />
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead
                        sx={{ background: "#8BC34A" }}
                        fontWeight={"600"}
                      >
                        <TableRow>
                          <TableCell>
                            <Typography color="white" variant="h6">
                              League Id
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color="white" variant="h6">
                              League Name
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color="white" variant="h6">
                              Sports
                            </Typography>
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {cric.map((p, index) => {
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
                                    {p.League_name}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="subtitle1">
                                    {p.League_Type}
                                  </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                  <button
                                    className="b1"
                                    onClick={() =>
                                      onBidding(p.League_name, p.League_Type)
                                    }
                                  >
                                    {" "}
                                    Start Bidding
                                  </button>
                                </TableCell>

                                <TableCell>
                                  <button
                                    className="b2"
                                    onClick={() => onStopBidding(p.League_name)}
                                  >
                                    Stop Bidding
                                  </button>
                                </TableCell>
                              </TableRow>
                            </>
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
        </ThemeProvider>
        <NotificationContainer />
      </div>
    </>
  );
};

export default FutsalDash;
