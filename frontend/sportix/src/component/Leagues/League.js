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
import Box from "@mui/material/Box";
import { Container, Stack } from "@mui/system";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Fron from "../images/xax.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";
import "./Button.css";
import Header from "../Resuable/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const League = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Mono", "monospace"].join(","),
      fontSize: 16,
      fontWeightBold: 600,
    },
  });
  const [temp, setTemp] = useState(false);
  const [cric, setCric] = useState([]);
  const [Team, setTeam] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/getTeams");
        if (response.data) {
          setTeam(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    FetchData();
  }, []);
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);
  const updateLeagueTeams = (id, name, League_name, type) => {
    axios
      .post("http://localhost:8001/LeagueTeams", {
        id: id,
        L_name: name,
        name: League_name,
        Type: type,
      })
      .then((res) => {
        if (res) {
          NotificationManager.success(
            "",
            "Team Registrd Successfully",
            6000 
          );
        } else {
          alert("Already Register in League");
        }
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/getLeague1");

      if (result?.data) setCric(result.data);
    };

    fetchData();
    console.log(cric);
  }, []);

  const delP = (id) => {
    console.log("delete");
    axios
      .put("http://localhost:8001/deleteEquipment", {
        id: id,
      })
      .then((res) => {
        if (res) {
          alert(res.data.message);
        } else {
          alert("Deleted succesfully");
        }
      });
    window.location.reload(false);
  };

  const [openDialog, setOpenDialog] = React.useState([]);

  useEffect(() => {
    setOpenDialog(new Array(cric.length).fill(false));
  }, [cric]);

  const handleOpenDialog = (index) => {
    const newOpenDialog = [...openDialog];
    newOpenDialog[index] = true;
    setOpenDialog(newOpenDialog);
  };

  const handleCloseDialog = (index) => {
    const newOpenDialog = [...openDialog];
    newOpenDialog[index] = false;
    setOpenDialog(newOpenDialog);
  };
  const handleLeagueClick = (name, date) => {
    navigate("/TeamScheduler", { state: { name, date } });
  };
  const handleLeagueClick1 = (name, date) => {
    navigate("/LeagueResult", { state: { name, date } });
  };
  const handleLeagueClick2 = (name) => {
    navigate("/AddSchedule", { state: { name } });
  };
  const navigate = useNavigate();

  return (
    <>
      <div style={{ background: "#EDEDED" }}>
        <Navbar />

        <Header
          backgroundImage={Fron}
          title={"League"}
          title1={"Registration"}
        />
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
                      <MenuItem onClick={() => navigate("/FutsalLeague")}>
                        <Typography
                          display="flex"
                          alignItems="center"
                          fontFamily="Ysabeau"
                          color="black"
                        >
                          Futsal Dashboard
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/League")}>
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
                    <Link to="/AddLeagues" style={{ textDecoration: "none" }}>
                      <button class="button-85" role="button">
                        <AddIcon />
                        Register League
                      </button>
                    </Link>
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
                                <TableCell>
                                  <Button
                                    aria-label="delete"
                                    size="small"
                                    color="secondary"
                                    aria-label="add an alarm"
                                    variant="outlined"
                                    onClick={() =>
                                      handleLeagueClick(p.League_name, p.date)
                                    } 
                                  >
                                    View Schedule
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    aria-label="delete"
                                    size="small"
                                    color="secondary"
                                    aria-label="add an alarm"
                                    variant="outlined"
                                    onClick={() =>
                                      handleLeagueClick1(p.League_name)
                                    } 
                                  >
                                    Result
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    aria-label="delete"
                                    size="small"
                                    color="secondary"
                                    aria-label="add an alarm"
                                    variant="outlined"
                                    onClick={() =>
                                      handleLeagueClick2(p.League_name)
                                    } // Open the dialog for this league entry
                                  >
                                    ADD Schedule
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    aria-label="delete"
                                    size="small"
                                    color="secondary"
                                    aria-label="add an alarm"
                                    variant="outlined"
                                    onClick={() => handleOpenDialog(index)} // Open the dialog for this league entry
                                  >
                                    <AddIcon />
                                    ADD Teams
                                  </Button>
                                  <Dialog
                                    open={openDialog[index]} // Use the dialog state for this league entry
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={() => handleCloseDialog(index)} // Close the dialog for this league entry
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>
                                      {"Register Teams for " +
                                        p.League_name +
                                        ""}
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                        <Box
                                          sx={{ flexGrow: 1, maxWidth: 752 }}
                                        >
                                          <Typography
                                            sx={{ mt: 4, mb: 2 }}
                                            variant="h6"
                                            component="div"
                                          >
                                            Teams
                                          </Typography>
                                          <List>
                                            {Team.map((team) => (
                                              <ListItem key={team.id}>
                                                <ListItemText>
                                                  <Typography>
                                                    {team.name}
                                                    &nbsp;&nbsp;&nbsp;
                                                  </Typography>
                                                </ListItemText>
                                                <IconButton
                                                  edge="end"
                                                  aria-label="delete"
                                                  onClick={() =>
                                                    updateLeagueTeams(
                                                      p.id,
                                                      team.name,
                                                      p.League_name,
                                                      p.League_Type
                                                    )
                                                  }
                                                >
                                                  <AddIcon />
                                                </IconButton>
                                              </ListItem>
                                            ))}
                                          </List>
                                        </Box>
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleCloseDialog}>
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
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
            <NotificationContainer />
        </ThemeProvider>
      </div>
    </>
  );
};

export default League;
