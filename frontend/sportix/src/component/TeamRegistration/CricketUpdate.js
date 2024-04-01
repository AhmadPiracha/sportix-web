import { Card, CardContent, Container, TextField,Stack, Typography,Button } from '@mui/material'
import React,{useState,useEffect} from 'react'
import Logo from "../images/C.png"
import axios from 'axios';
const CricketUpdate = (props) => {
  const [pData,setPData] = useState([]);
  const [players, setPlayers] = useState([
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
    { name: "",  rollno: "" },
  ]);
    const {id,name,date} = props;
    const [preTeam,setPreTeam] = useState(name);
    const [user, setUser] = useState({
        id:id,
        name: name,
        date: date,
        type: "Cricket",
      })
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        })
      }
      useEffect(()=>{
        axios.post("http://localhost:8001/getPlayers",{
        name:name
       }).then((responce)=>{
        if(responce.data.message){
        alert(responce.data.message);
        setPData(responce.data)
        console.log(responce.data)
      }
        else{
         setPData(responce.data)
         console.log(responce.data)
        }
       })
      },[])
      const handleadd = () =>{
        console.log(user)
        console.log(players);
        axios.put("http://localhost:8001/updateteam", {
            id: user.id,
        name: user.name,
        date: user.date,
        type: user.type,
      }).then((responce) => {
        if (responce.data.message) {
          alert(responce.data.message);
          updatePlayers();
        }

      })
      }
      const updatePlayers = () =>{
        console.log(preTeam);
        console.log(user.name)
        axios.put("http://localhost:8001/updateteamfromplayer", {
            preTeam:preTeam,
            curTeam:user.name,
      }).then((responce) => {
        if (responce.data.message) {
          alert(responce.data.message);
          window.location.reload(false);
        }

      })
      }
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
   <Container maxWidth="sm" sx={{mt:"30px"}}>
    <Card>
        <CardContent>
            <Stack direction="column" spacing={1}>
            <img src={Logo} />
                <Typography variant="h5" textAlign="center"><b>Update Cricket Team</b></Typography>
                <b> <label>Team id</label></b>
                <TextField type='text'value={user.id} name="name"  label="Enter Team Name" disabled/>
            <b> <label>Update Team Name</label></b>
            <TextField type='text'value={user.name} name="name" onChange={handleChange}  label="Enter Team Name" />
            <b><label>Update Registration Date</label></b>
            <TextField name="date"  value={user.date} onChange={handleChange}  type='date' />
            </Stack>
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
                    pData.map((value, index) => {
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
                                value={value.playername}
                                onChange={(event) => handleInputChange(event, index, "Playername")}
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
                                value={value.rollno}
                                name='rollno'
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
            <Button variant='contained' type='submit' onClick={handleadd}>Update</Button>
        </CardContent>
    </Card>
   </Container>
   </>
  )
}

export default CricketUpdate
