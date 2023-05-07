import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider, MenuItem, Popover, Stack, alpha } from "@mui/material";

const Post = ({ post,Campaign,key,id}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [rows, setRows] = useState([]);
  const [like, setLike] = useState([]);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const inputData = () => {
    var dat = {
      user_id: sessionStorage.getItem("uid"),
      campaign_id:Campaign,

    };
    axios.post("http://localhost:4000/Like/", dat).then((response) => {
      console.log(response.data);
      fetchData();
      setLiked(true)
    });
  };
  const deleteData = () => {
    axios.delete("http://localhost:4000/LikeDelete/"+sessionStorage.getItem("uid")+"/"+Campaign).then((response) => {
     console.log(response.data);
     setLiked(false);
      fetchData();
     

    });
  }
  const deletePost = (cmp) => {
    axios.delete("http://localhost:4000/deletePost/"+cmp).then((response) => {
     console.log(response.data);
     handleClose();
      fetchData();
      window.location.reload();
     

    });
  }
  const fetchData = () => {
    axios.get("http://localhost:4000/CommentCount/"+Campaign).then((response) => {
      var data = response.data.CommentCount;

      setRows(data[0]);


    });
    axios.get("http://localhost:4000/CountLike/"+Campaign).then((response) => {
      var data = response.data.CountLike;

      setLike(data[0]);


    });
    axios.get("http://localhost:4000/Like/"+sessionStorage.getItem("uid")+"/"+Campaign).then((response) => {
      var data = response.data.Like;
console.log(data);
      setLiked(data);


    });

    


  };
  

  useEffect(() => {
    fetchData();


  },[]);

  

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.user_photo} alt="" />
            <div className="details">
              <Link
                to={`../Profile/${post.user_id}/`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.user_name}</span>
              </Link>
              
              <span className="date">{post.time[0].time_elapsed}</span>
            </div>
          </div>
        
         
         <>
        
         {post.user_id==sessionStorage.getItem("uid")?<MoreHorizIcon 
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
            
           </MoreHorizIcon>:null} 


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
             <MenuItem  onClick={()=>{deletePost(post.campaign_id)}}>
               Delete
             </MenuItem>

           </Stack>
         </Popover>
       </> 
        </div>
        <div className="content">
          
          <p>{post.campaign_details}</p>
          {post.campaign_file==null?null: <img src={post.campaign_file} alt="" />}
         
        </div>
        <div className="info">
          <div className="item" onClick={()=>{liked ? deleteData() : inputData()}}>
            {liked ? <FavoriteOutlinedIcon color="error" />:<FavoriteBorderOutlinedIcon  />}
            {like.numLike}&nbsp;Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {rows.numComment}&nbsp;Comments
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && <Comments campaign={post.campaign_id} usid={post.user_id}/>}
      </div>
    </div>
  );
};

export default Post;
