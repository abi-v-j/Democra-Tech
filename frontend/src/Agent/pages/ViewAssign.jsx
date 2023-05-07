import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import Button from '@mui/material/Button';
import {  Paper } from '@mui/material';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';



const ViewAssign = () => {
  


  const [rows, setRows] = useState([]);








  const fetchData = () => {
    axios.get("http://localhost:4000/SelectAssign/"+sessionStorage.getItem("eid")).then((response) => {
      var data = response.data.SelectAssign;

      setRows(data[0]);
      console.log(data);

    });




  };
  useEffect(() => {
    fetchData();

  }, []);


  return (

    <Box display="flex" flexDirection="column" alignItems="center" >
      <Paper elevation={3} style={{ padding: '30px', maxWidth: '800', width: '100%', marginright: '20px', textAlign: 'left', alignItems: "center" }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Election Information</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" paddingLeft='200px'>
          <Box width="45%" my={1}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Election For Date</Typography>
          </Box>
          <Box width="45%" my={1}>
            <Typography variant="h6">{rows.election_fordate}</Typography>
          </Box>
          <Box width="45%" my={1}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Election Details</Typography>
          </Box>
          <Box width="45%" my={1}>
            <Typography variant="h6">{rows.election_details}</Typography>
          </Box>
          <Box width="45%" my={1}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Ward number</Typography>
          </Box>
          <Box width="45%" my={1}>
            <Typography variant="h6">{rows.ward_name}</Typography>
          </Box>
          <Box width="45%" my={1}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Declared Date</Typography>
          </Box>
          <Box width="45%" my={1}>
            <Typography variant="h6">{rows.election_date}</Typography>
          </Box>
          <Box width="45%" my={1}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Assign Date</Typography>
          </Box>
          <Box width="45%" my={1}>
            <Typography variant="h6">{rows.assignagent_date}</Typography>
          </Box>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-evenly">
          <Button
            variant="contained"
            color="primary"
            style={{ '&:hover': { backgroundColor: '#005cbf' }, '&:active': { backgroundColor: '#004499' } }}
            component={Link}
            to={`/Agent/ViewVoters/${rows.ward_id}`}
          
          >
           
            View Voters
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ '&:hover': { backgroundColor: '#005cbf' }, '&:active': { backgroundColor: '#004499' } }}
            component={Link}
            to={`/Agent/VoteVerification/${rows.ward_id}/${rows.election_id}`}
          
          >
           
            Verification
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ '&:hover': { backgroundColor: '#005cbf' }, '&:active': { backgroundColor: '#004499' } }}
            component={Link}
            to={`/Agent/ViewCandidate/`}
          
          >
           
            View Candidate
          </Button>
        </Box>
      </Paper>
    </Box>

  )

}

export default ViewAssign

