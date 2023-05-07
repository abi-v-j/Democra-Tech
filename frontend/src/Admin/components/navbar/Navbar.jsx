import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Divider, MenuItem, Popover, Stack, Typography, alpha } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";




const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [open, setOpen] = useState(null);
  const [rows, setRows] = useState([]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  
  const fetchData = () => {
    axios.get("http://localhost:4000/Adminprofile/"+sessionStorage.getItem("aid")).then((response) => {
      var data = response.data.Adminprofile;
      setRows(data[0]);
console.log(data);

    });

  };
  useEffect(() => {
    fetchData();

  },[]);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
          <>
            <Avatar className="icon"
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
            />


         
     
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
          {rows.admin_name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
           {rows.admin_email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
         <Link to="" style={{textDecoration:'none'}}>
                     <MenuItem >
             Profile
            </MenuItem>
            </Link>
            <MenuItem  onClick={handleClose}>
              hai
              </MenuItem>
              <MenuItem  onClick={handleClose}>
              iuuu
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
    </div>
  );
};

export default Navbar;
