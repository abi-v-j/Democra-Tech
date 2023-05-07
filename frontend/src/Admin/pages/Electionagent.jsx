import React, { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Grid, Paper } from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
const Sectionsubport = () => {
  const paperStyle = {
    padding: 20,
    height: "70hv",
    width: 280,
    margin: "20px auto",
  };

  const [agentname, setElectionagentname] = useState("");
  const [agentaddress, setElectionagentaddress] = useState("");
  const [agentplace, setElectionagentplace] = useState("");
  const [agentemail, setElectionagentemail] = useState("");
  const [agentpassword, setElectionagentpassword] = useState("");
  const [agentvoterid, setElectionagentvoterid] = useState("");
  const [agentemployement, setElectionagentemployementid] = useState("");
  const [agentadharid, setElectionagentadharid] = useState("");
  const [agentphoto, setElectionagentphoto] = useState(null);
  const [agentgender, setElectionagentgender] = useState("");
  const [dis, setDis] = useState("");

  const [district, setDistrict] = useState([]);
  const handleProofSelect = (event) => {
    const file = event.target.files[0];
    setElectionagentphoto(file);
  };
  const inputData = (e) => {
    const frm = new FormData();
    frm.append("electionagent_name", agentname);
    frm.append("electionagent_address", agentaddress);
    frm.append("electionagent_place", agentplace);
    frm.append("electionagent_email", agentemail);
    frm.append("electionagent_password", agentpassword);
    frm.append("electionagent_voteridno", agentvoterid);
    frm.append("electionagent_employementidno", agentemployement);
    frm.append("electionagent_adharcardno", agentadharid);
    frm.append("electionagent_photo", agentphoto);
    frm.append("electionagent_gender", agentgender);
    frm.append("district_id", dis);

    axios.post("http://localhost:4000/Electionagent/", frm).then((response) => {
      console.log(response.data);
      alert(response.data.electionagent);

      fetchData();
    });
  };

  const fetchData = () => {
    axios.get("http://localhost:4000/District").then((response) => {
      var data = response.data.district;
      setDistrict(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Ahome">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <Grid
          container
          justifyContent="center"
          style={{ width: "70%", marginTop: "70px" }}
        >
          <Paper
            elevation={10}
            style={{
              padding: "40px",
              maxWidth: "600px",
              width: "50%",
              marginTop: "40px",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Election Agent
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop="30px"
            >
              <Stack spacing={2} sx={{ width: "80%" }}>
                <TextField
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  style={{ color: "black" }}
                  onChange={(e) => setElectionagentname(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Address"
                  variant="standard"
                  style={{ color: "black" }}
                  onChange={(e) => setElectionagentaddress(e.target.value)}
                />

                <TextField
                  id="standard-basic"
                  label="Place"
                  variant="standard"
                  style={{ color: "black" }}
                  onChange={(e) => setElectionagentplace(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  type="email"
                  style={{ color: "black" }}
                  onChange={(e) => setElectionagentemail(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  type="password"
                  style={{ color: "black" }}
                  onChange={(e) => setElectionagentpassword(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Voter ID"
                  variant="standard"
                  style={{ color: "black" }}
                  onChange={(e) => setElectionagentvoterid(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Employement ID"
                  variant="standard"
                  style={{ color: "black" }}
                  onChange={(e) =>
                    setElectionagentemployementid(e.target.value)
                  }
                />
                <TextField
                  id="standard-basic"
                  label="Adhar ID"
                  variant="standard"
                  style={{ color: "black" }}
                  onChange={(e) => setElectionagentadharid(e.target.value)}
                />

                <Button variant="contained" component="label">
                  {agentphoto ? agentphoto.name : "Upload Photo"}

                  <input hidden type="file" onChange={handleProofSelect} />
                </Button>

                <form>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setElectionagentgender(e.target.value)}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </form>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    District
                  </InputLabel>
                  <Select
                    defaultValue=""
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Age"
                    onChange={(e) => {
                      setDis(e.target.value);
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

                <Button
                  variant="contained"
                  style={{ color: "black", backgroundColor: "lightblue" }}
                  onClick={() => inputData()}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default Sectionsubport;
