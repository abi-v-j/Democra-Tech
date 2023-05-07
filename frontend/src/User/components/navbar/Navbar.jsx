import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Stack, Typography, alpha } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";


const Navbar = () => {
  const [open, setOpen] = useState(null);
  const [rows, setRows] = useState([]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  
  const fetchData = () => {
    axios.get("http://localhost:4000/UserProfile/"+sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.UserProfile;
      setRows(data[0]);


    });

  };
  useEffect(() => {
    fetchData();

  },[]);
  return (
    <div className="navbar">
      <div className="left">
          <span>DemocraTech</span>
     
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
       
        <div className="user">
        <>
        <Avatar
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
      </Avatar>

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
            {rows.user_name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {rows.user_email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
        <Link to={`./Profile/${sessionStorage.getItem("uid")}/`} style={{textDecoration:'none'}}>
            <MenuItem  onClick={handleClose}>
             Profile
            </MenuItem>
            </Link>
            <MenuItem  onClick={handleClose}>
             
             </MenuItem>
             <MenuItem onClick={handleClose}>
             
             </MenuItem>
        
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Link to="/Login/" style={{ textDecoration: "none" }}>
        <MenuItem sx={{ m: 1 }}>
          Logout
        </MenuItem>
        </Link>
      </Popover>
    </>
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
