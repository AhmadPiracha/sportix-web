import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Grid, Typography, Avatar } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Fron from "../images/fro.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/Navbar";

const cardStyle = {
  mb: 2,
  width: "30%",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
    cursor: "pointer",
    boxShadow: "3px 4px 0px 0px #4e57ef",
  },
  borderRadius: "10px",
};

const cardContainerStyle = {
  display: "flex",
  overflowX: "auto",
  marginBottom: "2rem",
};

const RoundRobinScheduler = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const location = useLocation();
  const Leaguename = location.state?.name;

  
  const formatDate = (dateString) => {
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB'); // Adjust the locale as needed
    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8001/getLeagueSchedule?Leaguename=${Leaguename}`
        );
        if (response.data) {
          setSchedule(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Leaguename]);
  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      window.location.replace('/');
    }
}, []);
  return (
    <div style={{ background: "#EDEDED" }}>
      <Navbar />

      <Container
        maxWidth="xxl"
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${Fron})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "40vh",
        }}
      ></Container>
      <Container maxWidth="lg" sx={{ mt: "40px" }}>
        <Button
          variant="contained"
          size="medium"
          color="error"
          onClick={() => navigate("/League")}
        >
          <ArrowBackIcon />
          Back
        </Button>
        <div className="gradient-text">
          <Typography textAlign="center" variant="h4" fontFamily={"Kanit"}>
            <b>{Leaguename}</b>
          </Typography>
        </div>
      </Container>
      <br />
      <br></br>

      <Container maxWidth="lg">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {schedule.map((match, matchIndex) => (
            <Card
              key={matchIndex}
              sx={cardStyle}
              style={{ background: 'linear-gradient(to right, #3d7eaa, #ffe47a)' }}
            >
              <CardContent>
                <Typography variant="h6">
                  <b>Match {match.Match_Id}</b>
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <b>
                    <Typography>
                      {match.team1} VS {match.team2}
                    </Typography>
                  </b>
                </div>
                <Typography>Time {match.slot}</Typography>
                <Typography>Match Date {formatDate(match.Match_Date)}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RoundRobinScheduler;
