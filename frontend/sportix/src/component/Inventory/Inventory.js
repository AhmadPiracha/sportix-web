import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import cricLogo from '../images/dda.png'
import futLogo from '../images/090.png'
import BaskLogo from '../images/b.png'
import BadLogo from '../images/Badminton.png'
import Voll from '../images/Vo.png'
import WebFont from 'webfontloader';
import './inventory.css'
import Navbar from '../dashboard/Navbar'
import { createTheme } from '@mui/material/styles';
import Logo from '../images/SS.jpg'
import logo from '../images/xs.jpg'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Fron from '../images/dmdd.jpg'
import { Container } from '@mui/material';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import foot from '../images/220.png'
import bad from '../images/Badmintion.jpg'
import bask from '../images/Basketball.jpg'
import voll from '../images/voll.jpg'

import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import Header from "../Resuable/Header"
const Inventory = () => {


  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka']
      }
    });
  }, []);
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);
  const sports = [{
    key: 1,
    name: "Sports Equipment",
    image: Logo,
    link: "/Manageinventory",
    logo: cricLogo,
    color: "linear-gradient(to right,#db36a4, #f7ff00)"
  }, {
    key: 2,
    name: "Sports Venue",
    image: foot,
    link: "/Managevenue",
    logo: futLogo,
    color: "linear-gradient(to right, #e65c00, #f9d423)"

  },
    ,];
  const navigate = useNavigate();

  return (
    
    <div >
      
      <Navbar />
      <Header backgroundImage={Fron} title={"Manage"} title1={"Inventory"} />
        <Typography>&nbsp;&nbsp;&nbsp;</Typography>
        <Typography>&nbsp;&nbsp;&nbsp;</Typography>
        <Container maxWidth="md">
          <Stack direction="row" sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
            {sports.map((sport) => {
              return (
                <div style={{background:'#EDEDED'}}>
                  <Link to={sport.link} style={{ textDecoration: "none" }}>  <Card className='cd' sx={{ background: sport.color }}>
                    <CardContent>
                      <Grid container>
                        <Grid item lg={6}>
                          <Stack direction="column" spacing={0}>
                            <Typography variant="h5" color="#b3bac6"><strong>0{sport.key}</strong></Typography>
                            <div className='M'>
                              <Typography variant="h6" color="#fff" fontFamily={'Lato'}><b>{sport.name}</b></Typography>
                            </div>
                          </Stack>
                        </Grid>
                        <Grid item lg={6}>
                          <img style={{ width: "120px", height: "120px" }} src={sport.logo} alt="" />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  </Link>
                </div>
              )
            })}
          </Stack>
        </Container>
    </div>
  )
}
export default Inventory
