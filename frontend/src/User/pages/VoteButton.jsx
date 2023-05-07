import { Button, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./votebutton.scss"
import axios from 'axios';
import { Link } from 'react-router-dom';

export const VoteButton = () => {
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState([]);
  const [r, setR] = useState([]);
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
  const currentDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
  const currentTime =  12;
  //new Date().getHours();


  const fetchData = () => {
    axios.get("http://localhost:4000/UserProfile/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.UserProfile;
      setRows(data[0]);


    });

    axios.get("http://localhost:4000/CheckVote/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.CheckVote;

      setRow(data);



    });
    axios.get("http://localhost:4000/CheckElection/").then((response) => {
      var data = response.data.CheckElection;

      setR(data[0]);
      console.log(currentDate);
      console.log(data[0].election_fordate);


    });
  };
  useEffect(() => {
    fetchData();

  }, []);
  return (
    <div className='Container'>
      <Paper className='votebutton'>
        {rows.user_status == 2 && row == false && r.election_fordate == currentDate && (currentTime > 10 && currentTime < 16)
          ? <Link to="../Vote" style={{ textDecoration: 'none' }}> <Button variant="contained" size="large">
            Vote
          </Button></Link> : <h1>Not  Working</h1>}

      </Paper>
    </div>
  )
}
