import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";

const LeftBar = () => {
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
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <Avatar
              alt="Remy Sharp"
              src={rows.user_photo}
            
              // onClick={() => {
              //   setPhoto(e.user_photo)
              //   handleClickOpen();
              // }}
            />
            <span>{rows.user_name}</span>
          </div>
          <hr />
          <div className="item">
            <img src={Friends} alt="" />
            <Link to="/User" style={{ textDecoration: 'none' }}>
              <span>Dashborad</span>
            </Link>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <Link to="VoteButton" style={{ textDecoration: 'none' }}>
              <span>Vote</span>
            </Link>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <Link to="Complaint" style={{ textDecoration: 'none' }}>

            <span>Complaint</span>
            </Link>

          </div>
         
          
        </div>
        <hr />
        {/* <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LeftBar;
