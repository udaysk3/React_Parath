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
import InputMask from 'react-input-mask';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { states } from "../States";


const AddTechnician= ({clientId, handleLogout}) => {
    
    const [open, setOpen] = useState(true);
    const [companiesData, setCompaniesData] = useState([]);
    const [companyDevicesData, setCompanyDevicesData] = useState([]);
    const [testFiles, setTestFiles] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState("")
    const [formData, setFormData] = useState({
      technicianName:"",
      firmName:"",
      certTesterNumber:"",
      certExpirationDate:"",
      streetAddress:"",
      city:"",
      state:"",
      postalCode:"",
      workPhoneOne:"",
      workPhoneTwo:"",
      mobilePhone:"",
    });
    const [deviceSerialNumbers, setDeviceSerialNumbers] = useState([]);
    const [deviceID, setDeviceID] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [openSubmitModal, setOpenSubmitModal] = useState(false);
    const [deviceScheduledTestDate, setDeviceScheduledTestDate] = useState("")
    const [selectedDeviceID, setSelectedDeviceID] = useState("");

    const handleOpenSubmitModal = () => setOpenSubmitModal(true);
    const handleCloseSubmitModal = () => setOpenSubmitModal(false);
    


    const [workPhoneOneIsValid, setWorkPhoneOneIsValid] = useState(false)
    const [workPhoneTwoIsValid, setWorkPhoneTwoIsValid] = useState(false)
    const [mobilePhoneIsValid, setMobilePhoneIsValid] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)


    useEffect(()=> {
      // console.log("bisphone", businessPhoneIsValid)
      // console.log("home", homePhoneIsValid)
      // console.log("mobile", mobilePhoneIsValid)
      // console.log("fax", faxIsValid)

      
      if (workPhoneOneIsValid) {
        console.log('Setting form valid to true')

        setFormIsValid(true);
      } else {
        console.log('setting form valid to false')
        setFormIsValid(false)
      }

    }, [workPhoneOneIsValid])







    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });






  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/posttechnician`, {
      method: "POST",
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
      })
      .then((response) => response.json())
      .then(response => {
        setAlertContent("Technician created successfully!");
        setAlert(true);
        handleOpenSubmitModal();})
      .then((result) => {
      console.log(result)
    })
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
          Add a Technician
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
          <h3>Technician Details</h3>
          <Box component="form" onSubmit={handleSubmit}>
          <Grid sx={{mt:2}} >
            <Grid>
            <TextField
                error={formData.technicianName == ''}
                id="outlined-select-currency"
                style = {{width: 500}}
                label="Technician Name"
                required
                helperText="First and last name e.g, John Doe"
                value={formData.technicianName}
                onChange={e => setFormData({...formData, technicianName:e.target.value})}
              >
            </TextField>
            </Grid>
            <Grid>            
            <TextField
                error={formData.firmName == ''}
                id="outlined-select-currency"
                style = {{width: 500}}
                required
                label="Technician Firm Name"
                helperText="Type certification firm name"
                value={formData.firmName}
                onChange={e => setFormData({...formData, firmName:e.target.value})}
              >
            </TextField>
            </Grid>
            <Grid>            
            <TextField
                error={formData.certTesterNumber == ''}
                id="outlined-select-currency"
                style = {{width: 270}}
                required
                label="Certification Tester Number"
                helperText="Type certification tester number"
                value={formData.certTesterNumber}
                onChange={e => setFormData({...formData, certTesterNumber:e.target.value})}
              >
            </TextField>
            </Grid>
            <Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker style = {{width: 300}} label="Certification Expiration Date"
                onChange={(date) => {
                    setFormData({...formData, certExpirationDate:date.format('YYYY-MM-DD')})}}
                slotProps={{
                      textField: {
                        required: true,
                        error: formData.certExpirationDate == ''

                      },
                    }}
                  />
            </DemoContainer>
        </LocalizationProvider>
            </Grid>
            <h3>Certification Firm Details</h3>
            <Grid>
            <TextField
                required
                error={formData.streetAddress == ''}
                id="outlined-select-currency"
                style = {{width: 550}}
                label="Firm Street Address"
                helperText="e.g. 123 Main St"
                value={formData.streetAddress}
                onChange={e => setFormData({...formData, streetAddress:e.target.value})}
              >
            </TextField>
            </Grid>
            <Grid>            
            <TextField
                id="outlined-select-currency"
                error={formData.city == ''}
                style = {{width: 275}}
                required
                label="City"
                helperText="Type city"
                value={formData.city}
                onChange={e => setFormData({...formData, city:e.target.value})}
              >
            </TextField>


{/* 
            <InputMask
              mask="aa"
              value={formData.state}
              disabled={false}
              maskChar=" "
              onChange={e => setFormData({...formData, state:e.target.value})}
              >
              {() => <TextField
                style = {{width: 275}}
                required
                label="State"
                helperText="Type state"
                value={formData.state}
            >
            </TextField>}
          </InputMask> */}



          <TextField
              error={formData.state == ''}
              id="outlined-select-currency"
              select
              required
              //style = {{width: 260}}
              label="State"
              helperText="ex. TX"
              value={formData.state}              
              onChange={e => setFormData({...formData, state: e.target.value})}
            >
              {states.map((option) => (
                <MenuItem key={option.id} value={option.state}>
                  {option.state}
                </MenuItem>
              ))}
            </TextField> 



          <InputMask
              mask="99999-9999"
              value={formData.postalCode}
              disabled={false}
              maskChar=" "
              onChange={e => setFormData({...formData, postalCode:e.target.value})}
              >
              {() => <TextField
                error={formData.postalCode.toString().replace(/[^0-9]/g,"").length < 5 || formData.postalCode.toString().replace(/[^0-9]/g,"").length > 5 && formData.postalCode.toString().replace(/[^0-9]/g,"").length < 9}
                helperText={formData.postalCode.toString().replace(/[^0-9]/g,"").length < 5 || formData.postalCode.toString().replace(/[^0-9]/g,"").length > 5 && formData.postalCode.toString().replace(/[^0-9]/g,"").length < 9 ? 'Postal code must be either 5 or 9 digits' : ' '}
                id="outlined-select-currency"
                style = {{width: 275}}
                required
                label="Postal Code"
                //helperText="Type 5-digit postal code e.g. 12345"
                value={formData.postalCode}
            >
            </TextField>}
          </InputMask>






            {/* <TextField
                id="outlined-select-currency"
                style = {{width: 275}}
                required
                label="State"
                helperText="Type state"
                value={formData.state}
                onChange={e => setFormData({...formData, state:e.target.value})}
              >
            </TextField> */}
            {/* <TextField
                id="outlined-select-currency"
                style = {{width: 275}}
                required
                label="Postal Code"
                helperText="Type 5-digit postal code e.g. 12345"
                value={formData.postalCode}
                onChange={e => setFormData({...formData, postalCode:e.target.value})}
              >
            </TextField> */}
            </Grid>
            <h3>Technician Contact Details</h3>

            <Grid>

            <InputMask
              mask="(999) 999-9999"
              value={formData.workPhoneOne}
              disabled={false}
              maskChar=" "
              //onChange={e => setFormData({...formData, workPhoneOne:e.target.value})}
              onChange={e => { 
                setFormData({...formData, workPhoneOne:e.target.value})
  
                let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
                if (digitLength < 10) {
                    setWorkPhoneOneIsValid(false)
                } else {
                    setWorkPhoneOneIsValid(true)
              }}}
            >
              {() => <TextField
                  error={formData.workPhoneOne.toString().replace(/[^0-9]/g,"").length <10}
                  helperText={formData.workPhoneOne.toString().replace(/[^0-9]/g,"").length < 10 ? 'Work Phone 1 phone must be 10 digits' : ' '}
                  required
                  label="Work Phone 1"
                  //helperText="Type primary work phone number"
                  value={formData.workPhoneOne}
            >
            </TextField>}
          </InputMask>





            {/* <TextField
                id="outlined-select-currency"
                style = {{width: 275}}
                required
                label="Work Phone 1"
                helperText="Type primary work phone number"
                value={formData.workPhoneOne}
                onChange={e => setFormData({...formData, workPhoneOne:e.target.value})}
              >
            </TextField> */}


            <InputMask
              mask="(999) 999-9999"
              value={formData.workPhoneTwo}
              disabled={false}
              maskChar=" "
              //onChange={e => setFormData({...formData, workPhoneTwo:e.target.value})}
              onChange={e => { 
                setFormData({...formData, workPhoneTwo:e.target.value})
  
                let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
                if (digitLength < 10) {
                    setWorkPhoneTwoIsValid(false)
                } else {
                    setWorkPhoneTwoIsValid(true)
              }}}
              >
              {() => <TextField

                //error={formData.workPhoneTwo.toString().replace(/[^0-9]/g,"").length <10}
                helperText={formData.workPhoneTwo.toString().replace(/[^0-9]/g,"").length < 10 ? 'Work phone 2 must be 10 digits' : ' '}
                 id="outlined-select-currency"
                 style = {{width: 275}}
                 label="Work Phone 2"
                 //helperText="Type secondary work phone number"
                 value={formData.workPhoneTwo}
            >
            </TextField>}
          </InputMask>

          <InputMask
              mask="(999) 999-9999"
              value={formData.mobilePhone}
              disabled={false}
              maskChar=" "
              //onChange={e => setFormData({...formData, mobilePhone:e.target.value})}
              onChange={e => { 
                setFormData({...formData, mobilePhone:e.target.value})
  
                let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
                if (digitLength < 10) {
                    setMobilePhoneIsValid(false)
                } else {
                    setMobilePhoneIsValid(true)
              }}}
              >
              {() => <TextField
                 //error={formData.mobilePhone.toString().replace(/[^0-9]/g,"").length <10}
                 helperText={formData.mobilePhone.toString().replace(/[^0-9]/g,"").length < 10 ? 'Mobile phone must be 10 digits' : ' '}
                 id="outlined-select-currency"
                 style = {{width: 275}}
                 label="Mobile Phone"
                 value={formData.mobilePhone}
            >
            </TextField>}
          </InputMask>


            {/* <TextField
                id="outlined-select-currency"
                style = {{width: 275}}
                label="Work Phone 2"
                helperText="Type secondary work phone number"
                value={formData.workPhoneTwo}
                onChange={e => setFormData({...formData, workPhoneTwo:e.target.value})}
              >
            </TextField> */}
            {/* <TextField
                id="outlined-select-currency"
                style = {{width: 275}}
                label="Mobile Phone"
                helperText="Type mobile phone number"
                value={formData.mobilePhone}
                onChange={e => setFormData({...formData, mobilePhone:e.target.value})}
              >
            </TextField> */}
            </Grid>
          </Grid> 

          <Grid>
          <Box sx={{ display:'inline-flex' }}>
            <AddTestModal submitTestFileAndData={handleSubmit} openStatus={openSubmitModal} handleModalClose={handleCloseSubmitModal} alertContentText={alertContent}/>
            <Button 
            disabled={formIsValid ? false:true}
            type="submit" 
            variant="contained" 
            size="large" 
            color="success"
            sx={{ml:1, mr: 6, mt: 4,borderRadius:8, width:225}}>Submit</Button>            
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


export default AddTechnician;
