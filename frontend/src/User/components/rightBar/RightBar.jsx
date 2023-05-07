import axios from "axios";
import "./rightBar.scss";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";



const RightBar = () => {
  const [rows, setRows] = useState([]);
  const [row, setRow] = useState([]);


  const fetchData = () => {
    axios.get("http://localhost:4000/ElectionSelect/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.ElectionSelect;
      setRows(data);

    });
    axios.get("http://localhost:4000/CandidateSel/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.CandidateSel;
      setRow(data);
    });



  };
  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Candidates</span>
          {row.map((e) => (
            
            <div className="user">
              <div className="userInfo">
                <Avatar
                  alt="Remy Sharp"
                  src={e.user_photo}

                  onClick={() => {
                    // setPhoto(e.user_photo)
                    // handleClickOpen();
                  }}
                />
                <span>{e.user_name}</span>
              </div>
              {/* <div className="buttons">
                <button>follow</button>
              </div> */}
            </div>
          ))}
        </div>
        <div className="item">
          <span>News</span>

          {rows.map((e) => (
            <Link to="/User/ViewElection" style={{ textDecoration: 'none' }}>
              <div className="user">
                <div className="userInfo">

                  <Avatar
                    alt="Remy Sharp"
                    src="https://img.freepik.com/free-vector/hand-with-voting-sign-election_1017-18637.jpg?w=2000"

                    onClick={() => {
                      // setPhoto(e.user_photo)
                      // handleClickOpen();
                    }}
                  />
                  <p>
                    <span>{e.election_details}</span><br></br>
                    has declared on<br></br>
                    <span>{e.election_fordate}</span><br></br>

                  </p>
                </div>
                {/* <span>{""}</span> */}

              </div>
            </Link>
          ))}

        </div>
       
      </div>
    </div>
  );
};

export default RightBar;
