import React, { useState } from 'react';
import Navbar from '../dashboard/Navbar'
import { Button, Card, CardContent, Container, Stack, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const TeamReg = () => {
  const [teamData, setTeamData] = useState({
    name: "",
    date: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  }

  const handleadd = () => {
    const regex = /^[a-zA-Z ]+$/;
    const regex1 = /^[A-Za-z0-9\s]*[A-Za-z][A-Za-z0-9\s]*$/;
    const regex2 = /^\d{2}F\d{4}$/;

    if (teamData.name === "") {
      alert("Team Name cannot be Empty!");
    } else if (!regex1.test(teamData.name)) {
      alert("Team name Doesn't include Special Character!");
    } else if (teamData.date === "") {
      alert("Registration Date cannot be Empty!");
    } else if (teamData.type === "") {
      alert("Please select a Team Type!");
    } else {
      alert("Registered Successfully");
      axios.post("http://localhost:8001/team", {
        name: teamData.name,
        date: teamData.date,
        type: teamData.type,
      }).then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        }
      });
      window.location.href = `/${teamData.type}`;
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: 480 }}>
          <CardContent>
            <Stack direction="column" spacing={2}>
              <Typography variant='h6' textAlign="center" fontFamily="Shadows Into Light"><b>Team Registration</b></Typography>
              <TextField type='text' name="name" value={teamData.name} onChange={handleChange} label="Enter Team Name" />
              <TextField name="date" value={teamData.date} onChange={handleChange} type='date' label="Registration Date" />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel htmlFor="team-type">Select Team Type</InputLabel>
                <Select
                  label="Select Team Type"
                  name="type"
                  value={teamData.type}
                  onChange={handleChange}
                  inputProps={{
                    id: 'team-type',
                  }}
                >
                  <MenuItem value="Cricket">Cricket</MenuItem>
                  <MenuItem value="Football">Football</MenuItem>
                  {/* Add more team types as needed */}
                </Select>
              </FormControl>
              <Button variant='contained' type='submit' onClick={handleadd}>Register</Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default TeamReg;
