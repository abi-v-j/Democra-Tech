import React, { useEffect, useState } from 'react'
import { Avatar, Box } from '@mui/material'
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import axios from 'axios';
import { Typography } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useParams } from 'react-router-dom';
import useDownloader from 'react-use-downloader';
import { DataGrid } from '@mui/x-data-grid';
const ViewVoters = () => {
  const { wid } = useParams();
  const [open, setOpen] = React.useState(false);
  const [photo, setPhoto] = React.useState(false);
  const [Proof, setProof] = React.useState(false);
  const [name, setName] = React.useState(false);
  const [id, setId] = React.useState(false);
  const [address, setAddress] = React.useState(false);
  const [gender, setGender] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [voterid, setVoterid] = React.useState(false);
  const [openAccept, setAcceptStart] = React.useState(false);
  const [openReject, setRejectStart] = React.useState(false);
  const openMyAccept = () => {
    handleClickOpenAccept();
  };
  const openMyReject = () => {
    handleClickOpenReject();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenAccept = () => {
    setAcceptStart(true);
  };

  const handleCloseAccept = () => {
    setAcceptStart(false);
  };
  const handleClickOpenReject = () => {
    setRejectStart(true);
  };

  const handleCloseReject = () => {
    setRejectStart(false);
  };
  const { download } =
    useDownloader();

  const [rows, setRows] = useState([]);

  const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      align: "center",
    },
    {
      field: "user_photo",
      headerName: "Photo",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Avatar
              alt="Remy Sharp"
              src={params.row.user_photo}
              onClick={() => {
                setPhoto(params.row.user_photo)
                handleClickOpen();
              }}
            />
          </>
        );
      },




    },
    {
      field: "user_name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "user_voterid",
      headerName: "Voter Id",
      width: 150,
    },
    {
      field: "user_proof",
      headerName: "Proof",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <a href={params.row.user_proof} target='_blank' rel='noreferrer'><VisibilityIcon />

            </a>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button variant="outlined" onClick={() => {
              setPhoto(params.row.user_photo)
              setProof(params.row.user_proof)
              setName(params.row.user_name)
              setId(params.row.user_id)
              setAddress(params.row.user_address)
              setVoterid(params.row.user_voterid)
              setGender(params.row.user_gender)
              setEmail(params.row.user_email)
              openMyAccept();


            }}>
              Accept
            </Button>
            <Button variant="outlined" onClick={() => {
              setPhoto(params.row.user_photo)
              setProof(params.row.user_proof)
              setName(params.row.user_name)
              setId(params.row.user_id)
              setAddress(params.row.user_address)
              setVoterid(params.row.user_voterid)
              setGender(params.row.user_gender)
              setEmail(params.row.user_email)

              openMyReject();

            }} style={{ marginLeft: '20px' }}>
              Reject
            </Button>
          </>
        );
      },
    },
  ];

  const user_accept = (uid) => {
    setAcceptStart(false);
    axios.post(`http://localhost:4000/UserAccept/${uid}`).then((response) => {
      console.log(response.data);
      alert(response.data.message);
      fetchData();

    });
  };

  const user_reject = (uid) => {
    setRejectStart(false);
    axios.post(`http://localhost:4000/UserReject/${uid}`).then((response) => {
      console.log(response.data);
      alert(response.data.message);
      fetchData();


    });
  };


  const fetchData = () => {
    axios.get(`http://localhost:4000/UserWardSel/${wid}`).then((response) => {
      var data = response.data.UserWardSel;

      setRows(data);


    });

  };
  useEffect(() => {
    fetchData();

  }, []);


  return (




    <Box display="flex" flexDirection="row" marginLeft="20px" my={1} mx={2}>

      <Paper elevation={3} style={{ padding: '15px', maxWidth: '800', width: '100%', textAlign: 'left' }}>

        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>View Voters</Typography>
        <Button style={{ marginBottom: '20px' }} size='large' component={Link}
          to={`/Agent/ViewAssign/`}>Back</Button>

        <div className="divList">
          <DataGrid
            getRowId={(row) => row.id}

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
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Photo"}
          </DialogTitle>
          <DialogContent>

            <img src={photo} alt='user pic' />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Back</Button>
          </DialogActions>
        </Dialog>


        <Dialog
          open={openAccept}
          keepMounted
          onClose={handleCloseAccept}
          aria-describedby="alert-dialog-slide-description"
          align="center"
        >
          <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', fontSize: '25px' }}>
            {"Profile"}
            <Button onClick={handleCloseAccept} style={{ fontSize: '15px' }} >back</Button>
          </DialogTitle>

          <DialogContent>

            <Box> <img src={photo} height="150px" width="150px" alt='u pic' /></Box>


            <Box display="flex" flexWrap="wrap" justifyContent="space-between"  >

              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Name</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{name}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Address</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{address}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Voter Id</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{voterid}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Gender</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{gender}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Email</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{email}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Proof</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Button onClick={() => { download(Proof, Proof) }} > <FileDownloadIcon /></Button>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" >Sure to Confirm </Typography>
            <Button onClick={() => { user_accept(id) }}>Accept</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openReject}
          keepMounted
          onClose={handleCloseReject}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', fontSize: '25px' }}>
            {"Profile"}
            <Button onClick={handleCloseReject} style={{ fontSize: '15px' }} >back</Button>
          </DialogTitle>

          <DialogContent>

            <Box> <img src={photo} height="150px" width="150px" alt='us pic' /></Box>


            <Box display="flex" flexWrap="wrap" justifyContent="space-between" marginLeft="50px" >

              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Name</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{name}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Address</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{address}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Voter Id</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{voterid}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Gender</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{gender}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Email</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6">{email}</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Proof</Typography>
              </Box>
              <Box width="45%" my={1}>
                <Button onClick={() => { download(Proof, Proof) }} > <FileDownloadIcon /></Button>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" >Sure to Confirm </Typography>

            <Button onClick={() => { user_reject(id) }}>Reject</Button>
          </DialogActions>
        </Dialog>
      </Paper>

    </Box>



  )

}

export default ViewVoters

