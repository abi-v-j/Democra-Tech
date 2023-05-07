import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import axios from "axios";
import { Table, Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const AssignAgent = () => {
  const { id, eid } = useParams();
  const [rows, setRows] = useState([]);
  const [wid, setsWid] = useState("");
  const [dis, setDis] = useState("");
  const [ssection, setsSection] = useState([]);
  const [district, setDistrict] = useState([]);
  const [section, setSection] = useState([]);
  const [ward, setWard] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedVal, setSelectedVal] = useState("");
  const inputData = (e) => {
    var dat = {
      election_id: eid,
      ward_id: wid,
      electionagent_id: id,
    };
    axios.post("http://localhost:4000/Assignagent/", dat).then((response) => {
      console.log(response.data);
      alert(response.data.message);

      fetchData();
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
  const ajaxward = (ssec) => {
    axios
      .get(`http://localhost:4000/Condition_ward/${ssec}`)
      .then((response) => {
        var data = response.data.Condition_ward;

        console.log(data);
        setWard(data);
      });
  };
  const fetchData = () => {
    console.log(id);
    axios.get(`http://localhost:4000/Assignselect/${id}`).then((response) => {
      var data = response.data.Assignselect;

      console.log(data);
      setRows(data);
    });
    axios.get("http://localhost:4000/District").then((response) => {
      var data = response.data.district;
      setDistrict(data);
    });
    axios.get("http://localhost:4000/Sectionport").then((response) => {
      var data = response.data.Sectionport;
      setSection(data);
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
        <div >
          <Paper style={{ display: "flex", justifyContent: 'center', height: '500px', alignItems: 'center' }}>
            <Card style={{ width: '30%', padding: '20px', margin: 'left' }}>
              {rows.map((e) => (
                <CardContent style={{ textAlign: 'center', paddingBottom: '10px' }}>
                  <CardMedia
                    component="img"
                    image={e.electionagent_photo}
                    alt={e.electionagent_name}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', margin: 'auto' }}
                  />
                  <Typography variant="h4" component="h2" style={{ marginTop: '10px' }}>
                    {e.electionagent_name}
                  </Typography>
                  <Typography gutterBottom variant="h6" color="textSecondary">
                    {e.electionagent_place}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                      Email:
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                      {e.electionagent_email}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                      Aadhaar ID:
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                      {e.electionagent_adharcardno}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                      Voter ID:
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                      {e.electionagent_voteridno}
                    </Typography>
                  </div>
                </CardContent>
              ))}
            </Card>
            <Card style={{ width: '30%', padding: '20px', marginLeft: '20px' }}>

              <Typography variant="h4" component="h2" style={{ marginTop: '10px' }}>
                Assign Location
              </Typography>
              <CardContent style={{ textAlign: 'center', paddingBottom: '20px' }}>

                <Box sx={{ marginBottom: '10px' }}>
                  <FormControl variant="standard" sx={{ minWidth: '150px' }}>
                    <InputLabel id="district-label">District</InputLabel>
                    <Select
                      labelId="district-label"
                      id="district-select"
                      defaultValue=""
                      label="District"
                      onChange={(e) => {
                        setDis(e.target.value);
                        setSelectedValue("");
                        setSelectedVal("");
                        setsWid("");
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
                </Box>
                <Box sx={{ marginBottom: '10px' }}>
                  <FormControl variant="standard" sx={{ minWidth: '150px' }}>
                    <InputLabel id="sectionport-label">Sectionport</InputLabel>
                    <Select
                      value={selectedValue}
                      labelId="sectionport-label"
                      id="sectionport-select"
                      defaultValue=""
                      label="Sectionport"
                      onChange={(e) => {
                        ajaxsection(e.target.value);
                        setSelectedValue(e.target.value);
                        setSelectedVal("");
                        setsWid("");
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
                </Box>
                <Box sx={{ marginBottom: '10px' }}>
                  <FormControl variant="standard" sx={{ minWidth: '150px' }}>
                    <InputLabel id="sectionsubport-label">Sectionsubport</InputLabel>
                    <Select
                      value={selectedVal}
                      labelId="sectionsubport-label"
                      id="sectionsubport-select"
                      defaultValue=""
                      label="Sectionsubport"
                      onChange={(e) => {
                        ajaxward(e.target.value);
                        setSelectedVal(e.target.value);
                        setsWid("");
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
                </Box>
                <Box sx={{ marginBottom: '10px' }}>
                  <FormControl variant="standard" sx={{ minWidth: '150px' }}>
                    <InputLabel id="ward-label">Ward</InputLabel>
                    <Select
                      value={wid}
                      labelId="ward-label"
                      id="ward-select"
                      defaultValue=""
                      label="Ward"
                      onChange={(e) => {
                        setsWid(e.target.value);
                      }}
                    >
                      {ward.map((sec, key) => {
                        return (
                          <MenuItem key={key} value={sec.ward_id}>
                            {sec.ward_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    style={{
                      color: 'white',
                      backgroundColor: 'lightblue',
                      marginTop: '20px',
                      '&:hover': {
                        backgroundColor: 'darkblue', // Change background color on hover
                      },
                      '&:active': {
                        backgroundColor: 'blue', // Change background color on active
                      },
                    }}
                    onClick={() => inputData()}
                  >
                    Submit
                  </Button>

                </Box>
              </CardContent>
            </Card>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AssignAgent;
