import React, { useEffect, useState } from 'react'
import { Avatar, Box } from '@mui/material'

import Button from '@mui/material/Button';
import { Paper, Card, CardContent, CardMedia, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';




const Voter = () => {

  const [open, setOpen] = React.useState(false);
  const [cid, setCid] = React.useState(false);
  const [photo, setPhoto] = React.useState(false);
  const [name, setName] = React.useState(false);

  const [rows, setRows] = useState([]);
const navigate =  useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputData = (e) => {
    setOpen(false);
    var dat = {
      user_id: sessionStorage.getItem("uid"),
      candidate_id: cid,

    };
    axios.post("http://localhost:4000/Polling/", dat).then((response) => {
      console.log(response.data);
      alert("Vote Polled");
      navigate("/User");
      
      fetchData();
    });
  };




  const fetchData = () => {
        axios.get("http://localhost:4000/CandidateSel/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.CandidateSel;

      setRows(data);

     

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

          <Link style={{ textDecoration: 'none' }} onClick={() => {
            handleClickOpen();
            setCid(e.candidate_id)
            setPhoto(e.user_photo)
            setName(e.user_name)
          }}>

            <Card style={{ display: 'flex', maxWidth: '100%',marginBottom:'70px' }}>
              <CardMedia style={{height:'250px',padding:'30px',marginTop:'10px'}}>
              <Avatar
              //  component="img"
               src={e.user_photo}
               style={{
                marginLeft:'30px',
                 width: '150px', // set the width to 40%
                 height: '150px', // set the height to 200px
                 objectFit: 'contain',
                
                
         
               }}
              ></Avatar>
               
              </CardMedia>
              <CardContent style={{ flex: 1, paddingLeft: '25%',marginTop:'30px' }}>
                <Typography gutterBottom variant="h5" component="h2" >{e.user_name}</Typography>
                <Typography variant="body2" color="textSecondary" component="p" sx={{ textDecoration: 'none' }}>{e.user_address}</Typography>
                <Typography gutterBottom variant="h7" component="h5" sx={{ paddingTop: '10px',marginTop:'70px' }}>Click any were to vote</Typography>

              </CardContent>

            </Card>
          </Link>
        ))}
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>

            <Typography gutterBottom variant="h5" component="h2" sx={{ paddingTop: '10px' }}>Confirm Your Vote!</Typography>

          </DialogTitle>
          <DialogContent>
            <img src={photo} height="400px" width="400px" style={{ padding: '10px' }} alt='voter pic' />           
             <Typography gutterBottom variant="h5" component="h3" sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }} >{name}</Typography>
          </DialogContent>
          <DialogActions style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-evenly' }}>
            <Button onClick={()=>inputData()}>Agree</Button>
            <Button onClick={handleClose}>Disagree</Button>
          </DialogActions>
        </Dialog>


      </Paper>

    </Box>

  )

}

export default Voter

