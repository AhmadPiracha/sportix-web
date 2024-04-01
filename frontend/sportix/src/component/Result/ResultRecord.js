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
import Fron from "../images/res.jpg";
import { createTheme, ThemeProvider } from "@mui/material";

const ResultRecord= () => {
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
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/getResultrecord");

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
  

  return (
    <div style={{background:'#EDEDED'}}>
      <Navbar />
      <Header backgroundImage={Fron} title={"Result"} title1={"Record"} />
      <ThemeProvider theme={theme}>
        {!temp ? (
          <>
            {cric.length >= 0 && (
              <Container maxWidth="lg" sx={{ mt: "40px" }}>
                <Stack direction="row" justifyContent="space-between">
                  <Link to="/Result" style={{ textDecoration: "none" }}>
                    {" "}
                    <button className="bn30" role="button">
                      <ArrowBackIcon />
                      Back
                    </button>
                  </Link>
                  <TextField
                    label="Team"
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
                           Match Id
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="white" variant="h6">
                            <div className="font-loader">Result</div>
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
                              <Typography variant="subtitle1">
                                {p.id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle1">
                                {p.winner}
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

export default ResultRecord;
