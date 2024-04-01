import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import {
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Axios from "axios";
import Logo from "../images/Lokm.png";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "../Inventory/Button.css";

const AddSchedule = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [cricData, setCricData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [user, setUser] = useState({
    Leaguename: "",
    startDate: currentDate,
  });

  const [selectedLeague, setSelectedLeague] = useState("");
  const [isFetchingTeams, setIsFetchingTeams] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const fetchTeamsForLeague = async () => {
    setIsFetchingTeams(true);
    try {
      const response = await Axios.post("http://localhost:8001/getTeamsLeague", {
        LeagueName: user.Leaguename,
      });
      if (response.data.message) {
        alert(response.data.message);
      } else {
        setTeams(response.data);
        setIsFetchingTeams(false);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
      setIsFetchingTeams(false);
    }
  };

  const generateSchedule = async () => {
    if (teams.length < 2) {
      NotificationManager.error("Not enough teams to schedule matches.", "Error", 5000, () => {});
      return;
    }

    try {
      const response = await Axios.post("http://localhost:8001/generateSchedule", {
        teams,
        startDate: user.startDate,
        leagueName: user.Leaguename,
      });

      if (response.data.message) {
        NotificationManager.error(response.data.message, "Error", 5000, () => {});
      } else {
        NotificationManager.success("Schedule Generated Successfully", "", 6000);
        window.location = "/League";
      }
    } catch (error) {
      console.error("Error generating schedule:", error);
      NotificationManager.error("Error generating schedule.", "Error", 5000, () => {});
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:8001/getLeague").then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      } else {
        setCricData(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (user.Leaguename) {
      fetchTeamsForLeague();
    }
  }, [user.Leaguename]);

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
            <Stack direction="row" justifyContent="space-evenly">
              <TextField
                variant="outlined"
                label="League Name"
                name="Leaguename"
                value={user.Leaguename}
                onChange={handleChange}
                sx={{ width: "40%" }}
                select
              >
                {cricData?.map((item) => (
                  <MenuItem key={item.League_name} value={item.League_name}>
                    {item.League_name}
                  </MenuItem>
                ))}
              </TextField>

              <input
                type="date"
                min={currentDate}
                value={user.startDate}
                name="startDate"
                onChange={handleChange}
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
              <Typography textAlign="center">
                <button
                  className="button-85"
                  role="button"
                  onClick={generateSchedule}
                  disabled={isFetchingTeams}
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
