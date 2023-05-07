import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
export default class Election extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election: "",
      electionData: [],
      columns: [
        {
          field: "election_id",
          headerName: "ID",
          width: 130,
        },
        {
          field: "election_details",
          headerName: "Election",
          width: 230,
        },
        {
          field: "election_date",
          headerName: "Current Date",
          width: 160,
        },
        {
          field: "election_fordate",
          headerName: "Assign Date",
          width: 160,
        },
        {
          field: "action",
          headerName: "Action",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <DeleteOutline
                  className="divListDelete"
                  onClick={() => this.electionDelete(params.row.election_id)}
                />
              </>
            );
          },
        },
        {
          field: "list",
          headerName: "List",
          width: 150,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/Admin/ElectionagentList/${params.row.election_id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="small" endIcon={<SendIcon />}>
                    Assign
                  </Button>
                </Link>
              </>
            );
          }
        },
      ],
    };
  }


  electionDelete = (id) => {
    axios.delete(`http://localhost:4000/Election/${id}`).then((response) => {
      this.componentDidMount();
    });
  };


  inputSet = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  saveData = (e) => {
    e.preventDefault();

    var dat = {
      election_details: this.state.election,
      election_fordate: this.state.date,
    };

    axios.post("http://localhost:4000/election", dat).then((response) => {
      this.cancelCourse();
      this.componentDidMount();
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/election")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState({ electionData: data.election });

      });
  }

  cancelCourse = () => {
    document.getElementById("electionForm").reset();
  };

  render() {
    return (
      <div className="Ahome">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="div">
            <h1 className="divTitle">Election Declaration</h1>
            <form className="divForm" id="electionForm">
              <div className="divItem">
               
                <input
                  type="text"
                  onChange={this.inputSet}
                  placeholder="Election"
                  name="election"
                />
              
            
                <input
                  type="date"
                  onChange={this.inputSet}
                  placeholder="Date"
                  name="date"
                  style={{marginTop:'10px'}}
                />
              </div>
              <button onClick={this.saveData} className="divButton">
                Save
              </button>
            </form>
            <div className="divList">
              <DataGrid
                getRowId={(row) => row.election_id}
                rows={this.state.electionData}
                columns={this.state.columns}
                pageSize={100}
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
