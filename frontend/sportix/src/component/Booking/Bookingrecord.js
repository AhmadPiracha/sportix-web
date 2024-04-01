import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import axios from "axios";
import { TextField, InputAdornment } from "@mui/material";
import {
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search"; 
import TablePagination from "@mui/material/TablePagination";
import Header from "../Resuable/Header";
import Fron from "../images/jmk.jpg";
import { createTheme, ThemeProvider } from "@mui/material";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Bookingrecord = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Mono", "monospace"].join(","),
      fontSize: 16,
      fontWeightBold: 600,
    },
  });
  const [temp, setTemp] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [cric, setCric] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/getBookingrecord");

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

  const filteredCric = cric.filter((p) =>
    p.userRollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{background:'#EDEDED'}}>
      <Navbar />
      <Header backgroundImage={Fron} title={"Booking"} title1={"Record"} />
      <ThemeProvider theme={theme}>
        {!temp ? (
          <>
            {cric.length >= 0 && (
              <Container maxWidth="lg" sx={{ mt: "40px" }}>
                <Stack direction="row" justifyContent="space-between" >
                  <Link to="/BookingDash" style={{ textDecoration: "none" }}>
                    {" "}
                    <button className="bn30" role="button">
                      <ArrowBackIcon />
                      Back
                    </button>
                  </Link>
                  <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    size="small"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ marginBottom: "20px", width: "20%" }}
                    InputProps={{
                      style: { background: "white" },
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button btn btn-success mb-3"
                  table="table-to-xls"
                  filename="Booking Record"
                  sheet="tablexls"
                  buttonText="Record"
                  size="small"
                  style={{ marginRight:"20px" }}
                />
                </Stack>
                <br />
               
                <TableContainer component={Paper}>
                  <Table id="table-to-xls">
                    <TableHead
                      sx={{ background: "#8BC34A" }}
                      fontWeight={"600"}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography color="white" variant="h6">
                            Id
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="white" variant="h6">
                            <div className="font-loader">Name</div>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="white" variant="h6">
                            <div className="font-loader">Roll No</div>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="white" variant="h6">
                            <div className="font-loader">
                              Requested Equipment
                            </div>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="white" variant="h6">
                            <div className="font-loader">Count</div>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="white" variant="h6">
                            <div className="font-loader">Duration</div>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="white" variant="h6">
                            <div className="font-loader">Booking Status</div>
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCric.map((p) => {
                        return (
                          <TableRow key={p.id}>
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
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
      </ThemeProvider>
    </div>
  );
};

export default Bookingrecord;
