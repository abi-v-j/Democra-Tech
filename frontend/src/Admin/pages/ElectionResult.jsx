import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import { useTheme } from '@emotion/react';
import { Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ElectionResult() {
  const theme = useTheme();
 const pollupdate=()=>{
  axios.post(`http://localhost:4000/pollupdate/`).then((response) => {
      console.log(response.data);
      alert(response.data.message);


  });

 };
  return (

    <div className="Ahome">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <div className='Container'>
        <Paper className='resultbutton'>
               <Button variant="contained" size="large" onClick={()=>{pollupdate()}}>
                Result
            </Button>
          
        </Paper>
        </div>
    </div>
  </div>
   
  )
}
