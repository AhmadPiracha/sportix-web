import React, { useState, useEffect } from 'react'
import Navbar from '../dashboard/Navbar'
import axios from 'axios'
import { Card, CardContent, Grid, TextField,InputAdornment } from '@mui/material'
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
import Axios from 'axios'
import "../dashboard/Navbar.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Logo from "../images/pi.png"
import "../Inventory/Button.css";
import Header from "../Resuable/Header";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import SearchIcon from "@mui/icons-material/Search"; 
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const VenueDash = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [temp, setTemp] = useState(false);
    const [id, setId] = useState()
    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [cric, setCric] = useState([])
    const [searchQuery, setSearchQuery] = useState(""); 

    const handleAdd = () => {

        Axios.post("http://localhost:8001/dummy", {


        }).then((responce) => {
            if (responce.data.message) {
                alert(responce.data.message);
            } else {
                alert("submitted succesfully");


            }


        })


    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8001/getVenueBooking',

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

        axios.put("http://localhost:8001/UpdateVenuebooking", {
            id: id
        }).then((res) => {
            if (res) {
                alert(res.data.message);
            } else {

            }
        })
        NotificationManager.success("Booking Confirmed");
        window.location.reload(false);
    }
    const delP1 = (id) => {

        axios.put("http://localhost:8001/UpdateVenuebooking1", {
            id: id
        }).then((res) => {
            if (res) {
                alert(res.data.message);
            } else {

            }
        })
        NotificationManager.error('Error message', 'Booking Declined', 50000, () => {
            alert('callback');
          });
        window.location.reload(false);
    }
    const filteredCric = cric.filter((p) =>
    p.userRollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );
    return (
        <div style={{background:'#EDEDED'}}>
            <Navbar />
            <Header backgroundImage={Fron} title={"Venue"} title1={"Booking"} />
            {!temp ? <>
                {cric.length >= 0 &&
                    <Container maxWidth="lg" sx={{ mt: "40px" }}>
                        <Stack direction="row" justifyContent="space-between">
                        <Link to="/Home" style={{ textDecoration: "none" }}>
                    {" "}
                    <button class="bn30" role="button">
                      <ArrowBackIcon />
                      Back
                    </button>
                    </Link>
                    <TextField
                  label="19F-XXXX"
                  variant="outlined"
                  value={searchQuery}
                  size="small"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ marginLeft: "520px", width:"20%" }}
                  InputProps={{
                    style: { background: "white" },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                    <Link to="/Venuerecord" style={{ textDecoration: "none" }}>
                  <button class="button-85" role="button">
                    <AddIcon />
                    Venue Record
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

                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                    {filteredCric.map((p) => {

                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell><Typography variant='subtitle1'>{p.id}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>{p.displayName}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>{p.userRollNo}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{p.name}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>{p.type}</Typography></TableCell>
                                                    <TableCell><Typography variant='subtitle1'>{p.status}</Typography></TableCell>
                                                    <TableCell>
                                                        <Button color='success' onClick={() => delP(p.id)} sx={{ borderRadius: "15px" }} >  <Typography variant='subtitle1' fontFamily='Lato' >
                                                            Allow
                                                        </Typography>
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => delP1(p.id)} sx={{ borderRadius: "15px" }} >  <Typography variant='subtitle1' fontFamily='Lato' color='red'>
                                                            Decline
                                                        </Typography>
                                                        </Button>
                                                    </TableCell>

                                                </TableRow>
                                            </>
                                        )
                                    })}

                                </TableBody>


                            </Table>

                        </TableContainer > <br />


                    </Container >


                }</> : <></>}
                 <NotificationContainer />

        </div>
    )
}

export default VenueDash
