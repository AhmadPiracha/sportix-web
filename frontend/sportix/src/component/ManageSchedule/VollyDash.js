import React, { useState, useEffect } from 'react'
import Navbar from '../dashboard/Navbar'
import axios from 'axios'
import { Card, CardContent, Grid, TextField } from '@mui/material'
import { Paper, Table, TableHead, TableContainer, Typography, MenuItem, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { RxUpdate } from "react-icons/rx";
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../Resuable/Header";
import Fron from "../Pictures/saaa.jpg";
import img from "../Pictures/voll.jpg";

const VollyDash = () => {
    const [temp,setTemp] =useState(false);
    const [id,setId] =useState()
    const [date,setDate] =useState('')
    const [name,setName] =useState('')
    const [cric, setCric] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8001/getVollyS',

            );


            if (result?.data) setCric(result.data);
        };

        fetchData();
        console.log(cric);
    }, []);

    useEffect(() => {
        if(!localStorage.getItem('token'))
        {
          window.location.replace('/');
        }
    }, []);
    const delP = (id) => {
        console.log("delete");
        axios.put("http://localhost:8001/deleteMatchSchedule", {
            id: id
        }).then((res) => {
            if (res) {
                alert(res.data.message);
            } else {
                alert("Deleted succesfully")
            }
        })
        window.location.reload(false);
    }
    return (
        <>
           <Navbar />
      <Header backgroundImage={Fron} title={"Vollyball"} title1={"Teams"} />
            {!temp?<>
            {cric.length >= 0 &&
                <Container maxWidth="lg" sx={{ mt: "40px" }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h5" color="#fff"><b>Vollyball Schedule</b></Typography>
                        <Link to="/VollySchedule" style={{ textDecoration: "none" }}><Button variant="contained"><AddIcon />Add Schedule</Button></Link>
                    </Stack><br />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ background: "linear-gradient(to right, #2b5876, #4e4376);" }}>
                                <TableRow>
                                    <TableCell><Typography color="white" variant="h6"><b>
                                        <div className="font-loader">
                                            Match Id
                                        </div></b></Typography></TableCell>
                                    <TableCell><Typography color="white" variant="h6"><b>
                                        <div className="font-loader">
                                            Team A
                                        </div></b></Typography></TableCell>
                                    <TableCell><Typography color="white" variant="h6"><b>
                                        <div className="font-loader">
                                            Team B
                                        </div>
                                    </b></Typography></TableCell>
                                    <TableCell>
                                    <Typography color="white" variant="h6"><b>
                                        <div className="font-loader">
                                            Date
                                        </div>
                                    </b></Typography>
                                    </TableCell>
                                    <TableCell>
                                    <Typography color="white" variant="h6"><b>
                                        <div className="font-loader">
                                            Time
                                        </div>
                                    </b></Typography>
                                    </TableCell>
                                    <TableCell>
                                    <Typography color="white" variant="h6"><b>
                                        <div className="font-loader">
                                            Venue
                                        </div>
                                    </b></Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cric.map((p) => {
                                    return (
                                        <>
                                            <TableRow>
                                                <TableCell><Typography variant='subtitle1'>{p.id}</Typography></TableCell>
                                                <TableCell><Typography variant='subtitle1'>{p.teamA}</Typography></TableCell>
                                                <TableCell><Typography variant='subtitle1'>{p.teamB}</Typography></TableCell>
                                                <TableCell><Typography variant='subtitle1'>{p.date}</Typography></TableCell>
                                                <TableCell><Typography variant='subtitle1'>{p.time}</Typography></TableCell>
                                                <TableCell><Typography variant='subtitle1'>{p.venue}</Typography></TableCell>
                                                <TableCell><Button varaint="contained" sx={{ color: "#fff", background: "red" }} onClick={() => delP(p.id)}><DeleteIcon />Delete</Button></TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })}

                            </TableBody>

                        </Table>
                    </TableContainer><br />

                </Container>

            }</>:<></>}

        </>
    )
}

export default VollyDash
