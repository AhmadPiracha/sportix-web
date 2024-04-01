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

const Football = () => {
    const [cric, setCric] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8001/getFutsal',

            );


            if (result?.data) setCric(result.data);
        };

        fetchData();
        console.log(cric);
    }, []);
    const delP = (id,name) => {
        console.log("delete");
        axios.put("http://localhost:8001/deleteTeam", {
            id: id
        }).then((res) => {
            if (res) {
                alert(res.data.message);
            } else {
                alert("Deleted succesfully")
            }
        })
        window.location.reload(false);

        axios.put("http://localhost:8001/deleteplayer", {
            name: name
        }).then((res) => {
            if (res) {
                alert(res.data.message);
            } else {
                alert("account deleted succesfully")
            }
        })
        window.location.reload(false);
    }
    return (
        <>
            <Navbar />


            {cric.length >= 0 &&
                <Container maxWidth="lg" sx={{ mt: "40px" }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h5" color="#fff"><b>Futsal</b></Typography>
                        <Link to="/FutsalReg" style={{ textDecoration: "none" }}><Button variant="contained"><AddIcon />Add Teams</Button></Link>
                    </Stack><br />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ background: "linear-gradient(to right, #2b5876, #4e4376);" }}>
                                <TableRow>
                                    <TableCell><Typography color="white" variant="h6"><b>
                                        <div className="font-loader">
                                            Team Id
                                        </div></b></Typography></TableCell>
                                    <TableCell><Typography color="white" variant="h6"><b>
                                        <div className="font-loader">
                                            Team Name
                                        </div></b></Typography></TableCell>
                                    <TableCell><Typography color="white" variant="h6"><b>
                                        <div className="font-loader">
                                            Registration Date
                                        </div>
                                    </b></Typography></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {cric.map((p) => {
                                    return (
                                        <>
                                            <TableRow>
                                                <TableCell><Typography variant='subtitle1'>{p.id}</Typography></TableCell>
                                                <TableCell><Typography variant='subtitle1'>{p.name}</Typography></TableCell>
                                                <TableCell><Typography variant='subtitle1'>{p.date}</Typography></TableCell>
                                                <TableCell><Button varaint="contained" sx={{ background: "green", color: "#fff" }}><RxUpdate />Update</Button></TableCell>
                                                <TableCell><Button varaint="contained" sx={{ color: "#fff", background: "red" }} onClick={() => delP(p.id,p.name)}><DeleteIcon />Delete</Button></TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })}

                            </TableBody>

                        </Table>
                    </TableContainer><br />

                </Container>

            }

        </>
    )
}

export default Football
