import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FloTraceLogo from './FloTraceLogo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useContext } from 'react';
import { LoginContext } from './store/LoginContext';
import axios from "axios";
import background from '../background.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="black" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.lspssolutions.com/">
        LSPS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function Login({saveClientId, saveClientName, saveEmail, saveToken}) {
    
  const [loginSuccessful, setLoginSuccessful] = useState()
  const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })


  const logMeIn = (e) => {
  axios({
      method: "POST",
      url:"https://flo-trace-api-prod-ugyxg.ondigitalocean.app/token",
      data:{
          email: loginForm.email,
          password: loginForm.password
          }
      })
      .then((response) => {
        saveToken(response.data.access_token);
        saveEmail(loginForm.email);
        saveClientId(response.data.client_id);
        saveClientName(response.data.client_name);
        setLoginSuccessful(true);
        })
      .catch((error) => {
      if (error.response) {
          setLoginSuccessful(false);
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
      email: "",
      password: ""}))

      e.preventDefault()
  }


    const handleChange = (event) => { 
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm" sx={{paddingTop:8, paddingBottom:8}}
      // sx={{
      //   backgroundImage:`url(${background})`,
      //       // backgroundRepeat: "no-repeat",
      //       // backgroundSize: "cover",
      //       // height: "385px",}}>
      // }}>
      >
        <CssBaseline />
        {/* <Box sx={{backgroundImage:`url(${background})`}}> */}
        <Box
          sx={{
            borderRadius:1,
            bgcolor:"white",
            marginTop: 8,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           <FloTraceLogo />
          {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={logMeIn} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              text={loginForm.email}
              value={loginForm.email}
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              text={loginForm.password}
              value={loginForm.password}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>


            {loginSuccessful===false && <Typography sx={{color:"error.main"}}>Incorrect credentials. Please try again or  contact administrator for assistance.</Typography>}
            
            
             
            {/* {isLoggedIn && <h1>Welcome back!</h1>} */}
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> 
              </Grid>
            </Grid> */}
          </Box>
          <Copyright sx={{ mt: 4, mb: 4 }} /> 
        </Box>
        {/* </Box> */}
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}