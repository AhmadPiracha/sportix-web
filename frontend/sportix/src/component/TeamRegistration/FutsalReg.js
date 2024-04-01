import React, { useState } from 'react';
import Navbar from '../dashboard/Navbar'
import { Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material'
import Logo from "../images/C.png"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
const FutsalReg = () => {
  
  const [user, setUser] = useState({
    name: "",
    date: "",
    type: "Futsal",
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    })
  }
  const handleadd = () => {
    const regex = /^[a-zA-Z ]+$/
    const regex1 = /^[A-Za-z0-9\s]*[A-Za-z][A-Za-z0-9\s]*$/
    const regex2 = /^\d{2}F\d{4}$/;
    if (user.name == "") {
      alert("Team Name cannot be Empty!")
    }
    else if (!regex1.test(user.name)) {
      alert("Team name Doesn't include Special Character!")
    } else if (user.date == "") {
      alert("Registeration Date cannot be Empty!")
    } 
    else {
      alert("Registerd Successfully");
      axios.post("http://localhost:8001/team", {
        name: user.name,
        date: user.date,
        type: user.type,
      }).then((responce) => {
        if (responce.data.message) {
          alert(responce.data.message);
        }

      })
      window.location.href = "/Cricket";
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
          <Stack direction="column" spacing={1}>
            <img src={Logo} />
            <Typography variant='h6' textAlign="start" fontFamily="Shadows Into Light"><b>Cricket Team Registration</b></Typography>
            <b> <label>Team Name</label></b>
            <TextField type='text' name="name" value={user.name} onChange={handleChange} label="Enter Team Name" />
            <b><label>Registration Date</label></b>
            <TextField name="date" value={user.date} onChange={handleChange} type='date' />
            <Button variant='contained' type='submit' onClick={handleadd}>Register</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  </>

  )
}

export default FutsalReg
