import React, { useState } from "react";
import nft from "../Pictures/11.jpg";
import {
  Stack,
  TextField,
} from "@mui/material";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import "./Notification.css";

const TeamRegModal = ({ open, onClose1, teamType }) => {
  var date = new Date();
  const currentDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const [teamData, setTeamData] = useState({
    name: "",
    date: "",
    type: teamType || "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

    const handleadd = () => {
      if (teamData.date === "") {
        NotificationManager.warning("", "Registration Date cannot be Empty!", 3000);
        return;
      }
    
      const selectedDate = new Date(teamData.date);
      const currentDate = new Date();
    
      if (selectedDate.toISOString().split('T')[0] < currentDate.toISOString().split('T')[0]) {
        NotificationManager.error('Selected date is in the past. Please choose a valid date.');
        return;
      } else if (selectedDate > maxDate) {
        NotificationManager.error('Please choose a valid date. You can choose any date within a month');
        return;
      }

    axios
      .post("http://localhost:8001/team", {
        name: teamData.name,
        date: teamData.date,
        type: teamData.type,
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message) {
            NotificationManager.error(
              "",
              response.data.message,
              5000,
              () => {}
            );
          } else {
            NotificationManager.success(
              "Registered Successfully",
              "",
              5000,
              () => {}
            );
            window.location.reload();
          }
        }
      });
  };

  if (!open) return null;

  return (
    <div onClick={onClose1} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <img src={nft} alt="/" />
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose1}>
            X
          </p>
          <div className="content">
            <h4>Teams's Registration</h4>
          </div>
          <Stack direction="row" justifyContent="space-evenly">
            <TextField
              type="text"
              name="name"
              value={teamData.name}
              onChange={handleChange}
              label="Enter Team Name"
            />
          </Stack>
          <br></br>
          <Stack direction="row" justifyContent="space-evenly">
          <Stack direction="row" justifyContent="space-evenly">
  <input
    type="date"
    min={currentDate}
    max={maxDateString}
    value={teamData.date}
    name="date"
    onChange={handleChange}
    style={{
      width: "220px",
      height: "40px",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    }}
  />
</Stack>
          </Stack>
          <br></br>
          <div className="btnContainer">
            <button className="btnPrimary" onClick={handleadd}>
              <span className="bold">Register</span>
            </button>
          </div>
        </div>
      </div>
      <NotificationContainer className="custom-notification-container" />
    </div>
  );
};

export default TeamRegModal;