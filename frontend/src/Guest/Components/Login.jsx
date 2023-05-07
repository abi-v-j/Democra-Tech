import React, { useState } from "react";
import BannerBackground from "../Assets/home-banner-background.png";

import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Container, Grid, Typography, TextField, Button, Box, Alert } from '@mui/material';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Login = () => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

 

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  const navigate = new useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [msg, setMsg] = useState("")


  const loginData = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "" || password.trim() === "") {
      alert("Email and password are required");
      
    }
    else if (!emailRegex.test(email)) {
      alert("Invalid email format");
      
    }
    else {
      var dat = {
        email: email,
        password: password,
      };
      axios.post("http://localhost:4000/login", dat).then((response) => {

      
        
      

        if (response.data.login === "admin") {
          sessionStorage.setItem("aid", response.data.id);
          navigate("/Admin/");
        } else if (response.data.login === "user") {
          sessionStorage.setItem("uid", response.data.id);
          navigate("/User/");
        } else if (response.data.login === "electionagent") {
          sessionStorage.setItem("eid", response.data.id);
          navigate("/Agent/");
        }
        else {
          alert("Invalid Credetials");
        }
      });
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Empowering Our Communities for a Brighter Future
          </h1>
          <p className="primary-text">
            "Voting is not just a right, it's a responsibility. It's a way to shape the world we live in and make our voices heard."
          </p>
          <Link to="/Registration" style={{ textDecoration: 'none' }}>
            <button className="secondary-button">
              Sign Up <FiArrowRight />{" "}
            </button>
          </Link>
        </div>
        <div className="home-image-section">
          <Container maxWidth="xs" sx={{ borderRadius: '10px' }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10}>
                <Typography component="h1" variant="h5" align="center">
                  Sign in
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    id="username"
                    label="Email"
                    name="username"
                    autoFocus
                    sx={{ borderRadius: '50px' }}
                  />
                  <TextField
                    margin="normal"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    sx={{ borderRadius: '50px' }}
                  />
                  <Button onClick={()=>loginData()} fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: '50px' }}>
                    Sign In
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>

        </div>
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
      </div>
      
    </div>
  );
};

export default Login;
