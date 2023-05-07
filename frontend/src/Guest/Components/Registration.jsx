import React, { useLayoutEffect } from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { TextField, Button, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, OutlinedInput } from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { MuiOtpInput } from 'mui-one-time-password-input'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = new useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedVal, setSelectedVal] = useState("");
  const [selVal, setSelVal] = useState("");
  const [dis, setDis] = useState("");
  const [ssection, setsSection] = useState([]);
  const [sward, setsWard] = useState([]);
  const [district, setDistrict] = useState([]);
  const [section, setSection] = useState([]);
  const [userfname, setUserfname] = useState("");
  const [userlname, setUserlname] = useState("");
  const [useraddress, setUseraddress] = useState("");
  const [usergender, setUsergender] = useState("");
  const [uservoterid, setUservoterid] = useState("");
  const [userproof, setUserproof] = useState(null);
  const [userpassword, setUserpassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [useremail, setUseremail] = useState("");
  const [Wrong, setWrong] = useState("");
  const [wid, setWid] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [otp, setOtp] = useState("");
  const [istime, setIstime] = useState("");
  const [remainingtime, setremainingtime] = useState("");
  const [open, setOpen] = React.useState(false);

  function startTimer() {
    setIstime(true);
    setremainingtime(10);
    setTimeout(() => {
      setIstime(false)
    }, 10000);
  }

  const CheckVal = () => {
    axios.get(`http://localhost:4000/UserValidation/${useremail}`).then((response) => {
      var data = response.data.UserValidation;

      console.log(data);
   
    if (data) {
      alert("Already a user");
    } else {
      if (userpassword == repassword) {
        inputData();
        startTimer();

      } else {
        alert("Passwords not Same")

      }

    }
  });

  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleProofSelect = (event) => {
    const file = event.target.files[0];
    setUserproof(file);
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  function generateOTP() {
    const length = 6;
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }
  const handleChange = (newValue) => {
    setOtp(newValue);
    if (newValue.length == 6) {
      if (sessionStorage.getItem("otp") == newValue) {
        handleClose();
        alert("Registration Successfull");
        console.log(sessionStorage.getItem("us_id"));
        axios.post("http://localhost:4000/UserEmailAccept/" + sessionStorage.getItem("us_id")).then((response) => {
          fetchData();

        });
        navigate("/Login/");
      }
      else {
        handleClickOpen();
        setWrong("Incorrect OTP!");
      }


    }
  }
  const Resend = () => {
    startTimer();
    const OTP = generateOTP();
    sessionStorage.setItem("otp", OTP);
    var dat = {
      email: sessionStorage.getItem("email"),
      VerNum: OTP,

    };
    axios.post("http://localhost:4000/ResentOtp/", dat).then((response) => {
      console.log(response.data);


      fetchData();
    });
  };
  const inputData = (e) => {
    const OTP = generateOTP();
    sessionStorage.setItem("email", useremail);
    sessionStorage.setItem("otp", OTP);
    console.log(OTP);
    const frm = new FormData();
    frm.append("user_fname", userfname);
    frm.append("user_lname", userlname);
    frm.append("user_address", useraddress);
    frm.append("user_gender", usergender);
    frm.append("user_voterid", uservoterid);
    frm.append("user_photo", selectedFile);
    frm.append("user_proof", userproof);
    frm.append("user_password", userpassword);
    frm.append("user_email", useremail);
    frm.append("VerNum", OTP);

    frm.append("ward_id", wid);

    axios.post("http://localhost:4000/User/", frm).then((response) => {
      sessionStorage.setItem("us_id", response.data.us_id[0].id);

      handleClickOpen();


    });
  };

  const ajaxsection = (id) => {
    axios
      .get(`http://localhost:4000/Condition_subport/${id}/${dis}`)
      .then((response) => {
        var data = response.data.subsection;

        console.log(data);
        setsSection(data);
      });
  };
  const ajaxward = (id) => {
    axios.get(`http://localhost:4000/Condition_ward/${id}`).then((response) => {
      var data = response.data.Condition_ward;

      console.log(data);
      setsWard(data);
    });
  };
  const fetchData = () => {
    axios.get("http://localhost:4000/District").then((response) => {
      var data = response.data.district;
      setDistrict(data);
    });

    axios.get("http://localhost:4000/Sectionport").then((response) => {
      var data = response.data.Sectionport;
      setSection(data);
    });
  };
  useLayoutEffect(() => {
    let intervalId;
    if (istime && remainingtime >= 0) {
      intervalId = setInterval(() => {
        setremainingtime((prevRemainingTime) => prevRemainingTime - 1);
      }, 1000)
    }
    return () => clearInterval(intervalId);
  }, [istime, remainingtime]);

  useEffect(() => {
    fetchData();

  }, []);

  return (

    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">Uniting for a brighter future</h1>
          <p className="primary-text">
            "Change starts with us, let's make a difference in our communities
            and the world by taking action today."
          </p>
          <Link to="/Login" style={{ textDecoration: "none" }}>
            <button className="secondary-button">
              Sign In <FiArrowRight />{" "}
            </button>
          </Link>
        </div>
        <div className="home-image-section">
          <div style={{ margin: "auto", maxWidth: 800, background: "#0000" }}>
            <form style={{ padding: 24, textAlign: "center" }}>
              <Typography
                variant="h4"
                component="h1"
                align="center"
                style={{ fontWeight: "bold", marginBottom: 16 }}
              >
                Registration
              </Typography>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={12} sm={6}>
                  <TextField
                    required="required"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setUserfname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setUserlname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Address"
                    name="Address"
                    label="Address"
                    multiline
                    maxRows={4}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setUseraddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Voter"
                    name="Voter"
                    label="Voter ID"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setUservoterid(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    style={{
                      border: "1px solid gray",
                      padding: "16px",
                      width: "100%",
                      borderRadius: "7px",
                      transition: "border-color 0.3s ease-in-out", // Add transition for smooth effect
                      "&:hover": { borderColor: "blue" },
                    }}
                  >
                    <FormLabel
                      component="legend"
                      style={{ textAlign: "start", fontSize: "13px" }}
                    >
                      Gender
                    </FormLabel>
                    <RadioGroup
                      label="Gender"
                      name="gender"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                      onChange={(e) => setUsergender(e.target.value)}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    style={{ textAlign: "start", fontSize: "13px" }}
                  >
                    <InputLabel
                      id="district-label"
                      shrink={true}
                      sx={{ bgcolor: "white", px: 1, ml: -1 }}
                    >
                      District
                    </InputLabel>
                    <Select
                      required
                      labelId="district-label"
                      id="district"
                      label="District"
                      onChange={(e) => {
                        setDis(e.target.value);
                        setSelectedValue("");
                        setSelectedVal("");
                        setSelVal("");
                      }}
                      sx={{
                        borderRadius: "7px",
                        transition: "border-color 0.3s ease-in-out",

                        "&:focus": {
                          borderColor: "#757575",
                        },
                      }}
                    >
                      {district.map((dis, key) => {
                        return (
                          <MenuItem key={key} value={dis.district_id}>
                            {dis.district_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    style={{ textAlign: "start", fontSize: "13px" }}
                  >
                    <InputLabel
                      id="section-label"
                      shrink={true}
                      sx={{ bgcolor: "white", px: 1, ml: -1 }}
                    >
                      Section
                    </InputLabel>
                    <Select
                      value={selectedValue}
                      required
                      labelId="section-label"
                      id="section"
                      label="Section"
                      onChange={(e) => {
                        ajaxsection(e.target.value);
                        setSelectedValue(e.target.value);
                        setSelectedVal("");
                        setSelVal("");
                      }}
                      sx={{
                        borderRadius: "7px",
                        transition: "border-color 0.3s ease-in-out",

                        "&:focus": {
                          borderColor: "#757575",
                        },
                      }}
                    >
                      {section.map((sec, key) => {
                        return (
                          <MenuItem key={key} value={sec.sectionport_id}>
                            {sec.sectionport_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    style={{ textAlign: "start", fontSize: "13px" }}
                  >
                    <InputLabel
                      id="subsection-label"
                      shrink={true}
                      sx={{ bgcolor: "white", px: 1, ml: -1 }}
                    >
                      Sub Section
                    </InputLabel>
                    <Select
                      value={selectedVal}
                      required
                      labelId="subsection-label"
                      id="subsection"
                      label="Sub section"
                      onChange={(e) => {
                        ajaxward(e.target.value);
                        setSelectedVal(e.target.value);
                        setSelVal("");
                      }}
                      sx={{
                        borderRadius: "7px",
                        transition: "border-color 0.3s ease-in-out",

                        "&:focus": {
                          borderColor: "#757575",
                        },
                      }}
                    >
                      {ssection.map((sec, key) => {
                        return (
                          <MenuItem key={key} value={sec.sectionsubport_id}>
                            {sec.sectionsubport_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    style={{ textAlign: "start", fontSize: "13px" }}
                  >
                    <InputLabel
                      id="ward-label"
                      shrink={true}
                      sx={{ bgcolor: "white", px: 1, ml: -1 }}
                    >
                      Ward
                    </InputLabel>
                    <Select
                      value={selVal}
                      required
                      labelId="ward-label"
                      id="ward"
                      label="Ward"
                      sx={{
                        borderRadius: "7px",
                        transition: "border-color 0.3s ease-in-out",

                        "&:focus": {
                          borderColor: "#757575",
                        },
                      }}
                      onChange={(e) => {
                        setWid(e.target.value);
                        setSelVal(e.target.value);
                      }}
                    >
                      {sward.map((w, key) => {
                        return (
                          <MenuItem key={key} value={w.ward_id}>
                            {w.ward_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    component="fieldset"
                    style={{
                      border: "1px solid gray",
                      padding: "16px",
                      width: "100%",
                      borderRadius: "7px",
                      transition: "border-color 0.3s ease-in-out", // Add transition for smooth effect
                      "&:hover": { borderColor: "blue" },
                    }}
                  >
                    <FormLabel
                      component="legend"
                      style={{ textAlign: "start", fontSize: "13px" }}
                    >
                      Photo
                    </FormLabel>
                    <Button variant="contained" component="label">
                      {selectedFile ? selectedFile.name : "Upload"}
                      <input hidden type="file" onChange={handleFileSelect} />
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    component="fieldset"
                    style={{
                      border: "1px solid gray",
                      padding: "16px",
                      width: "100%",
                      borderRadius: "7px",
                      transition: "border-color 0.3s ease-in-out", // Add transition for smooth effect
                      "&:hover": { borderColor: "blue" },
                    }}
                  >
                    <FormLabel
                      component="legend"
                      style={{ textAlign: "start", fontSize: "13px" }}
                    >
                      Proof
                    </FormLabel>
                    <Button variant="contained" component="label">
                      {userproof ? userproof.name : "Upload"}

                      <input hidden type="file" onChange={handleProofSelect} />
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setUseremail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setUserpassword(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="repassword"
                    name="Repassword"
                    label="Re-Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setRepassword(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "8px" }}
                    onClick={() => { CheckVal(); }}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" color="primary" type="reset">
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Verification</DialogTitle>
        <DialogContent>


          <MuiOtpInput style={{ gap: '8px', width: '400px', padding: '15px' }} length={6} value={otp} onChange={handleChange} /><br></br>

        </DialogContent>
        <DialogContentText style={{ marginLeft: '15px' }}>{Wrong}</DialogContentText>
        <DialogActions style={{ marginRight: '10px', marginBottom: '10px' }}>
          {istime ? null : <Button onClick={() => Resend()}>Resent OTP</Button>}<br></br>

        </DialogActions>
      </Dialog>


    </div>
  );
};

export default Registration;
