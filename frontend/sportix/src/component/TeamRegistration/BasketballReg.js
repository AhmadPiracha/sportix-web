import React, { useState } from 'react';
import Navbar from '../dashboard/Navbar'
import { Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material'
import Logo from "../images/Basketball11.jpg"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const BasketballReg = () => {
    const [players, setPlayers] = useState([
        { name: "",  rollno: "" },
        { name: "",  rollno: "" },
        { name: "",  rollno: "" },
        { name: "",  rollno: "" },
        { name: "",  rollno: "" },
        { name: "",  rollno: "" },
      ]);
      const [user, setUser] = useState({
        name: "",
        date: "",
        type: "Basketball",
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
          alert("Team name Doesn'tinclude Special Character!")
        } else if (user.date == "") {
          alert("Registeration Date cannot be Empty!")
        } 
        else if (players[0].name == "") {
          alert("player 1  Name is Missing")
        }
        else if(players[0].rollno=="")
        {
          alert("player 1  Roll No is Missing")
        }
        else if (!regex.test(players[0].name))
        {
          alert("Player 1 Name Doesn't include Special character or Numeric values!");
        }
        else if (!regex2.test(players[0].rollno)) {
          alert("Kindly Enter Correct Roll No (19F1111)");
        }
        else if (players[1].name == "") {
          alert("player 2  Name is Missing")
        }
        else if(players[1].rollno=="")
        {
          alert("player 2  Roll No is Missing")
        }
        else if (!regex.test(players[1].name))
        {
          alert("Player 2 Name Doesn't include Special character or Numeric values!");
        }
        else if (!regex2.test(players[1].rollno)) {
          alert("Kindly Enter Correct Roll No (19F1111)");
        }
        else if (players[2].name == "") {
          alert("player 3 Name is Missing")
        }
        else if(players[2].rollno=="")
        {
          alert("player 3  Roll No is Missing")
        }
        else if (!regex.test(players[2].name))
        {
          alert("Player 3 Name Doesn't include Special character or Numeric values!");
        }
        else if (!regex2.test(players[2].rollno)) {
          alert("Kindly Enter Correct Roll No (19F1111)");
        }
        else if (players[3].name == "") {
            alert("player 4 Name is Missing")
          }
          else if(players[3].rollno=="")
          {
            alert("player 4  Roll No is Missing")
          }
          else if (!regex.test(players[3].name))
          {
            alert("Player 4 Name Doesn't include Special character or Numeric values!");
          }
          else if (!regex2.test(players[3].rollno)) {
            alert("Kindly Enter Correct Roll No (19F1111)");
          }
          else if (players[4].name == "") {
            alert("player 5 Name is Missing")
          }
          else if(players[4].rollno=="")
          {
            alert("player 5  Roll No is Missing")
          }
          else if (!regex.test(players[4].name))
          {
            alert("Player 5 Name Doesn't include Special character or Numeric values!");
          }
          else if (!regex2.test(players[4].rollno)) {
            alert("Kindly Enter Correct Roll No (19F1111)");
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
          for (let p = 0; p < 6; p++) {
            if (players[p].name == "") {
    
            } else {
              axios.post("http://localhost:8001/player", {
                team: user.name,
                name: players[p].name,
                rollno: players[p].rollno
              }).then((responce) => {
                if (responce.data.message) {
                  alert(responce.data.message);
    
                }
              })
            }
          }
         
          window.location.href = "/Basketball";
        }
        console.log(players);
      
      };
      const handleInputChange = (event, index, key) => {
     
        const value = event.target.value;
        setPlayers((prevState) => {
          const newPlayers = [...prevState];
          newPlayers[index][key] = value;
          return newPlayers;
        });
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
            <Typography variant='h6' textAlign="start" fontFamily="Shadows Into Light"><b>Basketball Team Registration</b></Typography>
            <b> <label>Team Name</label></b>
            <TextField type='text' name="name" value={user.name} onChange={handleChange} label="Enter Team Name" />
            <b><label>Registration Date</label></b>
            <TextField name="date" value={user.date} onChange={handleChange} type='date' />

            <table class="tab
            le table-bordered">
              <table class="table caption-top">
                <caption>Player's Information</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Player Name</th>
                    
                    <th scope="col">Roll No</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    players.map((value, index) => {
                      return (
                        <>
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                variant="standard"
                                size="small"
                                key={index}
                                value={players.name}
                                onChange={(event) => handleInputChange(event, index, "name")}
                                type='text'
                                required
                              />


                            </td>
                            
                            <td>
                              <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                variant="standard"
                                size="small"
                                type='text'
                                key={index}
                                value={players.rollno}
                                onChange={(event) => handleInputChange(event, index, "rollno")}
                                required
                              />
                            </td>
                          </tr>
                        </>
                      )
                    })
                  }



                </tbody>

              </table>
            </table>

            <Button variant='contained' type='submit' onClick={handleadd}>Register</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  </>

  )
}

export default BasketballReg
