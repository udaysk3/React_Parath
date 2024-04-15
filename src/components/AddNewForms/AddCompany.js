import React, { useState, useEffect, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { mainListItems, secondaryListItems } from "../listItems";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Copyright from "../Copyright";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "../AppBar";
import FloTraceDrawer from "../FloTraceDrawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MuiAlert from '@mui/material/Alert';
import AddTestModal from "../AddTestModal";
import FloTraceLogo from "../FloTraceLogo";


const AddCompany= ({clientId, handleLogout}) => {
    
    const [open, setOpen] = useState(true);
    const [companiesData, setCompaniesData] = useState([]);
    const [companyDevicesData, setCompanyDevicesData] = useState([]);
    const [testFiles, setTestFiles] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState("")
    const [formData, setFormData] = useState({
      companyName:"",
      website:"",
      owner:"",
    });
    const [deviceSerialNumbers, setDeviceSerialNumbers] = useState([]);
    const [deviceID, setDeviceID] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [openSubmitModal, setOpenSubmitModal] = useState(false);
    const [deviceScheduledTestDate, setDeviceScheduledTestDate] = useState("")
    const [selectedDeviceID, setSelectedDeviceID] = useState("");


    const [companyNameDupeExists, setCompanyNameDupeExists] = useState(false);

    const handleOpenSubmitModal = () => setOpenSubmitModal(true);
    const handleCloseSubmitModal = () => setOpenSubmitModal(false);
    


    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });



  useEffect(() => {
    fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${formData.companyName.replace(/ /g, '%20')}/checkcompanyduplicates`)
    .then(response => response.json())
    .then(data => {
      if (data.response==="Company with this name already exists.") {
        setCompanyNameDupeExists(true);
        console.log('setting state', companyNameDupeExists)
      } else {
        setCompanyNameDupeExists(false);
        console.log('Not a dupe')
      }
})}, [formData.companyName])


  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/postcompany`, {
      method: "POST",
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
      })
      .then((response) => response.json())
      .then(() => {
        setAlertContent("Company created successfully!");
        setAlert(true);
        handleOpenSubmitModal();
      })
      .then((result) => {
      console.log(result)})
    }

    const toggleDrawer = () => {
      setOpen(!open);
    };



  return (
    <Box sx={{ display: "flex" }}>
       <CssBaseline />
       <AppBar position="absolute" open={open}>
         <Toolbar
           sx={{
             pr: "24px", 
           }}
         > 
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
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
           <Button onClick={handleLogout} variant="contained" >Logout</Button>

         </Toolbar>
       </AppBar>
       <FloTraceDrawer />
       <FloTraceDrawer variant="permanent" open={open}>
         <Toolbar
           sx={{
             display: "flex",
             alignItems: "center",
             justifyContent: "flex-end",
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
      </FloTraceDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      />
      <Toolbar />


      <Container 
        maxWidth="xlg" 
        sx={{ 
          mt: 10,
          mb: 4,
          boxShadow: "-15px -5px 15px -1px #CECECE",
          borderRadius:2,
          backgroundColor: "white",
        }}>
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Add a Company
        </Typography>
        <Typography>* Denotes a required field</Typography>

        <Box
          align="left"
          sx={{
            mt:4,
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
          autoComplete="off"
        >
          <h3>Company Details</h3>
          <Box component="form" onSubmit={handleSubmit}>
          <Grid sx={{mt:2}} >
            <Grid>
            <TextField
                //error={formData.companyName === ''}
                error={formData.companyName === '' || companyNameDupeExists}
                id="outlined-select-currency"
                style = {{width: 550}}
                label="Company Name"
                required
                helperText={companyNameDupeExists ? "Warning- company with this name already exists":"Type company name"}
                value={formData.companyName}
                onChange={e => setFormData({...formData, companyName:e.target.value})}
              >
            </TextField>
            </Grid>
            <Grid>
            <TextField
                id="outlined-select-currency"
                style = {{width: 550}}
                label="Website"
                helperText="Type company website"
                value={formData.website}
                onChange={e => setFormData({...formData, website:e.target.value})}
              >
            </TextField>
            </Grid>
            <TextField
                id="outlined-select-currency"
                style = {{width: 300}}
                label="Owner"
                helperText="Type company owner"
                value={formData.owner}
                onChange={e => setFormData({...formData, owner:e.target.value})}
              >
            </TextField>
          </Grid> 

          <Grid>
          <Box sx={{ display:'inline-flex' }}>
            <AddTestModal submitTestFileAndData={handleSubmit} openStatus={openSubmitModal} handleModalClose={handleCloseSubmitModal} alertContentText={alertContent}/>
            <Button type="submit" variant="contained" size="large" color="success" sx={{ml:1, mr: 6, mt: 4,borderRadius:8, width:225}}>Submit</Button>            
            <Button size="large" href="/" variant="contained"  sx = {{mr: 6, mt: 4,borderRadius:8,borderRadius:8, width:225 }}color="error">
                Cancel
            </Button>
          </Box>
          </Grid>
          </Box>
        </Box>
        <FloTraceLogo style={{mt: 2, height:"200px", width:"200px"}}/>
        <Copyright />
      </Container>
      
    </Box>
  );
};


export default AddCompany;
