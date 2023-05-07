import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Grid, TextField, DialogActions, Button, DialogContent, Dialog, DialogTitle } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { Link } from 'react-router-dom';
import axios from 'axios';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [rows, setRows] = useState([]);
  const [Pro, setPro] = useState(false);
  const [passPro, setPassPro] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [curpass, setCurpass] = useState("");

  const handleClickOpen = () => {
    setPro(true);
    handleClose();

  };

  const handleClickClose = () => {
    setPro(false);
  };
  const handleClickpassOpen = () => {
    setPassPro(true);
    handleClose();
  };

  const handleClickpassClose = () => {
    setPassPro(false);
  };
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const fetchData = () => {
    axios.get("http://localhost:4000/Electionagentprofile/" + sessionStorage.getItem("eid")).then((response) => {
      var data = response.data.Electionagentprofile;
      setRows(data[0]);


    });

  };
  const inputData = () => {
    var dat = {
      electionagent_name: name,
      electionagent_email: email,
      electionagent_address: address,

    };
    axios.post("http://localhost:4000/ElectionAgentEdit/" + sessionStorage.getItem("eid"), dat).then((response) => {
      console.log(response.data);
      fetchData();
      handleClickClose();
    });
  };
  const inputpass = () => {
    var dat = {
      electionagent_password: password,

    };
    if (curpass === rows.electionagent_password) {
      if (password === repass) {
        axios.post("http://localhost:4000/ElectionAgentPass/" + sessionStorage.getItem("eid"), dat).then((response) => {
          console.log(response.data);
          fetchData();
          handleClickpassClose();
        });

      } else {
        alert("Passwords Are Not same");
        handleClickpassOpen();
      }
    }
    else {
      alert("Invalied Current Password");
      handleClickpassOpen();

    }

  };
  useEffect(() => {
    fetchData();

  }, []);
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {rows.electionagent_name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {rows.electionagent_email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>

          <MenuItem onClick={() => {
                  handleClickOpen()
                  setName(rows.electionagent_name)
                  setEmail(rows.electionagent_email)
                  setAddress(rows.electionagent_address)

                }}>
            Edit Profile
          </MenuItem>

          <MenuItem onClick={() => { handleClickpassOpen() }}>
                  Change password
                </MenuItem>

        
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Link to="/Login/" style={{ textDecoration: "none" }}>
          <MenuItem sx={{ m: 1 }}>
            Logout
          </MenuItem>
        </Link>
      </Popover>
      <Dialog
          open={Pro}
          keepMounted
          onClose={handleClickClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Edit Profile"}</DialogTitle>
          <DialogContent>
            {/* Edit Profile form */}
            <form>
              <Grid container spacing={2} style={{ marginTop: '3rem', width: '300px' }} alignItems="center" justifyContent="center">
                <Grid item>
                  <TextField label="Name" style={{ width: '280px' }} shrink={true} value={name} onChange={(e) => { setName(e.target.value) }} />
                </Grid>
                <Grid item >
                  <TextField label="Email" style={{ width: '280px' }} shrink={true} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </Grid>
                <Grid item>
                  <TextField label="Address" style={{ width: '280px' }} shrink={true} value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </Grid>

              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { inputData() }}>Agree</Button>
            <Button onClick={handleClickClose}>Disagree</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={passPro}
          keepMounted
          onClose={handleClickpassClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Edit Password"}</DialogTitle>
          <DialogContent>
            {/* Edit Profile form */}
            <form>
              <Grid container spacing={2} style={{ marginTop: '3rem', width: '300px' }} alignItems="center" justifyContent="center">

                <Grid item>
                  <TextField label="Cur-Password" style={{ width: '280px' }} shrink={true} type="password" onChange={(e) => { setCurpass(e.target.value) }} />
                </Grid>
                <Grid item>
                  <TextField label="Password" style={{ width: '280px' }} shrink={true} type="password" onChange={(e) => { setPassword(e.target.value) }} />
                </Grid>
                <Grid item>
                  <TextField label="Re-Password" style={{ width: '280px' }} shrink={true} type="password" onChange={(e) => { setRepass(e.target.value) }} />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { inputpass() }}>Agree</Button>
            <Button onClick={handleClickpassClose}>Disagree</Button>
          </DialogActions>
        </Dialog>
    </>
    
  );
}
