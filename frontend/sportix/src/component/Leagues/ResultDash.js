import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import axios from "axios";
import {
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  Stack,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../Resuable/Header";
import Fron from "../images/res.jpg";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { useLocation } from "react-router-dom";
const ResultDash = () => {
  const navigate = useNavigate();
  const theme = createTheme({
    typography: {
      fontFamily: ["Ubuntu Mono, monospace"].join(","),
      fontSize: 14,
      fontWeightBold: 600,
    },
  });
  const [schedule, setSchedule] = useState([]);
  const location = useLocation();
  const Leaguename = new URLSearchParams(location.search).get("Leaguename");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/getLeagueResult?Leaguename=${Leaguename}`
        );
        if (response.data) {
          setSchedule(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Leaguename]);
  


  return (
    <div style={{ background: "#EDEDED" }}>
    <Navbar />
    <Header backgroundImage={Fron} title={"Result"} title1={"Management"} />
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: "40px" }}>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            size="medium"
            color="error"
            onClick={() => navigate("/League")}
          >
            <ArrowBackIcon />
            Back
          </Button>
        </Stack>

        <br />
        <br />
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ background: "#8BC34A" }}>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" color="white">
                    Match Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="white">
                    Team A
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="white">
                    Team B
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="white">
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="white">
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="white">
                    Winner
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((match) => (
                <TableRow key={match.Match_Id}>
                  <TableCell>
                    <Typography variant="subtitle1">
                      {match.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{match.team1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{match.team2}</Typography>
                  </TableCell>
                  <TableCell>
                  <Typography variant="subtitle1">
                        {new Date(match.date).toLocaleDateString()}
                      </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">
                      Played
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">
                      {match.winner}
                    </Typography>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  </div>
);
};

export default ResultDash;