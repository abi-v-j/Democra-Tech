import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Post from '../posts/Posts';


const Share = ({cid,onPostShare}) => {
  const[photo,setPhoto] = useState([]);
  const[details,setDetails] = useState([]);
  const inputData = () => {


    const frm = new FormData();
    frm.append("camp_file", photo);
    frm.append("campaign_details", details);
    frm.append("candidate_id",cid );

    axios.post("http://localhost:4000/Campaign/", frm).then((response) => {
      var data = response.data.message;

      onPostShare();
      setDetails([]);
    });



  };

  const [rows, setRows] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:4000/UserProfile/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.UserProfile;
  
      setRows(data[0]);
      

    });
  };
  useEffect(() => {
    fetchData();

  }, []);
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={rows.user_photo}
            alt=""
          />
          <input type="text" value={details} placeholder={`What's on your mind ?`} onChange={(e)=>{setDetails(e.target.value)}} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" onChange={(e)=>{setPhoto(e.target.files[0]) }} />
              <PhotoCamera />&nbsp;
              <div className="item">
                <span>Add Image</span>
              </div>
            </IconButton>
          </div>
          <div className="right">
            <button  onClick={() => inputData()}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
