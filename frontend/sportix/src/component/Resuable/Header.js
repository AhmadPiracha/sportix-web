import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';


function ReusableContainer({ backgroundImage, title, title1 }) {

  const theme = createTheme({
    
    typography: {
      fontFamily: ["Cinzel", "serif"].join(","),
    },
  });
  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "40vh",
  };

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="xxl" sx={containerStyle}>
      <Grid container>
        <Grid item lg={3}>
          <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "center", mt: "30%" }}>
            <Stack direction="column" className="glowing-text">
              
              <Typography color="white" variant='h3' fontFamily={"Cinzel"} fontWeight="bold" textAlign={""}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{title}&nbsp;{title1} 
                </Typography>
              
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
    </ThemeProvider>
  );
}

export default ReusableContainer;
