import "./profile.scss";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Popover, Stack, TextField, alpha } from "@mui/material";
import Post from "../../components/post/Post";
const Profile = () => {
  const { id } = useParams();
  const [Pro, setPro] = useState(false);
  const [passPro, setPassPro] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [curpass, setCurpass] = useState("");

  const [rows, setRows] = useState([]);
  const [r, setR] = useState([]);
  const [ro, setRo] = useState([]);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    console.log(ro);
    console.log(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClickOpen = () => {
    setPro(true);
    setOpen(null);

  };

  const handleClickClose = () => {
    setPro(false);
  };
  const handleClickpassOpen = () => {
    setPassPro(true);
    setOpen(null);

  };

  const handleClickpassClose = () => {
    setPassPro(false);
  };
  const fetchData = () => {
    axios.get("http://localhost:4000/UserProfile/" + id).then((response) => {
      var data = response.data.UserProfile;
      setRows(data[0]);


    });
    axios.get("http://localhost:4000/CampaignCan/" + id).then((response) => {
      var data = response.data.CampaignCan;
      setR(data);
      setRo(data[0].user_id);
      console.log(data);
      console.log(data[0].user_id);
      console.log(id);

    });


  };
  const inputData = () => {
    var dat = {
      user_name: name,
      user_email: email,
      user_address: address,

    };
    axios.post("http://localhost:4000/UserEdit/" + sessionStorage.getItem("uid"), dat).then((response) => {
      console.log(response.data);
      fetchData();
      handleClickClose();
    });
  };
  const inputpass = () => {
    var dat = {
      user_password: password,

    };
    if (curpass === rows.user_password) {
      if (password === repass) {
        axios.post("http://localhost:4000/UserPass/" + sessionStorage.getItem("uid"), dat).then((response) => {
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
    <div className="profile">
      <div className="images">
        {/* <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI1FUfkHVudHDsautSa_h4Mj-eiz-QCPYnMg&usqp=CAU"
          alt=""
          className="cover"
        /> */}
        <img
          src={rows.user_photo}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">

          <div className="center">
            <span>{rows.user_name}</span>
            <div className="info">
              <div className="item">
                Email  :&nbsp;&nbsp;{rows.user_email}
              </div>
            </div>
            <div className="info">

              <div className="item">
                Address :&nbsp;&nbsp;{rows.user_address}
              </div>
            </div>
          </div>

          {/* <EmailOutlinedIcon /> */}

          <>
            {id === sessionStorage.getItem("uid") &&
              <MoreVertIcon
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
                {/* <Avatar src={rows.electionagent_photo} alt="photoURL" /> */}
              </MoreVertIcon>}


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
              <Divider sx={{ borderStyle: 'dashed' }} />

              <Stack sx={{ p: 1 }}>
                <MenuItem onClick={() => {
                  handleClickOpen()
                  setName(rows.user_name)
                  setEmail(rows.user_email)
                  setAddress(rows.user_address)

                }}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => { handleClickpassOpen() }}>
                  Change password
                </MenuItem>

              </Stack>
            </Popover>
          </>
        </div>
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
      </div>
        <div className="posts">
          {r.map(post => (
            
            <Post post={post} Campaign={post.campaign_id} key={post.id} />
           
          ))}
        </div>

    </div>

  );
};

export default Profile;
