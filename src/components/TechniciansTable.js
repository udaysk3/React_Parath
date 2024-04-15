import React, { useState, useEffect } from 'react';
import Title from './Title';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import moment from 'moment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CustomToolbar from './CustomToolbar';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import RetireTechnicianModal from './RetireModals/RetireTechnicianModal';
import AddTestModal from './AddTestModal';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import { mainListItems, secondaryListItems } from './listItems';
import AppBar from './AppBar'
import FloTraceDrawer from './FloTraceDrawer';
import { Paper } from '@mui/material';


export default function TechniciansTable({handleLogout, onSelectRows, currentFilterModel, clientId, clientName}) {
    
    const [techniciansData, setTechniciansData] = useState([]);
    const [open, setOpen] = useState(true);
    const [selectedIDs, setSelectedIDs] = useState(1)
    const [retireTechnicianModalStatus, setRetireTechnicianModalStatus] = useState(false);
    const [openSubmitModal, setOpenSubmitModal] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alert, setAlert] = useState(false);

    const handleOpenModal = () => setRetireTechnicianModalStatus(true);
    const handleCloseModal = () => setRetireTechnicianModalStatus(false);

    const toggleDrawer = () => {
      setOpen(!open);
    };

   
    const techniciansColumns = [
        { field: 'TechID', headerName: 'Technician ID', editable: true, width: 75 },
        { field: 'TechName', headerName: 'Tech Name', editable: true, width: 150 },
        { field: 'FirmName', headerName: 'Firm Name', editable: true, width:150 },        
        { field: 'CertTestNumber', headerName: 'Certification Test Number', editable: true, type:"number", width: 100},
        { field: 'Expired Date', headerName: 'Expired Date', editable: true, width:180, valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), type: 'date' },
        { field: 'MobilePhone', headerName: 'Mobile Phone', editable: true, width:100},
        { field: 'WorkPhone1', headerName: 'Work Phone 1', editable: true, width: 175},
        { field: 'WorkPhone2', headerName: 'Work Phone 2', editable: true, width: 125},
        { field: 'City', headerName: 'City', editable: true, width: 125},
        { field: 'State', headerName: 'State', editable: true, width: 125},
        { field: 'Postal Code', headerName: 'Postal Code', editable: true, width: 125},
        { field: 'Retire Technician', width: 225, headerName: 'Retire Technician', renderCell: 
        (params) => (
            <RemoveCircleIcon onClick={handleOpenModal} color="error"/>
          )
          }, 
        ];


    useEffect(() => {
      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/technicians`)
      .then(response => response.json())
      .then(data => {setTechniciansData(data.data)})
    }, []);



  const handleRetireTechnician = (e) => {
    e.preventDefault();
    
    fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${selectedIDs}/retiretechnician`)
      .then((response) => response.json())      
      .then(response => {
        setAlertContent("Technician retired successfully.");
        setAlert(true);
        setOpenSubmitModal(true);
      })
      .then((result) => {console.log(result)})
    }

    useEffect(() => {
      console.log("WILL BE DELETED", selectedIDs);
    }, [selectedIDs])


    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            Flo-Trace by LSPS Solutions, LLC
            </Typography>            
            
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          {/* <Logout token={handleRemoveToken}/> */}


          <Button onClick={handleLogout} variant="contained">Logout</Button>


          </Toolbar>
        </AppBar>
        <FloTraceDrawer />
        {/* <Drawer variant="permanent" open={open}> */}
        <FloTraceDrawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        {/* </Drawer> */}
        </FloTraceDrawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >

          <Toolbar />          
        <Grid item xs={12}>
        <Paper sx={{ ml:3, mt:4, p: 2, display: 'flex', flexDirection: 'column' }}>
        <RetireTechnicianModal retireTechnician={handleRetireTechnician} openStatus={retireTechnicianModalStatus} handleCloseModal={handleCloseModal} />
        <AddTestModal openStatus={openSubmitModal} alertContentText={alertContent}/>
        <Title>Technicians</Title>
        <Link sx={{alignText:"left"}} href="/addtechnician">Add a Technician</Link>
        <DataGridPremium
            getRowId={(row) => row.TechID}
            pagination
            checkboxSelection = {false}
            disableMultipleRowSelection={true}
            onRowSelectionModelChange={(ids) => {
              setSelectedIDs(ids[0]);
            }}
            initialState={{
              ...techniciansData.initialState,
              pagination: { paginationModel: { pageSize: 10 }},
              columns: {
                columnVisibilityModel: {
                  TechID:false,
                },
              }
            }
          }
            pageSizeOptions={[5, 10, 25, 100]}     
            editMode="row"
            filterModel={currentFilterModel}
            rows={techniciansData}
            loading={techniciansData.length === 0}
            columns={techniciansColumns}
            components={{ Toolbar: CustomToolbar }}
            />
              </Paper>
              </Grid>
        </Box>
      </Box>
  );
}