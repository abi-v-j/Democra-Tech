import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
export default class Sectionsubport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionsubport: "",
      sectionsubportData: [],
      district: "",
      districtData: [],
      section: "",
      sectionportData: [],
      columns: [
        {
          field: "sectionsubport_id",
          headerName: "ID",
          width: 200,
        },
        {
          field: "district_name",
          headerName: "District",
          width: 200,
        },
        {
          field: "sectionport_name",
          headerName: "Sectionpart",
          width: 200,
        },
        {
          field: "sectionsubport_name",
          headerName: "Sectionsubpart",
          width: 200,
        },
        {
          field: "action",
          headerName: "Action",
          width: 250,
          renderCell: (params) => {
            return (
              <>
                <DeleteOutline
                  className="divListDelete"
                  onClick={() =>
                    this.sectionsubportDelete(params.row.sectionsubport_id)
                  }
                />
              </>
            );
          },
        },
      ],
    };
  }
  sectionsubportDelete = (id) => {
    axios
      .delete(`http://localhost:4000/Sectionsubport/${id}`)
      .then((response) => {
        this.componentDidMount();
      });
  };
  inputSet = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };
  saveData = (e) => {
    e.preventDefault();

    var dat = {
      sectionsubport_name: this.state.sectionsubport,
      sectionport_id: this.state.section,
      district_id: this.state.district,
    };
    axios.post("http://localhost:4000/Sectionsubport", dat).then((response) => {
      this.cancelCourse();
      this.componentDidMount();
    });
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/Sectionsubport")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ sectionsubportData: data.sectionsubport });
      });
    axios
      .get("http://localhost:4000/District")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ districtData: data.district });
      });

    axios
      .get("http://localhost:4000/Sectionport")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ sectionportData: data.Sectionport });
      });
  }
  cancelCourse = () => {
    document.getElementById("sectionsubportForm").reset();
  };
  render() {
    return (
      <div className="Ahome">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="div">
            <h1 className="divTitle">New Sectionsubport</h1>
            <form className="divForm" id="sectionsubportForm">
              <div className="divItem">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    District
                  </InputLabel>
                  <Select
                    defaultValue=""
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Age"
                    name="district"
                    onChange={this.inputSet}
                  >
                    {this.state.districtData.map((dis, key) => {
                      return (
                        <MenuItem key={key} value={dis.district_id}>
                          {dis.district_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    SectionPart
                  </InputLabel>{" "}
                  <Select
                    defaultValue=""
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Sectionport"
                    name="section"
                    onChange={this.inputSet}
                  >
                    {this.state.sectionportData.map((sec, key) => {
                      return (
                        <MenuItem key={key} value={sec.sectionport_id}>
                          {sec.sectionport_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <input
                  type="text"
                  onChange={this.inputSet}
                  placeholder="sectionsubport"
                  name="sectionsubport"
                />
              </div>
              <button onClick={this.saveData} className="divButton">
                Save
              </button>
            </form>
            <div className="divList">
              <DataGrid
                getRowId={(row) => row.sectionsubport_id}
                rows={this.state.sectionsubportData}
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
