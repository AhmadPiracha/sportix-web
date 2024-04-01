import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import axios from "axios";
import { Card, CardContent, Grid, TextField } from "@mui/material";
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
import BadmintonUpdate from "./BadmintonUpdate";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Logo from "../images/pi.png";

const Badminton = () => {
  const [players, setPlayers] = useState([
    { name: "", rollno: "" },
    { name: "", rollno: "" },
    { name: "", rollno: "" },
  ]);
  const [user, setUser] = useState({
    name: "",
    date: "",
    type: "Badminton",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleadd = () => {
    const regex = /^[a-zA-Z ]+$/;
    const regex1 = /^[A-Za-z0-9\s]*[A-Za-z][A-Za-z0-9\s]*$/;
    const regex2 = /^\d{2}F\d{4}$/;

    if (user.name == "") {
      alert("Team Name cannot be Empty!");
    } else if (!regex1.test(user.name)) {
      alert("Team name Doesn't include Special Character!");
    } else if (user.date == "") {
      alert("Registeration Date cannot be Empty!");
    } else if (players[0].name == "") {
      alert("player 1  Name is Missing");
    } else if (!regex.test(players[0].name)) {
      alert(
        "Player 1 Name Doesn't include Special character or Numeric values!"
      );
    } else if (players[0].rollno == "") {
      alert("Player 1 Roll No cannot be empty");
    } else if (!regex2.test(players[0].rollno)) {
      alert("Kindly Enter Correct Roll No (19F1111)");
    } else if (players[1].name == "") {
      alert("player 2  Name is Missing");
    } else if (!regex.test(players[1].name)) {
      alert(
        "Player 2 Name Doesn't include Special character or Numeric values!"
      );
    } else if (players[1].rollno == "") {
      alert("Player 2 Roll No cannot be empty");
    } else if (!regex2.test(players[1].rollno)) {
      alert("Kindly Enter Correct Roll No (19F1111)");
    } else if (players[2].name == "") {
      alert("player 3 Name is Missing");
    } else if (!regex.test(players[2].name)) {
      alert(
        "Player 3 Name Doesn't include Special character or Numeric values!"
      );
    } else if (players[2].rollno == "") {
      alert("Player 3 Roll No cannot be empty");
    } else if (!regex2.test(players[2].rollno)) {
      alert("Kindly Enter Correct Roll No (19F1111)");
    } else {
      axios
        .post("http://localhost:8001/team", {
          name: user.name,
          date: user.date,
          type: user.type,
        })
        .then((responce) => {
          if (responce.data.message) {
            alert(responce.data.message);
          }
        });
      for (let p = 0; p < 3; p++) {
        if (players[p].name == "") {
        } else {
          axios
            .post("http://localhost:8001/player", {
              team: user.name,
              name: players[p].name,
              rollno: players[p].rollno,
            })
            .then((responce) => {
              if (responce.data.message) {
                alert(responce.data.message);
              }
            });
        }
      }
      alert("Registerd Successfully");
      window.location.href = "/Badminton";
    }
    console.log(players);
  };
  const handleInputChange = (event, index, key) => {
    const value = event.target.value;
    setPlayers((prevState) => {
      const newPlayers = [...prevState];
      newPlayers[index][key] = value;
      return newPlayers;
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [Team, setTeam] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/getBadminton");

      if (result?.data) setTeam(result.data);
    };

    fetchData();
    console.log(Team);
  }, []);
  const delP = (id, name) => {
    console.log("delete");
    axios
      .put("http://localhost:8001/deleteTeam", {
        id: id,
      })
      .then((res) => {
        if (res) {
          alert(res.data.message);
        } else {
          alert("account deleted succesfully");
        }
      });
    window.location.reload(false);

    axios
      .put("http://localhost:8001/deleteplayer", {
        name: name,
      })
      .then((res) => {
        if (res) {
          alert(res.data.message);
        } else {
          alert("account deleted succesfully");
        }
      });
    window.location.reload(false);
  };
  return (
    <>
      <Navbar />

      {Team.length >= 0 && (
        <Container maxWidth="lg" sx={{ mt: "40px" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5" color="#fff">
              <b>Badminton</b>
            </Typography>
            <Button variant="outlined" onClick={handleClickOpen}>
              Open alert dialog
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth="md"
            >
              <DialogTitle
                id="alert-dialog-title"
                fontFamily="Shadows Into Light"
              >
                {"Badminton Team Registration"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Container
                    maxWidth="md"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card sx={{ width: 480 }}>
                      <CardContent>
                        <Stack direction="column" spacing={1}>
                          <b>
                            {" "}
                            <label>Team Name</label>
                          </b>
                          <TextField
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            label="Enter Team Name"
                          />
                          <b>
                            <label>Registration Date</label>
                          </b>
                          <TextField
                            name="date"
                            value={user.date}
                            onChange={handleChange}
                            type="date"
                          />
                          <Button
                            variant="contained"
                            type="submit"
                            onClick={handleadd}
                          >
                            Register
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Container>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>

            <Link to="/BadmintonReg" style={{ textDecoration: "none" }}>
              <Button variant="contained">
                <AddIcon />
                Add Teams
              </Button>
            </Link>
          </Stack>
          <br />
          <TableContainer component={Paper}>
            <Table>
              <TableHead
                sx={{
                  background: "linear-gradient(to right, #2b5876, #4e4376);",
                }}
              >
                <TableRow>
                  <TableCell>
                    <Typography color="white" variant="h6">
                      <b>
                        <div className="font-loader">Team Id</div>
                      </b>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6">
                      <b>
                        <div className="font-loader">Team Name</div>
                      </b>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6">
                      <b>
                        <div className="font-loader">Registration Date</div>
                      </b>
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Team.map((p) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle1">{p.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">{p.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">{p.date}</Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            varaint="contained"
                            sx={{ background: "green", color: "#fff" }}
                          >
                            <RxUpdate />
                            Update
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            varaint="contained"
                            sx={{ background: "green", color: "#fff" }}
                          >
                            <RxUpdate />
                            Update
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            varaint="contained"
                            sx={{ color: "#fff", background: "red" }}
                            onClick={() => delP(p.id, p.name)}
                          >
                            <DeleteIcon />
                            Delete
                          </Button>
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
  );
};

export default Badminton;
