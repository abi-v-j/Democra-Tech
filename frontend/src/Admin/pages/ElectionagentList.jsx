import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import {Link } from "react-router-dom";
export default class ElectionagentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electionagent: "",
      electionagentData: [],
      eid:window.location.href.split('/')[5],
      columns: [
        {
          field: "electionagent_id",
          headerName: "ID",
          width: 200,
        },
        {
          field: "electionagent_name",
          headerName: "Name",
          width: 200,
        },
          {
          field: "electionagent_place",
          headerName: "Place",
          width: 200,
        },
        {
          field: "electionagent_adharcardno",
          headerName: "Adhaar No",
          width: 200,
        },
        {
          field: "action",
          headerName: "Action",
          width: 210,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/Admin/AssignAgent/${this.state.eid}/${params.row.electionagent_id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="small" endIcon={<SendIcon />}>
                    Assign
                  </Button>
                </Link>
              </>
            );
          },
        },
      ],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/Electionagentselect")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState({ electionagentData: data.Electionagentselect });
      });  
  }
  cancelCourse = () => {
    document.getElementById("electionagentForm").reset();
  };
  render() { 
    return (
      <div className="Ahome">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="div">
            <h1 className="divTitle" style={{padding:'20px'}}>Agent</h1>
           
            <div className="divList">
              <DataGrid
                getRowId={(row) => row.electionagent_id}
                rows={this.state.electionagentData}
                columns={this.state.columns}
                pageSize={30}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
