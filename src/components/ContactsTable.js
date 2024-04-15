import React, { useState, useEffect, useContext } from 'react';
import Title from './Title';
import { DataGridPremium } from '@mui/x-data-grid-premium';
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
import RetireContactModal from './RetireModals/RetireContactModal';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import { mainListItems, secondaryListItems } from './listItems';
import AppBar from './AppBar'
import FloTraceDrawer from './FloTraceDrawer';
import AddTestModal from './AddTestModal';
import { Paper } from '@mui/material';


export default function ContactsTable({handleLogout, onSelectRows, currentFilterModel, clientId, clientName}) {
    
  const [contactsData, setContactsData] = useState([]);
  const [retireContactModalStatus, setRetireContactModalStatus] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alert, setAlert] = useState(false);
  const [selectedIDs, setSelectedIDs] = useState(1)
  const [open, setOpen] = useState(true);

  const handleOpenModal = () => setRetireContactModalStatus(true);
  const handleCloseModal = () => setRetireContactModalStatus(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // const handleModalClose= () => {
  //   setRetireContactModalStatus(false);
  // }


  const handleRetireContact = (e) => {
    e.preventDefault();
    
    fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${selectedIDs}/retirecontact`)
      .then((response) => response.json())      
      .then(response => {
        setAlertContent("Contact retired successfully.");
        setAlert(true);
        setOpenSubmitModal(true);
      })
      .then((result) => {console.log(result)})
    }


  useEffect(() => {
    console.log("WILL BE DELETED", selectedIDs);
  }, [selectedIDs])
 
  const contactsColumns = [
      { field: 'ContactID', headerName: 'Contact ID', editable: true, width: 75 },      
      { field: 'LastName', headerName: 'Last Name', editable: true, width: 210},
      { field: 'FirstName', headerName: 'First Name', editable: true, width:110},
      { field: 'EmailAddress', headerName: 'Email', editable: true, width:125},
      { field: 'JobTitle', headerName: 'Job Title', editable: true, width:175},
      { field: 'BusinessPhone', headerName: 'Business Phone', editable: true, width: 175},
      { field: 'HomePhone', headerName: 'Home Phone', editable: true, width: 125},
      { field: 'MobilePhone', headerName: 'Mobile Phone', editable: true, width: 125},
      { field: 'FaxNumber', headerName: 'Fax', editable: true, width: 125},
      { field: 'StreetAddress', headerName: 'Street Address', editable: true, width: 125},
      { field: 'City', headerName: 'City', editable: true, width: 125},
      { field: 'State', headerName: 'State', editable: true, width: 125},
      { field: 'PostalCode', headerName: 'Postal Code', editable: true, width: 125},
      { field: 'Retire', width: 225, headerName: 'Retire Contact', renderCell: 
      (params) => (
          <RemoveCircleIcon onClick={handleOpenModal} color="error"/>
        )
        }, 
      ];

    useEffect(() => {
      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/contacts`)
      .then(response => response.json())
      .then(data => {setContactsData(data.data)})
    }, []);


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
        <RetireContactModal retireContact={handleRetireContact} openStatus={retireContactModalStatus} handleCloseModal={handleCloseModal} />
        <AddTestModal openStatus={openSubmitModal} alertContentText={alertContent}/>

        <Paper sx={{ ml:3, mt:4, p: 2, display: 'flex', flexDirection: 'column' }}>
        <Title>Contacts</Title>
        <Link sx={{alignText:"left"}} href="/addcontact">Add a Contact</Link>


        <DataGridPremium
            getRowId={(row) => row.ContactID}
            pagination
            checkboxSelection = {false}
            disableMultipleRowSelection={true}
            onRowSelectionModelChange={(ids) => {

              setSelectedIDs(ids[0]);
              
              
              //const selectedIDs = new Set(ids);
              //console.log(selectedIDs)
              // const selectedRows = contactsData.filter((row) =>
              //   selectedIDs.has(row.ContactID)
              // );
            }}
            //   onSelectRows(selectedRows);
            //   console.log("Selected Rows", selectedRows)
            // }}




            // getDetailPanelHeight={getDetailPanelHeight}
            // getDetailPanelContent={getDetailPanelContent}
            // detailPanelExpandedRowIds={detailPanelExpandedRowIds}
            // onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
            initialState={{
              ...contactsData.initialState,
              pagination: { paginationModel: { pageSize: 10 }},
              columns: {
                columnVisibilityModel: {
                  ContactID:false,
                },
              }
            }
          }
            pageSizeOptions={[5, 10, 25, 100]}     
            editMode="row"
            filterModel={currentFilterModel}
            rows={contactsData}
            loading={contactsData.length === 0}
            columns={contactsColumns}
            //onFilterModelChange={(newFilterModel) => props.setFilterModelFunction(newFilterModel)}
            components={{ Toolbar: CustomToolbar }}
            />
                          </Paper>
              </Grid>
        </Box>
      </Box>
  );
}