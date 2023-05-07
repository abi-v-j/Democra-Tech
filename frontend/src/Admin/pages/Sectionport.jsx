import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
export default class Sectionport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionport: "",
      sectionportData: [],
      columns: [
        {
          field: "sectionport_id",
          headerName: "ID",
          width: 330,
        },
        {
          field: "sectionport_name",
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
                <DeleteOutline
                  className="divListDelete"
                  onClick={() =>
                    this.sectionportDelete(params.row.sectionport_id)
                  }
                />
              </>
            );
          },
        },
      ],
    };
  }
  sectionportDelete = (id) => {
    axios.delete(`http://localhost:4000/sectionport/${id}`).then((response) => {
      this.componentDidMount();
    });
  };
  inputSet = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };
  saveData = (e) => {
    e.preventDefault();

    var dat = {
      sectionport_name: this.state.sectionport,
    };

    axios.post("http://localhost:4000/Sectionport", dat).then((response) => {
      this.cancelCourse();
      this.componentDidMount();
    });
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/Sectionport")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState({ sectionportData: data.Sectionport });
      });
  }
  cancelCourse = () => {
    document.getElementById("sectionportForm").reset();
  };
  render() {
    return (
      <div className="Ahome">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="div">
            <h1 className="divTitle">New SectionPart</h1>
            <form className="divForm" id="sectionportForm">
              <div className="divItem">
                <input
                  type="text"
                  onChange={this.inputSet}
                  placeholder="Sectionpart"
                  name="sectionport"
                />
              </div>
              <button onClick={this.saveData} className="divButton">
                Save
              </button>
            </form>
            <div className="divList">
              <DataGrid
                getRowId={(row) => row.sectionport_id}
                rows={this.state.sectionportData}
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
