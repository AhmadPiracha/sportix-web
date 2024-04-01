import React, { useState, useEffect } from 'react';
import Logo from '../images/20465727.jpg'
import { CardContent, Divider, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import foot from '../images/foot.jpg'
import bad from '../images/Badmintion.jpg'
import bask from '../images/Basketball.jpg'
import voll from '../images/voll.jpg'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Stack, Typography, Container } from '@mui/material'
import "./Teams.css"
import cricLogo from '../images/6380622-removebg-preview.png'
import futLogo from '../images/aa.png'
import BaskLogo from '../images/b.png'
import BadLogo from '../images/Badminton.png'
import Voll from '../images/Vo.png'
import WebFont from 'webfontloader';
import Fron from '../images/ml.jpg'
const Teams = () => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Droid Sans', 'Chilanka']
            }
        });
    }, []);

    const sports = [{
        key: 1,
        name: "Cricket",
        image: Logo,
        link: "/Cricket",
        logo: cricLogo,
        color: "linear-gradient(to right, #1f4037, #99f2c8)"
    }, {
        key: 2,
        name: "Futsal",
        image: foot,
        link: "/Football",
        logo: futLogo,
        color: "linear-gradient(to right, #e65c00, #f9d423)"

    },
    {
        key: 3,
        name: "Basketball",
        image: bask,
        logo: BaskLogo,
        color: "linear-gradient(to right, #333333, #dd1818)",
        link:"/Basketball"

    }, {
        key: 4,
        name: "Badminton",
        image: bad,
        logo: BadLogo,
        link:"/Badminton",
        color: "linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)"


    }, {
        key: 5,
        name: "Vollyball",
        image: voll,
        logo: Voll,
        link:"/Vollyball",
        color: "linear-gradient(to right,#db36a4, #f7ff00)"
    },];

    return (
        <>
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
                                <Typography color="white" variant='h4' fontFamily={'Cinzel'}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Teams&nbsp;Registration </b></Typography>
                            </div>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

            </Container>
            <Typography>&nbsp;&nbsp;&nbsp;&nbsp;</Typography>

            <Container maxWidth="md">
                <Stack direction="row" sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                    {sports.map((sport) => {
                        return (
                            <>
                                <Link to={sport.link} style={{ textDecoration: "none" }}>  <Card className='card' sx={{ background: sport.color }}>
                                    <CardContent>
                                        <Grid container>
                                            <Grid item lg={6}>
                                                <Stack direction="column" spacing={0}>

                                                    <Typography variant="h5" color="#b3bac6"><strong>0{sport.key}</strong></Typography>

                                                    <Typography variant="h6" color="#fff"><b>{sport.name}</b></Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item lg={6}>
                                                <img style={{ width: "90px", height: "90px" }} src={sport.logo} alt="" />
                                            </Grid>
                                        </Grid>

                                    </CardContent>
                                </Card>
                                </Link>
                            </>
                        )
                    })}
                </Stack>
            </Container>
        </>
    )
}

export default Teams
