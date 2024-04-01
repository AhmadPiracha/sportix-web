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
import { Link } from "react-router-dom";
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

const Manageinventory = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Mono", "monospace"].join(","),
      fontSize: 16,
      fontWeightBold: 600,
    },
  });

  const [cric, setCric] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState({
    id: "",
    name: "",
    count: "",
    type: "",
  });

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8001/getEquipment");
      setCric(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openUpdateModal = (product) => {
    setProductToUpdate(product);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const delProduct = (id, name, type, count, date) => {
    axios
      .post("http://localhost:8001/addEquipmentLog", {
        id: id,
        name: name,
        type: type,
        count: count,
        date: date
      })
      .then((res) => {
        if (res.data.message) {
          console.log("Equipment logged successfully");
        } else {
          console.error("Error logging equipment: ", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error logging equipment: ", error);
      });
  
    axios
      .put("http://localhost:8001/deleteEquipment", {
        id: id,
      })
      .then((deleteResponse) => {
        if (deleteResponse.data.message) {
          console.log("Equipment deleted successfully");
          NotificationManager.success("Deleted Successfully");
          fetchData();
        } else {
          console.error("Error deleting equipment: ", deleteResponse.data.message);
        }
      })
      .catch((deleteError) => {
        console.error("Error deleting equipment: ", deleteError);
      });
  
    window.location.reload();
  };
  const updateProduct = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(productToUpdate.name)) {
      NotificationManager.error(
        "",
        "Invalid equipment name, Only letters and spaces are allowed."
      );
      return;
    } else if (productToUpdate.count <= 0) {
      NotificationManager.error("", "Equipment count must be greater than zero");
      return;
    } else if (productToUpdate.count === "") {
      NotificationManager.error("", "Equipment count must be greater than zero");
      return;
    } else if (productToUpdate.name === "") {
      NotificationManager.error("", "Equipment Name Cannot be Null");
      return;
    } else if (productToUpdate.type === "") {
      NotificationManager.error("", "Equipment Type Cannot be Null");
      return;
    } else {
      axios
        .put(`http://localhost:8001/updateEquipment/${productToUpdate.id}`, {
          name: productToUpdate.name,
          count: productToUpdate.count,
          type: productToUpdate.type,
        })
        .then((response) => {
          if (response.data.message) {
            NotificationManager.success("Product updated successfully");
            closeUpdateModal();
            fetchData();
          } else {
            console.error("Error updating product: ", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating product: ", error);
        });
    }
  };
  

  return (
    <div style={{ background: "#EDEDED" }}>
      <Navbar />
      <Header backgroundImage={Fron} title={"Manage"} title1={"Inventory"} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ mt: "40px" }}>
          <Stack direction="row" justifyContent="space-between">
            <Link to="/Inventory" style={{ textDecoration: "none" }}>
              <button className="bn30" role="button">
                <ArrowBackIcon />
                Back
              </button>
            </Link>
            <Link to="/Addproduct" style={{ textDecoration: "none" }}>
              <button className="button-85" role="button">
                <AddIcon />
                Add Equipment
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
              <TableHead sx={{ background: "#8BC34A" }} fontWeight={"600"}>
                <TableRow>
                  <TableCell>
                    <Typography color="white" variant="h6" fontWeight="bold">
                      Equipment Id
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6" fontWeight="bold">
                      Equipment Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6" fontWeight="bold">
                      Equipment Count
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6" fontWeight="bold">
                      Equipment Type
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cric.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Typography variant="subtitle1">{p.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">{p.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">{p.count}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">{p.type}</Typography>
                    </TableCell>
                    <TableCell>
                      <button
                        className="custom-button small"
                        role="button"
                        onClick={() => delProduct(p.id,p.name,p.type,p.count,p.date)}
                      >
                        <DeleteIcon />
                        Delete
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        className="button-32"
                        role="button"
                        onClick={() => openUpdateModal(p)}
                      >
                        <RxUpdate />
                        Update
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
        </Container>
        <NotificationContainer />
      </ThemeProvider>
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
                    Update Sports Equipment
                  </Typography>
                </div>

                <br />
                <Stack direction="row" justifyContent="space-evenly">
                  <TextField
                    label="Equipment Name"
                    name="name"
                    value={productToUpdate.name}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        name: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                  <TextField
                    label="Equipment Count"
                    name="count"
                    type="number"
                    value={productToUpdate.count}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        count: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Stack>

                <TextField
                  label="Equipment Type"
                  name="type"
                  value={productToUpdate.type}
                  onChange={(e) =>
                    setProductToUpdate({
                      ...productToUpdate,
                      type: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Stack direction="row" justifyContent="space-evenly">
                  <button
                    className="button-85"
                    role="button"
                    onClick={updateProduct}
                  >
                    <AddIcon />
                    Update Equipment
                  </button>
                </Stack>
              </CardContent>
            </Card>
          </Container>
        </Paper>
      </Modal>
    </div>
  );
};
export default Manageinventory;
