import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from './Navbar';
import {
  Container,
  Grid,
  Stack,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';

import Front from '../images/119900.jpg';
import logo from '../images/Sportslogo.png';
import Daira from '../images/Daira.jpg';
import L1 from '../Gallery/1.jpg';
import L2 from '../Gallery/4.jpg';
import L3 from '../Gallery/2.jpg';
import L4 from '../Gallery/3.jpg';
import L5 from '../Gallery/5.jpg';
import L6 from '../Gallery/6.jpg';
import L7 from '../Gallery/7.jpg';
import L8 from '../Gallery/8.jpg';
import L9 from '../Gallery/9.jpg';
import L10 from '../Gallery/10.jpg';
import L11 from '../Gallery/11.jpg';
import L12 from '../Gallery/12.jpg';
import logoFast from '../images/95d028d025dce543f046ee4468f3fbcc.png';
import i1 from '../images/1.jpg';
import i2 from '../images/2.jpg';
import i3 from '../images/3.jpg';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import { RiTeamFill } from 'react-icons/ri';
import { MdSportsVolleyball } from 'react-icons/md';
import { MdOutlineInventory } from 'react-icons/md';
import './Home.css';

const Home = () => {
  const [settings, setSettings] = useState({
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);
  const obj = [
    { image: L1 },
    { image: L2 },
    { image: L3 },
    { image: L4 },
    { image: L5 },
    { image: L6 },
    { image: L7 },
    { image: L8 },
    { image: L9 },
    { image: L10 },
    { image: L11 },
    { image: L12 },
  ];

  return (
    <div>
      <Navbar />
      <div
        className="hhi"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),url(${Front})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '40vh',
        }}
      >
        <Container maxWidth="xxl">
          <Grid container>
            <Grid item lg={3}>
              <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'center', mt: '30%' }}>
                <EmojiEventsRoundedIcon sx={{ color: 'white', fontSize: 80 }} />
                <Stack direction="column">
                  <Typography color="white" variant="h5" sx={{ fontFamily: 'Kanit' }}>
                    <b>3&nbsp;+</b>
                  </Typography>
                  <Typography color="#81b00e" variant="h5" sx={{ fontFamily: 'Kanit' }}>
                    <b>Events</b>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item lg={3}>
              <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'center', mt: '30%' }}>
                <RiTeamFill size={80} color="aliceblue" />
                <Stack direction="column">
                  <Typography color="white" variant="h5">
                    <b>120&nbsp;+</b>
                  </Typography>
                  <Typography color="#81b00e" variant="h5" sx={{ fontFamily: 'Kanit' }}>
                    <b>Players</b>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item lg={3}>
              <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'center', mt: '30%' }}>
                <MdSportsVolleyball size={80} color="aliceblue" />
                <Stack direction="column">
                  <Typography color="white" variant="h5">
                    <b>20&nbsp;+</b>
                  </Typography>
                  <Typography color="#81b00e" variant="h5" sx={{ fontFamily: 'Kanit' }}>
                    <b>Teams</b>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item lg={3}>
              <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'center', mt: '30%' }}>
                <MdOutlineInventory size={80} color="aliceblue" />
                <Stack direction="column">
                  <Typography color="white" variant="h5">
                    <b>50&nbsp;+</b>
                  </Typography>
                  <Typography color="#81b00e" variant="h5" sx={{ fontFamily: 'Kanit' }}>
                    <b>Sports Equipment</b>
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container maxWidth="xxl" sx={{ background: 'white' }}>
        <Grid container>
          <Grid item lg={6}>
            <Container sx={{ mt: '80px', ml: '40px' }}>
              <Typography variant="h6" sx={{ fontFamily: 'cursive', color: '#81b00e' }}>
                Our History
              </Typography>
              <Typography variant="h4" sx={{ fontFamily: 'sans-serif', color: 'black' }}>
                <b>
                  About <span style={{ color: '#81b00e' }}>SportiX</span>
                </b>
              </Typography>
              <br />
              <Typography color="#A3A4A4" textAlign="justify">
                Sportix provides a platform for sports administrators at FAST-NUCES to manage the university's sports system.
                The main purpose is to automate the sports system and provide a platform for sports officers and students to connect.
                Sports officers can manage sports inventory and activities, while students can view equipment availability, game schedules, and results.
              </Typography>
            </Container>
          </Grid>
          <Grid item lg={6}>
            <br />
            <br />
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={logo} style={{ width: '400px', height: '400px' }} alt="SportiX Logo" />
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xxl" sx={{ background: '#000', mt: '-20px' }}>
        <Typography textAlign="center" color="white" variant="h4" mt="20px" fontFamily="cursive">
          <b>Upcoming Events</b>
        </Typography>
        <br />
        <br />
        <Grid container sx={{ paddingBottom: '40px' }}>
          <Grid item lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 380 }}>
              <CardActionArea>
                <CardMedia component="img" height="340" image={Daira} alt="Daira Event" />
                <CardContent>
                  <Typography gutterBottom variant="h4" textAlign="center" component="div" fontFamily="sans-serif">
                    <b>Daira</b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontFamily="sans-serif">
                    DAIRA'23 caters to a variety of interests, so buckle your seatbelts because at DAIRA, there is something for everyone!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 380 }}>
              <CardActionArea>
                <CardMedia component="img" height="340" image={logoFast} alt="Fast League Event" />
                <CardContent>
                  <Typography gutterBottom variant="h5" textAlign="center" component="div" fontFamily="sans-serif">
                    <b>Fast League</b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontFamily="sans-serif">
                    Annual Sports League of FAST-NUCES offers a variety of sports competitions.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xxl" sx={{ background: 'white', pb: '20px' }}>
        <br />
        <br />
        <Typography textAlign="center" color="#81b00e" variant="h6" fontFamily="cursive">
          Gallery
        </Typography>
        <Typography textAlign="center" variant="h4" fontFamily="sans-serif">
          Our <span style={{ color: '#81b00e' }}>Latest Media</span>
        </Typography>
        <br />
        <Container maxWidth="lg">
          <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {obj.map((o) => {
              return (
                <Card sx={{ maxWidth: 280, borderRadius: '20px', my: '10px', mx: '0px' }}>
                  <CardActionArea>
                    <CardMedia component="img" height="240" image={o.image} alt="Gallery Image" />
                  </CardActionArea>
                </Card>
              );
            })}
          </Stack>
        </Container>
      </Container>
      <Container sx={{ my: '20px', mx: '40px', color: 'white' }}>
        <Typography color="#A3A4A4" textAlign="start">
          Copyright © SportiX 2023. All Rights Reserved
        </Typography>
      </Container>
    </div>
  );
};

export default Home;
