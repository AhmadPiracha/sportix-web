import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import TeamRegModal from "./TeamRegModal"; // Import TeamRegModal component
import Header from "../Resuable/Header";
import Navbar from "../dashboard/Navbar";
import Fron from "../Pictures/bba.png";
import img from "../Pictures/bask.jpg";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Paper,
  Table,
  TableHead,
  TableContainer,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RxUpdate from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const _Cricket = () => {
  const [cric, setCric] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [modalStates, setModalStates] = useState([]);
  const [modalStates1, setModalStates1] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8001/getBasketball");
      if (response.data) {
        setCric(response.data);
        setModalStates(new Array(response.data.length).fill(false));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
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
  };

  const openModal = (index) => {
    const updatedModalStates = [...modalStates];
    updatedModalStates[index] = true;
    setModalStates(updatedModalStates);
    setSelectedIndex(index);
  };

  const closeModal = (index) => {
    const updatedModalStates = [...modalStates];
    updatedModalStates[index] = false;
    setModalStates(updatedModalStates);
    setSelectedIndex(null);
  };

  const openModal1 = (index) => {
    const updatedModalStates1 = [...modalStates1];
    updatedModalStates1[index] = true;
    setModalStates1(updatedModalStates1);
    setSelectedIndex(index);
  };

  const closeModal1 = (index) => {
    const updatedModalStates1 = [...modalStates1];
    updatedModalStates1[index] = false;
    setModalStates1(updatedModalStates1);
    setSelectedIndex(null);
  };

  return (
    <div style={{ background: "#EDEDED" }}>
      <Navbar />
      <Header backgroundImage={Fron} title={"Basketball"} title1={"Teams"} />
      <br />
      <Container maxWidth="lg" sx={{ mt: "40px" }}>
        <Stack direction="row" justifyContent="space-between">
          <Link to="/Home" style={{ textDecoration: "none" }}>
            {" "}
            <button class="bn30" role="button">
              <ArrowBackIcon />
              Back
            </button>
          </Link>
          <button
            class="button-85"
            role="button"
            variant="contained"
            sx={{ background: "green", color: "#fff" }}
            onClick={() => {
              openModal1(selectedIndex);
            }}
          >
            <AddIcon />
            Register Teams
          </button>
          <TeamRegModal
            open={modalStates1[selectedIndex]}
            onClose1={() => closeModal1(selectedIndex)}
            teamType="Basketball"
          />
        </Stack>
        <br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ background: "#8BC34A" }} fontWeight={"600"}>
              <TableRow>
                <TableCell>
                  <Typography color="white" variant="h6">
                    <b>
                      <div className="font-loader" fontFamily={"Lato"}>
                        Team Id
                      </div>
                    </b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="white" variant="h6">
                    <b>
                      <div className="font-loader" fontFamily={"Lato"}>
                        Team Name
                      </div>
                    </b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="white" variant="h6">
                    <b>
                      <div className="font-loader" fontFamily={"Lato"}>
                        Registration Date
                      </div>
                    </b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="white" variant="h6">
                    <b>
                      <div className="font-loader" fontFamily={"Lato"}>
                        Register Player
                      </div>
                    </b>
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cric.map((p, index) => {
                return (
                  <TableRow key={p.id}>
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
                      <button
                        class="bn5"
                        role="button"
                        onClick={() => {
                          openModal(index);
                        }}
                      >
                        <AddIcon /> Player
                      </button>
                      <Modal
                        open={modalStates[index]}
                        onClose={() => closeModal(index)}
                        teamId={p.name}
                        image={img}
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        class="custom-button small"
                        role="button"
                        onClick={() => delP(p.id, p.name)}
                      >
                        <DeleteIcon />
                        Delete
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
    </div>
  );
};

export default _Cricket;
