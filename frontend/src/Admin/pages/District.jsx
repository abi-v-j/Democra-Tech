import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

export default class District extends Component {
  constructor(props) {
    super(props);
    this.state = {
      district: "",
      districtData: [],
      columns: [
        {
          field: "district_id",
          headerName: "ID",
          width: 330,
        },
        {
          field: "district_name",
          headerName: "district",
          width: 360,
        },
        {
          field: "action",
          headerName: "Action",
          width: 300,
          renderCell: (params) => {
            return (
              <>
                <div>
                  <DeleteOutline
                    className="divListDelete"
                    onClick={() => this.districtDelete(params.row.district_id)}
                  />
                  <span className="deleteTooltip">Delete</span>
                </div>

              </>
            );
          },
        },
      ],
    };
  }

  districtDelete = (id) => {
    axios.delete(`http://localhost:4000/district/${id}`).then((response) => {
      this.componentDidMount();
    });
  };

  inputSet = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  saveData = (e) => {
    e.preventDefault();

    var dat = {
      district_name: this.state.district,
    };

    axios.post("http://localhost:4000/district", dat).then((response) => {
      this.cancelCourse();
      this.componentDidMount();
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/district")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState({ districtData: data.district });
      });
  }

  cancelCourse = () => {
    document.getElementById("districtForm").reset();
  };

  render() {
    return (
      <div className="Ahome">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="div">
            <h1 className="divTitle">New district</h1>
            <form className="divForm" id="districtForm">
              <div className="divItem">
                {/* <label>district</label> */}
                <input
                  type="text"
                  onChange={this.inputSet}
                  placeholder="district"
                  name="district"
                />
              </div>
              <button onClick={this.saveData} className="divButton">
                Save
              </button>
            </form>
            <div className="divList">
              <DataGrid
                getRowId={(row) => row.district_id}
                rows={this.state.districtData}
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
