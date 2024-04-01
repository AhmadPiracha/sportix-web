import Fron from "../images/xax.jpg";
import Navbar from "../dashboard/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Header from "../Resuable/Header";

const BiddingSown = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Mono", "monospace"].join(","),
      fontSize: 14,
      fontWeightBold: 600,
    },
  });

  const [cric, setCric] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8001/getBiddingData");
      if (result?.data) setCric(result.data);
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.replace("/");
    }
  }, []);

  return (
    <div style={{ background: "#EDEDED" }}>
      <Navbar />
      <Header title={"Bidding"} backgroundImage={Fron} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ mt: "40px" }}>
          <Stack direction="row" justifyContent="space-between">
            <Link to="/BiddingDash" style={{ textDecoration: "none" }}>
              <Button class="custom-button">
                <ArrowBackIcon />
                Back
              </Button>
            </Link>
          </Stack>
          <br />
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ background: "#8BC34A" }} fontWeight={"600"}>
                <TableRow>
                  <TableCell>
                    <Typography color="white" variant="h6">
                      Roll No
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6">
                      Team
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6">
                      League
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6">
                      Bid Amount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="white" variant="h6">
                      Total Amount
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cric.map((p, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {p.userRollNo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {p.displayName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">{p.team}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">{p.league}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {p.biddingAmount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {p.totalAmount}
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
        </Container>
      </ThemeProvider>
      <NotificationContainer />
    </div>
  );
};

export default BiddingSown;
