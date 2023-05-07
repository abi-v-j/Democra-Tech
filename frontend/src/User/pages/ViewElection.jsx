import React, { useEffect, useState } from 'react'
import { Avatar, Box, Grid, Tooltip } from '@mui/material'
import { Paper, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ViewElection = () => {
  const navigate = new useNavigate();
  const [rows, setRows] = useState([]);
  const inputData = (wid, eid) => {


    var dat = {
      user_id: sessionStorage.getItem("uid"),
      election_id: eid,
      ward_id: wid,


    };
    axios.post("http://localhost:4000/Candidate/", dat).then((response) => {
      var data = response.data.message;
      if (data === "You already a Candidate") {
        alert(data);
      }
      else {
        navigate("/Payment");
      }


    });



  };

  const fetchData = () => {
    axios.get("http://localhost:4000/WardSelect/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.WardSelect;

      setRows(data);

      console.log(data);

    });
  };
  useEffect(() => {
    fetchData();

  }, []);
  return (
    <Box display="flex" flexDirection="row" marginLeft="20px" my={1} mx={2}>

      <Paper elevation={3} style={{ padding: '15px', maxWidth: '800', width: '100%', textAlign: 'left' }}>

        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Election </Typography>
        {rows.map((e) => (
          <Card elevation={3} style={{ padding: '10px', marginTop: '15px' }}>
            <CardContent>
              <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="subtitle2" component="p" align="right">
                    {e.election_date}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h5" component="h2">
                    {e.sectionsubport_name}&nbsp;
                    {e.election_details}
                  </Typography>
                  <Typography variant="h5" component="h2" style={{ marginRight: '20px' }}>
                    <Tooltip title="Ward" arrow>
                      <Avatar
                        style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }}
                      >
                        {e.ward_name}
                      </Avatar>
                    </Tooltip>
                  </Typography>

                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" component="p">
                    Election date : {e.election_fordate}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" component="h3">
                    Candidate
                  </Typography>
                </Grid>
                {e.candidate.map((e) => (
                  <Grid item xs={12} style={{ display: 'flex' }} key={e.id}>
                    <Avatar alt="Remy Sharp" src={e.user_photo} style={{ marginRight: '10px' }} />
                    <Typography variant="h6" component="h3">
                      {e.user_name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Link onClick={() => { inputData(e.ward_id, e.election_id) }}>
                <Typography variant="body2" component="p" align='right'>
                  click here to nominate for Candidate!
                </Typography>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </Box>
  )
}
export default ViewElection

