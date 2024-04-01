import React, { useState, useEffect } from 'react';
import Navbar from '../dashboard/Navbar';
import {
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Axios from 'axios';
import Logo from '../images/3984-removebg-preview.png';
import Header from '../Resuable/Header';
import Fron from '../images/fro.jpg';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const CricketSchedule = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  const maxDateString = maxDate.toISOString().split('T')[0];
  const v = ['Cricket Ground'];
  const timeSlots = [
    '9:00 AM - 10:30 AM',
    '11:00 AM - 12:30 PM',
    '1:00 PM - 2:30 PM',
    '3:00 PM - 4:30 PM',
    '5:00 PM - 6:30 PM',
  ];

  const [user, setUser] = useState({
    teamA: '',
    teamB: '',
    date: '',
    time: '',
    venue: '',
    type: 'Cricket',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleAdd = () => {
    if (user.teamA === user.teamB) {
      NotificationManager.error('You Cannot Choose the Same Team');
    } else if (user.teamA === '') {
      NotificationManager.error('Team 1 field is empty');
    } else if (user.teamB === '') {
      NotificationManager.error('Team 2 field is empty');
    } else if (user.time === '') {
      NotificationManager.error('Time field is empty');
    } else if (user.date === '') {
      NotificationManager.error('Date field is empty');
    } else if (user.venue === '') {
      NotificationManager.error('Venue field is empty');
    } else {
      const selectedDate = new Date(user.date);
      const currentDate = new Date();

      if (selectedDate.toISOString().split('T')[0] < currentDate.toISOString().split('T')[0]) {
        NotificationManager.error('Selected date is in the past. Please choose a valid date.');
        return;
      } else if (selectedDate > maxDate) {
        NotificationManager.error('Selected date is more than a month in the future. Please choose a valid date.');
      } else {
        Axios.post('http://localhost:8001/teamSchedule', {
          teamA: user.teamA,
          teamB: user.teamB,
          date: user.date,
          time: user.time,
          venue: user.venue,
          type: user.type,
        }).then((response) => {
          if (response.data.message) {
            NotificationManager.error(response.data.message);
          } else {
            NotificationManager.success('Submitted successfully');
            setUser({
              teamA: '',
              teamB: '',
              date: '',
              time: '',
              venue: '',
            });
          }
          window.location.href = '/CricketDash';
        });
      }
    }
  };

  const [cricData, setCricData] = useState([]);
  useEffect(() => {
    Axios.post('http://localhost:8001/getScheduleData', {
      type: 'Cricket',
    }).then((response) => {
      if (response.data.message) {
        NotificationManager.error(response.data.message);
      } else {
        setCricData(response.data);
      }
    });
  }, []);
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);

  return (
    <div>
      <Navbar />
      <Header backgroundImage={Fron} title={'Manage'} title1={'Schedule'} />
      <br />
      <br />
      <Container maxWidth="md">
        <Card sx={{ borderRadius: '20px', border: '2px solid black' }}>
          <Typography textAlign="center">
            <img src={Logo} style={{ width: '200px', height: '200px' }} alt="Logo" />
          </Typography>
          <CardContent>
            <Typography textAlign="center" variant="h6">
              <b>Schedule Cricket Match</b>
            </Typography>
            <br />
            <Stack direction="row" justifyContent="space-evenly">
              <TextField
                variant="outlined"
                label="Team1"
                name="teamA"
                onChange={handleChange}
                sx={{ width: '40%' }}
                select
              >
                {cricData?.map((a) => (
                  <MenuItem key={a.name} value={a.name}>
                    {a.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                variant="outlined"
                label="Team2"
                name="teamB"
                onChange={handleChange}
                sx={{ width: '40%' }}
                select
              >
                {cricData.map((a) => (
                  <MenuItem key={a.name} value={a.name}>
                    {a.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <br />
            <Stack direction="row" justifyContent="space-evenly">
              <input
                type="date"
                min={currentDate}
                max={maxDateString}
                value={user.date}
                name="date"
                onChange={handleChange}
                style={{
                  width: '250px',
                  height: '40px',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
              <TextField
                variant="outlined"
                select
                label="Time"
                name="time"
                value={user.time}
                onChange={handleChange}
                sx={{ width: '30%' }}
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                variant="outlined"
                label="Venue"
                name="venue"
                value={user.venue}
                onChange={handleChange}
                sx={{ width: '30%' }}
                select
              >
                {v.map((a) => (
                  <MenuItem key={a} value={a}>
                    {a}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <br />
            <Typography textAlign="center">
              <Button onClick={handleAdd} variant="contained">
                Schedule Match
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <NotificationContainer />
    </div>
  );
};

export default CricketSchedule;
