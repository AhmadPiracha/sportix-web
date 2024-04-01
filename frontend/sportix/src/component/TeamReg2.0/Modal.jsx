import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField } from '@mui/material';
import { Paper, Table, TableHead, TableContainer, Typography, MenuItem, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Container, Stack } from '@mui/system';
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import "./index.css";

const Modal = ({ open, onClose, teamId, image }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerRollNo, setPlayerRollNo] = useState('');

  const isValidPlayerName = /^[a-zA-Z\s]*$/.test(playerName);
  const isValidPlayerRollNo = /^[0-9a-zA-Z]*$/.test(playerRollNo);


  const registerPlayer = async () => {
    if (!isValidPlayerName) {
      NotificationManager.warning('', 'Player Name should only contain letters ', 3000);
    } else if (!isValidPlayerRollNo) {
      NotificationManager.warning('', 'Player Roll No should only contain numbers', 3000);
    } else if (playerName === "" || playerRollNo === "") {
      NotificationManager.warning('', 'Player Name and Roll No are required', 3000);
    } else {
      try {
        const response = await axios.post('http://localhost:8001/Regplayer', {
          teamId: teamId,
          playerName: playerName,
          playerRollNo: playerRollNo,
        });
        if (response.status === 200) {
          
          console.log(`Registered player: ${playerName}`);
          onClose();
        }
      } catch (error) {
        NotificationManager.warning('', 'Roll No Is Already Registered', 3000);
      }
      NotificationManager.warning('', 'Player Registerd', 3000);
    }
  };

  if (!open) return null;

  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <img src={image} alt='/' />
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <div className='content'>
            <h4>Player's Registration</h4>
          </div>
          <Stack direction="row" justifyContent="space-evenly">
            <TextField
              variant="outlined"
              label="Player Name"
              name="PlayerName"
              sx={{ width: "80%" }}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </Stack>
          <br></br>
          <Stack direction="row" justifyContent="space-evenly">
            <TextField
              variant="outlined"
              label="Player RollNo (19F-XXXX)"
              name="PlayerRollNo"
              sx={{ width: "80%" }}
              value={playerRollNo}
              onChange={(e) => setPlayerRollNo(e.target.value)}
            />
          </Stack>
          <div className='btnContainer'>
            <button className='btnPrimary' onClick={registerPlayer}>
              <span className='bold'>Register</span>
            </button>
          </div>
        </div>
      </div>
      <NotificationContainer className="custom-notification-container" />
    </div>
  );
};

export default Modal;
