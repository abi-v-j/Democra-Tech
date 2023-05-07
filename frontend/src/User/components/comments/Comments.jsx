import { useEffect, useState } from "react";
import "./comments.scss";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


const Comments = ({campaign,usid}) => {
  const [rows, setRows] = useState([]);
  const [profile, setProfile] = useState([]);
  const [comment, setComment] = useState("")

  const inputData = () => {
    var dat = {
      user_id: sessionStorage.getItem("uid"),
      campaign_id:campaign,
      comment_content:comment,

    };
    axios.post("http://localhost:4000/Comment/", dat).then((response) => {
      console.log(response.data);
      setComment([])
      fetchData();
    });
  };
  const deleteData = (cmid) => {
    axios.delete("http://localhost:4000/CommentDelete/"+cmid).then((response) => {
     console.log(response.data);
      fetchData();
     

    });
  }
  const fetchData = () => {
    axios.get("http://localhost:4000/Comment/"+campaign).then((response) => {
      var data = response.data.Comment;

      setRows(data);

    });
    axios.get("http://localhost:4000/UserProfile/" + sessionStorage.getItem("uid")).then((response) => {
      var d = response.data.UserProfile;

      setProfile(d[0]);


    });




  };
  useEffect(() => {
    fetchData();

  },[]);


  return (
    <div className="comments">
      {rows.map((comment) => (
        <div className="comment">
          <img src={comment.user_photo} alt="" />
          <div className="info">
            <span>{comment.user_name}</span>
            <p>{comment.comment_content}</p>
          </div>
          {
           ( profile.user_id==comment.user_id||sessionStorage.getItem("uid")==usid ) ? (<IconButton aria-label="delete" onClick={()=>{deleteData(comment.comment_id)}}>
            <DeleteIcon />
          </IconButton>) : null
           
          }
         
         
          <span className="date">{comment.time[0].time_elapsed}</span>
        </div>
      ))}
       <div className="write">
        <img src={profile.user_photo} alt="" />
        <input type="text" value={comment} placeholder="write a comment" onChange={(e)=>setComment(e.target.value)}/>
        <button onClick={()=>{inputData()}}>Send</button>
      </div>
    </div>
  );
};

export default Comments;
