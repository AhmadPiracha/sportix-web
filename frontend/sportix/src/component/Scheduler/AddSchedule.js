import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import {
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import Logo from "../images/Lokm.png";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "../Inventory/Button.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from "@mui/material/Button";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddSchedule = ({}) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  const maxDateString = maxDate.toISOString().split("T")[0];
  const navigate = useNavigate();
  const location = useLocation();
  const [teams, setTeams] = useState([]);
  const [startDate, setStartDate] = useState(currentDate);
  const Leaguename = location.state?.name;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/getteamsleague?Leaguename=${Leaguename}`
        );
        if (response.data) {
          setTeams(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Leaguename]);

  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);

  const generateSchedule = async () => {
    try {
      const existingMatchesResponse = await axios.get(
        `http://localhost:8001/getLeagueSchedule?Leaguename=${Leaguename}`
      );

      if (
        existingMatchesResponse.data &&
        existingMatchesResponse.data.length > 0
      ) {
        NotificationManager.error(
          "",
          "League is already scheduled",
          5000,
          () => {}
        );
        return;
      }
      const selectedDate = new Date(startDate);
      const currentDate = new Date();

      if (selectedDate.toISOString().split('T')[0] < currentDate.toISOString().split('T')[0]) {
        NotificationManager.error('Selected date is in the past. Please choose a valid date.');
        return;
      }

      const oneMonthLater = new Date();
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

      if (selectedDate > oneMonthLater) {
        NotificationManager.error(
          "",
          "Please select a date within the next month",
          5000,
          () => {}
        );
        return;
      }
      const numTeams = teams.length;
      const timeSlots = ["11 AM - 12 AM", "1 PM - 2 PM", "3 PM - 4 PM"];
      const rounds = numTeams - 1;

      if (numTeams < 2) {
        NotificationManager.error(
          "",
          "Registered League Teams should be more than two",
          50000,
          () => {}
        );
        return;
      }

      for (let round = 0; round < rounds; round++) {
        const roundMatches = [];
        const startDateObj = new Date(startDate);
        const teamIndices = [...Array(numTeams).keys()];
        shuffleArray(teamIndices);

        for (let i = 0; i < numTeams / 2; i++) {
          const teamIndex1 = teamIndices[i];
          const teamIndex2 = teamIndices[numTeams - 1 - i];

          const match = {
            team1: teams[teamIndex1].name,
            team2: teams[teamIndex2].name,
            timeSlot: timeSlots[i],
            date: getNextMatchDate(startDateObj, round),
          };
          roundMatches.push(match);

          await sendMatchDataToBackend(
            match.team1,
            match.team2,
            match.timeSlot,
            Leaguename,
            match.date
          );
        }
      }

      NotificationManager.success(
        "",
        "Matches scheduled successfully",
        5000,
        () => {}
      );

      // Redirect to League page
      window.location.href = "/League";
    } catch (error) {
      console.error("Error generating schedule:", error);
      NotificationManager.error(
        "",
        "An error occurred while generating the schedule",
        5000,
        () => {}
      );
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const getNextMatchDate = (startDate, roundIndex) => {
    const matchDate = new Date(startDate);
    matchDate.setDate(matchDate.getDate() + roundIndex);
    return formatDatabaseDate(matchDate);
  };

  const sendMatchDataToBackend = async (
    team1,
    team2,
    timeSlot,
    Leaguename,
    date
  ) => {
    try {
      if (team1 !== team2 && team2 !== team1) {
        const response = await axios.post("http://localhost:8001/MatchData", {
          team1,
          team2,
          timeSlot,
          Leaguename,
          date,
        });
        console.log(
          "Match data saved successfully:",
          team1,
          team2,
          timeSlot,
          response.data
        );
      }
    } catch (error) {
      console.error("Error saving match data:", error);
    }
  };

  const formatDatabaseDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={{ background: "#EDEDED" }}>
      <Navbar />
      <br />
      <br />
      <Container maxWidth="md">
        <Card sx={{ borderRadius: "20px", border: "2px solid black" }}>
          <br />
          <Typography textAlign="center">
            <img
              src={Logo}
              style={{ width: "200px", height: "200px" }}
              alt="Logo"
            />
          </Typography>
          <CardContent>
            <Typography textAlign="center" variant="h6">
              <b>Schedule League Matches</b>
            </Typography>
            <br />
            <br />
            <Stack direction="row" justifyContent="space-evenly">
              <input
                type="date"
                min={currentDate}
                max={maxDateString}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  width: "250px",
                  height: "40px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginTop: "7px",
                }}
              />
            </Stack>
            <br />
            <br />
            <Stack direction="row" justifyContent="space-evenly">
              <Button
                variant="contained"
                size="medium"
                color="error"
                onClick={() => navigate("/League")}
              >
                <ArrowBackIcon />
                Back
              </Button>
              <Typography textAlign="center">
                <button
                  className="button-85"
                  role="button"
                  onClick={generateSchedule}
                >
                  Schedule Matches
                </button>
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
      <NotificationContainer className="custom-notification-container" />
    </div>
  );
};

export default AddSchedule;
