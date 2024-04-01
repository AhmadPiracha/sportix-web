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
import Fron from '../images/opp.jpg'
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import { RiTeamFill } from "react-icons/ri";
import { MdSportsVolleyball } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import '../Inventory/inventory.css'
import Axios from 'axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Logo from "../images/pi.png"

const Venuerecord = () => {
    const [temp, setTemp] = useState(false);
    const [id, setId] = useState()
    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [cric, setCric] = useState([])

    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8001/getVenueBookingrecord',

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

    return (
        <div style={{background:'#EDEDED'}}>
            <Navbar />

            <Container maxWidth="xxl"
                sx={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${Fron})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed"
                    , height: "40vh"
                }}
            >
                <Grid container>
                    <Grid item lg={3}>
                        <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "center", mt: "30%" }}>

                            <Stack direction="column"><div className='dd'>
                                <Typography color="white" variant='h4' fontFamily={'Cinzel'}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Venue&nbsp;Booking&nbsp;Record </b></Typography>
                            </div>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

                </Container>
            {!temp ? <>
                {cric.length >= 0 &&
                    <Container maxWidth="lg" sx={{ mt: "40px" }}>
                        <Stack direction="row" justifyContent="space-between">
                        <Link to="/VenueDash" style={{ textDecoration: "none" }}>
                    {" "}
                    <button class="bn30" role="button">
                      <ArrowBackIcon />
                      Back
                    </button>
                    </Link>
                     </Stack><br />

                        <TableContainer component={Paper}>
                            <Table >
                                <TableHead sx={{ background: "#8BC34A" }} fontWeight={'600'}  >
                                    <TableRow>
                                        <TableCell><Typography color="white" variant="h6" ><b>
                                            <div className="font-loader" fontFamily={'Lato'}>
                                                Id
                                            </div></b></Typography></TableCell>
                                        <TableCell><Typography color="white" variant="h6"><b>
                                            <div className="font-loader">
                                                Name
                                            </div></b></Typography></TableCell>
                                        <TableCell><Typography color="white" variant="h6"><b>
                                            <div className="font-loader">
                                                Roll No
                                            </div>
                                        </b></Typography></TableCell>
                                        <TableCell><Typography color="white" variant="h6"><b>
                                            <div className="font-loader">
                                                Requested Venue
                                            </div>
                                        </b></Typography></TableCell>
                                        <TableCell><Typography color="white" variant="h6"><b>
                                            <div className="font-loader">
                                                Venue Type
                                            </div>
                                        </b></Typography></TableCell> 
                                        <TableCell><Typography color="white" variant="h6"><b>
                                            <div className="font-loader">
                                                Booking Status
                                            </div>
                                        </b></Typography></TableCell>

                                        
                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                    {cric.map((p) => {

                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell><Typography variant='subtitle1'>{p.id}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>{p.displayName}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>{p.userRollNo}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{p.name}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>{p.type}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>{p.status}</Typography></TableCell>
                                                    

                                                </TableRow>
                                            </>
                                        )
                                    })}

                                </TableBody>


                            </Table>

                        </TableContainer > <br />


                    </Container >
                }</> : <></>}

        </div>
    )
}

export default Venuerecord
