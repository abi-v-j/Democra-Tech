import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Ward() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedVal, setSelectedVal] = useState("");
  const [ward, setWard] = useState("");
  const [dis, setDis] = useState("");
  const [ssec, setsSec] = useState("");
  const [ssection, setsSection] = useState([]);
  const [district, setDistrict] = useState([]);
  const [section, setSection] = useState([]);
  const [rows, setRows] = useState([]);
  const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }));

  const columns= [
            {
              field: "id",
              headerName: "ID",
              width: 250,
            },
            {
              field: "sectionsubport_name",
              headerName: "Sectionsubpart",
              width: 250,
            },
            {
              field: "ward_name",
              headerName: "Ward",
              width: 250,
            },
            {
              field: "action",
              headerName: "Action",
              width: 350,
              renderCell: (params) => {
                return (
                  <>
                    <DeleteIcon
                      className="divListDelete"
                      onClick={() => deleteData(params.row.ward_id)}
                    />
                  </>
                );
              },
            },
          ];
          
  const inputData = (e) => {
    var dat = {
      ward_name: ward,
      sectionsubport_id: ssec,
    };
    axios.post("http://localhost:4000/Ward/", dat).then((response) => {
      // alert(response.data.message);
      fetchWard();
    });
  };
  const ajaxsection = (id) => {
    axios
      .get(`http://localhost:4000/Condition_subport/${id}/${dis}`)
      .then((response) => {
        var data = response.data.subsection;
        setsSection(data);
      });
  };
  const deleteData = (id) => {
    axios.delete(`http://localhost:4000/Ward/${id}`).then((response) => {
      fetchWard();
    });
  };

  const fetchWard = () => {
    axios.get("http://localhost:4000/Ward").then((response) => {
      var data = response.data.ward;
      setRows(data);
    });
  };
  const fetchDistrict = () => {
    axios.get("http://localhost:4000/District").then((response) => {
      var data = response.data.district;
      setDistrict(data);
    });
  };
  const fetchSectionpart = () => {
    axios.get("http://localhost:4000/Sectionport").then((response) => {
      var data = response.data.Sectionport;
      setSection(data);
    });
  };

  useEffect(() => {
    fetchWard();
    fetchDistrict();
    fetchSectionpart();
  }, []);
 

  return (
    <div className="Ahome">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="div">
          <h1 className="divTitle">New Ward</h1>
          <form className="divForm">
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
                  onChange={(e) => {
                    setDis(e.target.value);
                    fetchSectionpart();
                    setSelectedValue("");
                    setSelectedVal("");
                  }}
                >
                  {district.map((dis, key) => {
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
                  value={selectedValue}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="SectionPart"
                  onChange={(e) => {
                    setSelectedValue(e.target.value);
                    setSelectedVal("");
                    ajaxsection(e.target.value);
                  }}
                >
                  {section.map((sec, key) => {
                    return (
                      <MenuItem key={key} value={sec.sectionport_id}>
                        {sec.sectionport_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  SectionSubPart
                </InputLabel>
                <Select
                  value={selectedVal}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="SectionSubPart"
                  onChange={(e) => {
                    setSelectedVal(e.target.value);
                    setsSec(e.target.value);
                  }}
                >
                  {ssection.map((sec, key) => {
                    return (
                      <MenuItem key={key} value={sec.sectionsubport_id}>
                        {sec.sectionsubport_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <input
                type="text"
                onChange={(e) => setWard(e.target.value)}
                placeholder="Ward"
                name="Ward"
              />
            </div>
            <button onClick={ inputData} className="divButton">
              Save
            </button>
          </form>
        
          <div className="divList">
          <DataGrid
            getRowId={(row) =>  row.id}

            rows={rowsWithId}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
        </div>
      </div>
    </div>
  );
}
