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
import UploadTest from "../UploadTest";
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import AddTestModal from "../AddTestModal";
import Link from '@mui/material/Link';
import FloTraceLogo from "../FloTraceLogo";
import NoDeviceFoundModal from "../NoDeviceFoundModal";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { dateCalendarClasses } from "@mui/x-date-pickers";

const AddTest= ({clientId, clientName, handleLogout}) => {
    
    const [open, setOpen] = useState(true);
    const [companiesData, setCompaniesData] = useState([]);
    const [techniciansData, setTechniciansData] = useState([]);
    const [companyDevicesData, setCompanyDevicesData] = useState([]);
    const [testFiles, setTestFiles] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState("")
    const [formData, setFormData] = useState({
      deviceLocation:"",
      deviceID:"",
      serialNumber:"",
      companyName:"",
      actualTestDate: "",
      gaugeCalibrationDate: "",
      testResult:"",
      technician:"",
      technicianID:""
    });
    const [deviceSerialNumbers, setDeviceSerialNumbers] = useState([]);
    const [deviceID, setDeviceID] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [openSubmitModal, setOpenSubmitModal] = useState(false);
    const [deviceScheduledTestDate, setDeviceScheduledTestDate] = useState("")
    
    const [selectedDeviceID, setSelectedDeviceID] = useState();
    const handleSelectedIDChange = (id) => setSelectedDeviceID(id)
    //const handleCloseSubmitModal = () => setOpenSubmitModal(false);




    const handleOpenSubmitModal = () => setOpenSubmitModal(true);
    const handleCloseSubmitModal = () => setOpenSubmitModal(false);


    const [noDeviceFoundModal, setnoDeviceFoundModal] = useState(false);
    const handleNoDeviceFoundModalOpen = () => setnoDeviceFoundModal(true);
    const handleNoDeviceFoundModalClose = () => setnoDeviceFoundModal(false);


    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const filename = file.name;
      setUploadedFileName(filename);
      setTestFiles(uploadFormData);
    }


    const dynamicSort = (property) => {
      return function(a, b) {
          return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      }
   }

// GET DEVICES
    useEffect(() => {
      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${formData.companyName.replace(/ /g, '%20')}/getcompanydevices`)
      .then(response => response.json())
      .then(data => {
          if (data.data.length > 0) {
            setCompanyDevicesData(data.data.sort(dynamicSort('Location')));
            console.log('Company devices data', data.data)
          }
          else {
            handleNoDeviceFoundModalOpen();
            }})
    }, [formData.companyName])


// GET COMPANY NAMES
    useEffect(() => {
      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/getcompanynames`).then(response => response.json())
      .then(data =>{setCompaniesData(data.data.sort(dynamicSort('CompanyName')))})
    }, []);


// GET TECHNICNANS
useEffect(() => {
  fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/gettechnicians`).then(response => response.json())
  .then(data =>{setTechniciansData(data.data.sort(dynamicSort('Technician')))})
}, []);


// GET TECHNICNANS
// useEffect(() => {

//   if (formData.technician !== "") {
//     let filteredTechData = techniciansData.filter((row) => row.Technician==formData.technician);
    
//     setFormData({...formData, technicianID: filteredTechData[0].TechID})

//     console.log("FORM DATA", formData)
//   } else {
    
//   }




// }, [formData.technician]);


// GET DEVICE SERIAL NUMBER
  // useEffect(() => {
  //   fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/${formData.companyName.replace(/ /g, '%20')}/${formData.deviceLocation.replace(/ /g, '%20')}/identifydeviceserialnumber`)
  //   .then(response => response.json())
  //   .then(data => {
  //       setDeviceSerialNumbers(data.data)
  //   })
  //   },[formData.deviceLocation]);


// // GET DEVICE SERIAL NUMBER
// useEffect(() => {
//   fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/${formData.companyName.replace(/ /g, '%20')}/${formData.deviceID}/identifydeviceserialnumber2`)
//   .then(response => response.json())
//   .then(data => {
//       setDeviceSerialNumbers(data.data)
//   })
//   },[formData.deviceLocation]);






// GET DEVICE ID FOR SINGLE DEVICE
    // useEffect(() => {
    //   fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/${formData.companyName.replace(/ /g, '%20')}/${formData.deviceLocation.replace(/ /g, '%20')}/${formData.serialNumber.replace(/ /g, '%20')}/identifydeviceid`)
    //   .then(response => response.json())
    //   .then(data => {
    //       setDeviceID(data.data);
    //       setFormData({...formData, deviceID:data.data});
    //   })
    //   },[formData.serialNumber]);



// GET SCHEDULED TEST DATE FOR SINGLE DEVICE
// useEffect(() => {
//   fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/${formData.deviceID}/getdevicescheduledtestdate`)
//   .then(response => response.json())
//   .then(data => {setDeviceScheduledTestDate(data.data[0].NewSchTestDate)})
//   },[formData.deviceLocation]);

  // useEffect(() => {
  //   fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/${selectedDeviceID}/getdevicescheduledtestdate`)
  //   .then(response => response.json())
  //   .then(data => {setDeviceScheduledTestDate(data.data[0].NewSchTestDate)})
  //   },[formData.deviceLocation]);

  

  useEffect(() => {
      console.log('FORM DATa', formData)
    },[formData]);

// Handle getting scheduled test date
   useEffect(() => {
      const filteredDeviceData = companyDevicesData.filter((row) => formData.deviceLocation === row.Location)[0]
      
      if (filteredDeviceData !== undefined) {
        setSelectedDeviceID(filteredDeviceData.DeviceID);
        setFormData({...formData, deviceID:filteredDeviceData.DeviceID});
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${filteredDeviceData.DeviceID}/getdevicescheduledtestdate`)
          .then(response => response.json())
          //.then(data => console.log('RESPONSE', data))

          .then(data => {
            console.log('RESPONSE', data);
            setDeviceScheduledTestDate(data.data[0].NewSchTestDate)})
          
      }
      else {}

    },[formData.deviceLocation]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const action = "Test results added"

    axios
      .post(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${clientName}/${formData.deviceID}/${uploadedFileName.replace(/ /g, '%20')}/${action.replace(/ /g, '%20')}/uploadfile`, testFiles, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      .then(response => {
        if(response.data.success === "success")
          {
            setAlertContent("Test results uploaded successfully!");
            setAlert(true);
            handleOpenSubmitModal();
          }
        else
          {
            setAlertContent("Error uploading file");
            setAlert(true);
            handleOpenSubmitModal();
          }
       }).catch(error=>{
          //alert(error)
       })

  // Send the Add a Test formdata to the filestore via the post test route

      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/posttest`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((result) => {
        console.log(result)
      })
    }



    const toggleDrawer = () => {
      setOpen(!open);
    };



    const statusTypes = [
      {
          value: 1,
          label: "Pass",
      },
      {
          value: 2,
          label: "Fail",
      },
      ];


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
           {/* <Logout token={handleLogout} /> */}
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

      <NoDeviceFoundModal open={noDeviceFoundModal} handleClose={handleNoDeviceFoundModalClose}/>
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
          Add a Test
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
          <h3>Device Details</h3>
          <p>Select a device below or <Link href="/adddevice">add a new device</Link></p>

          <Box component="form" onSubmit={handleSubmit}>
          <Grid sx={{mt:2}} >            
            <TextField
              error={formData.companyName == ''}
              id="outlined-select-currency"
              select
              required
              style = {{width: 550}}
              label="Company Name"
              helperText="Select company first"
              value={formData.companyName}
              onChange={e => setFormData({...formData, companyName:e.target.value})}
            >
              {companiesData.map((option) => (
                <MenuItem key={option.CompanyID} value={option.CompanyName}>
                  {option.CompanyName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid sx={{mt:2}}>
            <TextField
                error={formData.deviceLocation == ''}
                id="outlined-select-currency"
                select
                required
                style = {{width: 550}}
                label="Device"
                helperText="Select a device"
                value={formData.deviceLocation}              
                onChange={e => setFormData({...formData, deviceLocation: e.target.value})}
                // onChange={e => setSelectedDeviceID(companyDevicesData.filter((row) => e.target.value.has(row.deviceLocation)))}
              >
                {companyDevicesData.map((option) => (
                  <MenuItem key={option.DeviceID} value={option.Location}>
                    {option.Location}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid sx={{mt:2}}>
             {/* <TextField
              id="outlined-select-currency"
              label="Device Serial Number"
              required
              helperText="Select Serial Number"
              select
              value={formData.serialNumber}
              onChange={e => setFormData({...formData, serialNumber: e.target.value})}
            >
              {deviceSerialNumbers.map((option) => (
                <MenuItem key={option.DeviceID} value={option.SerialNumber}>
                  {option.SerialNumber}
                </MenuItem>
              ))}
            </TextField> */}
            <Typography>Test date info: {formData.serialNumber}</Typography>

            <TextField
              id="outlined-select-currency"
              label="Scheduled Test Date"
              helperText="Select a device to see scheduled test date."
              style = {{width: 325}}
              disabled
              value={deviceScheduledTestDate}
              >
            </TextField>


            <h3>Technician</h3>
          <p>Select technician below or <Link href="/addtechnician">add a new technician</Link></p>
          <Grid>
          <TextField
              error={formData.technician == ''}
              id="outlined-select-currency"
              select
              required
              style = {{width: 550}}
              label="Technician"
              helperText="Select the certified technician who performed the test"
              value={formData.technician}
              onChange = {e => {
                let filteredTechData = techniciansData.filter((row) => row.Technician===e.target.value);
    
                setFormData({...formData, technician: e.target.value, technicianID: filteredTechData[0].TechID});

                
                //setFormData({...formData, technicianID: filteredTechData[0].TechID})
              }}
              // onChange={e => {
              //   let filteredTechs = techniciansData.filter((row) => row.Technician==e.target.value);
              //   console.log('filtered technician id data', filteredTechs)
              //   setFormData({...formData, technician: filteredTechs.id})
              // }}
            >
              {techniciansData.map((option) => (
                <MenuItem key={option.TechnicianID} value={option.Technician}>
                  {option.Technician}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

            <h3>Dates</h3>
            {/* <p>The scheduled test date for this device:</p> */}


          <Grid>
          {/* <Grid item xs={2}> */}
           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  helperText="Select originally scheduled test date"
                  required
                  label="Actual Test Date" 
                  // onChange={(date) => {
                  //   setFormData({...formData, actualTestDate:date.format('YYYY-MM-DD')})}}
                  //   //.toISOString()

                  onChange={(date) => {
                      if (date && date.format('YYYY-MM-DD')) {
                        setFormData({...formData, actualTestDate: date.format('YYYY-MM-DD')})
                      }
                      else {
                        setFormData({...formData, actualTestDate: '2000-01-01'})}}
  
                      }
                  slotProps={{
                      textField: {
                        required: true,
                        error: formData.actualTestDate === ''
                      },
                    }}
                  />
            </DemoContainer>
           </LocalizationProvider>
           {/* </Grid> */}
           <Grid item xs={4}>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  helperText="Select date gauge was calibrated"
                  required
                  label="Gauge Calibration Date" 
                  onChange={(date) => {
                    if (date && date.format('YYYY-MM-DD')) {
                      setFormData({...formData, gaugeCalibrationDate: date.format('YYYY-MM-DD')})
                    }
                    else {
                      setFormData({...formData, gaugeCalibrationDate: '2000-01-01'})}}

                    }


                  //.toISOString()
                    slotProps={{
                      textField: {
                        required: true,
                        error: formData.gaugeCalibrationDate === ''
                      },
                    }}
                  />
            </DemoContainer>
           </LocalizationProvider>
           </Grid>
          </Grid>

          



          <h3>Result</h3>
          <Grid sx={{mt:4}}>
            <TextField
                error={formData.testResult === ''}
                sx={{mt:8}}
                id="outlined-select-currency"
                select
                label="Result"
                helperText="Select pass/fail"
                required
                defaultValue="Pass"
                value={formData.testResult}
                onChange={e => setFormData({...formData, testResult: e.target.value})}
              >
                {statusTypes.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>
              </Grid>

          <h3>Upload Test Result</h3>
          <Typography>Files must be in PDF or DOCX format</Typography>
          <Box sx={{ display:'inline-flex' }}>
            <UploadTest onUploadTestFile={handleFileUpload}/>
            <p>{uploadedFileName}</p>
          </Box>
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


export default AddTest;
