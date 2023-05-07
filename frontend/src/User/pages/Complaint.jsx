import { useEffect, useState } from "react";
import "./complaint.scss";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button, Container, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


const Complaint = () => {
  const [rows, setRows] = useState([]);
  const [profile, setProfile] = useState([]);
  const [complaint, setComplaint] = useState("")

  const inputData = () => {
    var dat = {
      user_id: sessionStorage.getItem("uid"),
      complaint_content:complaint,

    };
    axios.post("http://localhost:4000/complaint/", dat).then((response) => {
      console.log(response.data);
      setComplaint([])
      fetchData();
    });
  };
//   const deleteData = (cmid) => {
//     axios.delete("http://localhost:4000/CommentDelete/"+cmid).then((response) => {
//      console.log(response.data);
//       fetchData();
     

//     });
//   }
  const fetchData = () => {
    axios.get("http://localhost:4000/Complaint/"+sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.Complaint;

      setRows(data);

    });
    axios.get("http://localhost:4000/UserProfile/" + sessionStorage.getItem("uid")).then((response) => {
      var d = response.data.UserProfile;

      setProfile(d[0]);


    });




  };
  const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
      align: "center",
    },
    

    
    {
      field: "complaint_content",
      headerName: "Content",
      width: 250,
    },
    {
      field: "complaint_replay",
      headerName: "Reply",
      width: 250,
    },
    
    
  ];

  useEffect(() => {
    fetchData();

  },[]);


  return (
    <Container  maxWidth="sm">
      <Typography variant="h4" align="center">
        complaint Form
      </Typography>
       
       
        <TextField
          required
          fullWidth
          margin="normal"
          label="Complaint"
          variant="outlined"
          multiline
          rows={4}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" onClick={inputData}>
          Submit
        </Button>

        <div style={{marginTop:'30px'}}>
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
    </Container>
  );
};

export default Complaint;
