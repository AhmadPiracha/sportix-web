import React, { useState, useEffect } from 'react';
import Navbar from '../dashboard/Navbar';
import axios from 'axios';
import {
  Paper,
  Table,
  TableHead,
  TableContainer,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../Resuable/Header';
import Fron from '../images/res.jpg';
import { useNavigate } from 'react-router-dom';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { createTheme, ThemeProvider } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

const Result = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ['Ubuntu Mono', 'monospace'].join(','),
      fontSize: 14,
      fontWeightBold: 600,
    },
  });

  const [cric, setCric] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:8001/getSchedule');
        if (result?.data) {
          console.log(result.data); // Log the data received from the API
          const sortedData = result.data.sort((a, b) => b.id - a.id);
          setCric(sortedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const addMatchResult = () => {
    if (selectedMatchId) {
      const resultIsDraw = isDraw ? true : false;
      const resultWinner = isDraw ? 'Draw' : winner;
      axios
        .post('http://localhost:8001/addMatchResult', {
          id: selectedMatchId,
          team1: selectedMatch.teamA,
          team2: selectedMatch.teamB,
          date: selectedMatch.date,
          winner: resultWinner,
        })
        .then((res) => {
          if (res) {
            NotificationManager.success(
              '',
              'Match result added successfully',
              7000
            );
          } else {
            NotificationManager.error(
              '',
              'Failed to add match result',
              7000
            );
          }
          axios
            .delete(`http://localhost:8001/DeleteSchedule/${selectedMatchId}`)
            .then((res) => {
              if (res) {
                alert(res.data.message);
              } else {
              }
            });
        });
    }
    setOpenDialog(false);
    navigate('/Result');
  };

  const today = new Date();
  const playedMatches = cric.filter(
    (match) => new Date(match.date) < today
  );

  return (
    <div style={{ background: '#EDEDED' }}>
      <Navbar />
      <Header backgroundImage={Fron} title={'Result'} title1={'Management'} />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ mt: '40px' }}>
          <Stack direction="row" justifyContent="space-between">
            <button
              className="bn30"
              role="button"
              onClick={() => navigate('/Home')}
            >
              <ArrowBackIcon />
              Back
            </button>
            <button
              className="button-85"
              role="button"
              onClick={() => navigate('/ResultRecord')}
            >
              <AddIcon />
              Result Record
            </button>
          </Stack>

          <br />
          <br />
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ background: '#8BC34A' }}>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" color="white">
                      Match Id
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="white">
                      Team A
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="white">
                      Team B
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="white">
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="white">
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="white">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="white">
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cric
                  .filter((match) => !match.result)
                  .map((match) => (
                    <TableRow key={match.id}>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {match.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {match.teamA}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {match.teamB}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {match.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {new Date(match.date).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            }
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {new Date(match.date) <= today
                            ? 'Played'
                            : 'Not Played'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {new Date(match.date) <= today && (
                          <Button
                            variant="contained"
                            sx={{ color: '#fff', background: 'green' }}
                            onClick={() => {
                              setSelectedMatchId(match.id);
                              setSelectedMatch(match);
                              setOpenDialog(true);
                            }}
                          >
                            Add Result
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: {
              width: '500px',
            },
          }}
        >
          <DialogTitle
            sx={{
              background: 'linear-gradient(to right, #2b5876, #4e4376)',
              color: 'white',
            }}
          >
            Result Management
          </DialogTitle>
          <br></br>
          <DialogContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDraw}
                  onChange={(e) => setIsDraw(e.target.checked)}
                  name="isDraw"
                  color="primary"
                />
              }
              label="Is Draw"
            />
            <br />
            <br></br>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Winner</InputLabel>
              <Select
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
                label="Winner"
                disabled={isDraw}
              >
                <MenuItem value={selectedMatch.teamA}>
                  {selectedMatch.teamA}
                </MenuItem>
                <MenuItem value={selectedMatch.teamB}>
                  {selectedMatch.teamB}
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={addMatchResult}
            >
              Add Result
            </Button>
          </DialogContent>
        </Dialog>
        <NotificationContainer />
      </ThemeProvider>
    </div>
  );
};

export default Result;
