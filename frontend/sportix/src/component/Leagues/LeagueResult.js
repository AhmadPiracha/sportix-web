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
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Container,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../Resuable/Header";
import Fron from "../images/res.jpg";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
const LeagueResult = () => {
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
  const Leaguename = location.state?.name;
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState({});
  const currentDate = new Date();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/getLeagueSchedule?Leaguename=${Leaguename}`);
        if (response.data) {
          setSchedule(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Leaguename]);

  const addMatchResult = () => {
    if (selectedMatchId) {
      const resultIsDraw = isDraw ? true : false;
      const resultWinner = isDraw ? "Draw" : winner;
      axios
        .post("http://localhost:8001/addLeagueMatchResult", {
          id: selectedMatchId,
          teama: selectedMatch.team1,
          teamb: selectedMatch.team2,
          league: Leaguename,
          date: selectedMatch.Match_Date,
          winner: resultWinner,
        })
        .then((res) => {
          if (res.data) {
            NotificationManager.success(
              "",
              "Match result added successfully",
              7000
            );
            setSchedule((prevSchedule) =>
              prevSchedule.filter(
                (match) => match.Match_Id !== selectedMatchId
              )
            );
          } else {
            NotificationManager.error("", "Error adding match result", 7000);
          }
        });
    }

    setOpenDialog(false);
  };

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
            <Link
              to={`/ResultDash?Leaguename=${Leaguename}`}
              style={{ textDecoration: "none" }}
            >
              <button className="button-85" role="button">
                <AddIcon />
                View Result
              </button>
            </Link>
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
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule
                  .filter((match) => !match.result) // Filter out matches with results
                  .map((match) => (
                    <TableRow key={match.Match_Id}>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {match.Match_Id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {match.team1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {match.team2}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {new Date(match.Match_Date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            }
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {new Date(match.Match_Date) <= currentDate
                            ? "Played"
                            : "Not Played"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {new Date(match.Match_Date) <= currentDate && (
                          <Button
                            variant="contained"
                            sx={{ color: "#fff", background: "green" }}
                            onClick={() => {
                              setSelectedMatchId(match.Match_Id);
                              setSelectedMatch(match);
                              setOpenDialog(true);
                            }}
                          >
                            Add Result
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: {
              width: "500px",
            },
          }}
        >
          <DialogTitle
            sx={{
              background: "linear-gradient(to right, #2b5876, #4e4376)",
              color: "white",
            }}
          >
            Result Management
          </DialogTitle>
          <br></br>
          <DialogContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDraw}
                  onChange={(e) => setIsDraw(e.target.checked)}
                  name="isDraw"
                  color="primary"
                />
              }
              label="Is Draw"
            />
            <br />
            <br></br>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Winner</InputLabel>
              <Select
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
                label="Winner"
                disabled={isDraw}
              >
                <MenuItem value={selectedMatch.team1}>
                  {selectedMatch.team1}
                </MenuItem>
                <MenuItem value={selectedMatch.team2}>
                  {selectedMatch.team2}
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={addMatchResult}
            >
              Add Result
            </Button>
          </DialogContent>
        </Dialog>
        <NotificationContainer />
      </ThemeProvider>
    </div>
  );
};

export default LeagueResult;