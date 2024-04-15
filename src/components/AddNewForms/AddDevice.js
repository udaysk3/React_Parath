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
import NewManufacturerModal from "../AddNewModals/NewManufacturerModal";
import NewSizeModal from "../AddNewModals/NewSizeModal";
import NewDeviceTypeModal from "../AddNewModals/NewDeviceTypeModal";
import FloTraceLogo from "../FloTraceLogo";
import AddDeviceModal from "../SubmitAddDeviceModal";
import MuiAlert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import NoContactFoundModal from "../NoContactFound";
import axios from "axios";
import InputMask from 'react-input-mask';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { states } from '../States';



const AddDevice = ({clientId, clientName, handleLogout}) => {

    const [open, setOpen] = useState(true);
    const [companiesData, setCompaniesData] = useState([]);
    const [deviceTypesData, setDeviceTypesData] = useState([]);
    const [sizesData, setSizesData] = useState([]);
    const [manufacturersData, setManufacturersData] = useState([]);
    const [companyQueryName, setCompanyQueryName] = useState('')
    const [openSubmitModal, setOpenSubmitModal] = useState(false);
    const handleOpenSubmitModal = () => setOpenSubmitModal(true);
    const handleCloseSubmitModal = () => setOpenSubmitModal(false);
    const [alertContent, setAlertContent] = useState('');
    const [alert, setAlert] = useState(false);

    const [contactFirstName, setContactFirstName] = useState('');
    const [contactLastName, setContactLastName] = useState('');
    const [contactEmailAddress, setContactEmailAddress] = useState('');
    const [contactJobTitle, setContactJobTitle] = useState('');
    const [contactStreetAddress, setContactStreetAddress] = useState('');
    const [contactCity, setContactCity] = useState('');
    const [contactState, setContactState] = useState('');
    const [contactZip, setContactZip] = useState('');
    const [formData, setFormData] = useState({
        deviceType: "",
        manufacturer: "",
        modelNumber: "",
        serialNumber: "",
        size: "",
        condition: "",
        installedDate: "",
        companyName: "",
        location: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        comments: "",
        contactFirstName: "",
        contactLastName: "",
        contactJobTitle: "",
        contactEmailAddress: "",
        latitude:"",
        longitude:""
    });

    const [newManufacturerTypeModalIsOpen, setNewManufacturerTypeModalIsOpen] = useState(false);
    const handleOpenSubmitModalManufacturer = () => setNewManufacturerTypeModalIsOpen(true);
    const handleCloseSubmitModalManufacturer = () => setNewManufacturerTypeModalIsOpen(false);

    const [newSizeModalIsOpen, setNewSizeModalIsOpen] = useState(false);
    const handleOpenSubmitModalSize = () => setNewSizeModalIsOpen(true);
    const handleCloseSubmitModalSize = () => setNewSizeModalIsOpen(false);

    const [newDeviceTypeModalIsOpen, setNewDeviceTypeModalIsOpen] = useState(false);
    const handleOpenSubmitModalDevice = () => setNewDeviceTypeModalIsOpen(true);
    const handleCloseSubmitModalDevice = () => setNewDeviceTypeModalIsOpen(false);
    
    const [noContactFoundModal, setNoContactFoundModal] = useState(false);
    const handleNoContactFoundModalOpen = () => setNoContactFoundModal(true);
    const handleNoContactFoundModalClose = () => setNoContactFoundModal(false);

    // const [zipIsValid, setZipIsValid] = useState(false)



    const [companyNameIsValid, setCompanyNameIsValid] = useState(false)

    const [deviceTypeIsValid, setDeviceTypeIsValid] = useState(false)
    const [manufacturerIsValid, setManufacturerIsValid] = useState(false)
    const [modelNumberIsValid, setModelNumberIsValid] = useState(false)
    const [serialNumberIsValid, setSerialNumberIsValid] = useState(false)
    const [sizeIsValid, setSizeIsValid] = useState(false)
    const [conditionIsValid, setConditionIsValid] = useState(false)
    const [installedDateIsValid, setInstalledDateIsValid] = useState(false)
    const [locationIsValid, setLocationIsValid] = useState(false)
    const [addressLineOneIsValid, setAddressLineOneIsValid] = useState(false)
    const [addressLineTwoIsValid, setAddressLineTwoIsValid] = useState(false)
    const [cityIsValid, setCityIsValid] = useState(false)
    const [stateIsValid, setStateIsValid] = useState(false)
    const [postalCodeIsValid, setPostalCodeIsValid] = useState(false)
    const [latitudeIsValid, setLatitudeIsValid] = useState(false)
    const [longitudeIsValid, setLongitudeIsValid] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)


    useEffect(()=> {      
      if (
        companyNameIsValid
        && deviceTypeIsValid
        && manufacturerIsValid
        && modelNumberIsValid
        && serialNumberIsValid
        && sizeIsValid
        && conditionIsValid
        && locationIsValid
        && addressLineOneIsValid
        && cityIsValid
        && stateIsValid
        && postalCodeIsValid
        
        
        ) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false)
      }

    }, [
      companyNameIsValid,
      deviceTypeIsValid,
      manufacturerIsValid,
      modelNumberIsValid,
      serialNumberIsValid,
      sizeIsValid,
      conditionIsValid,
      locationIsValid,
      addressLineOneIsValid,
      addressLineTwoIsValid,
      cityIsValid,
      stateIsValid,
      postalCodeIsValid
    ])



    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function dynamicSort(property) {
        return function(a, b) {
            return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
     }
  
  const handleNewManufacturerValue = (value) => {
    setManufacturersData([...manufacturersData, {ID:manufacturersData.length + 1, Manufacturer:value}]);
    console.log('New Manf value', manufacturersData)
  }

  const handleNewSizeValue = (value) => {
    setSizesData([...sizesData, {ID:sizesData.length + 1, Size:value}]);
    console.log('New Size value', sizesData)
  }

  const handleNewDeviceTypeValue = (value) => {
    setDeviceTypesData([...deviceTypesData, {ID:deviceTypesData.length + 1, DeviceType:value}]);
    console.log('New device type value', deviceTypesData)
  }


   const handleCompanyChange = e => { 
        setFormData({...formData, companyName:e.target.value});
        setCompanyQueryName(e.target.value.replace(/ /g, '%20'));
        console.log('Query Name', companyQueryName)
   }
    
    
  //DYNAMICALLY FETCH COMPANY CONTACT INFO WHEN FORMDATA CHANGES
    useEffect(() => {
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${formData.companyName.replace(/ /g, '%20')}/getcompanycontactinfo`)
        .then(response => response.json())
        .then(data => {
          if (data.data == "No contact found") {
            handleNoContactFoundModalOpen();
          }
          else {
            setContactFirstName(data.data.FirstName);
            setContactLastName(data.data.LastName);
            setContactEmailAddress(data.data.EmailAddress);
            setContactJobTitle(data.data.JobTitle);
            setContactStreetAddress(data.data.StreetAddress)
            setContactCity(data.data.City)
            setContactState(data.data.State)
            setContactZip(data.data.PostalCode)
          }
        })
    },[formData.companyName]);
    

    
    // FETCH COMPANY NAMES BY CLIENT ID
    useEffect(() => {
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/getcompanynames`)
        .then(response => response.json())
        .then(data =>{setCompaniesData(data.data.sort(dynamicSort('CompanyName')))})
      }, []);


    // FETCH DEVICE TYPES BY CLIENT ID
    useEffect(() => {
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/getdevicetypes`)
        .then(response => response.json())
        .then(data =>{setDeviceTypesData(data.data.sort(dynamicSort('DeviceType')))})
      }, []);


    // FETCH SIZES BY CLIENT ID
      useEffect(() => {
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/getdevicesizes`)
        .then(response => response.json())
        .then(data =>{setSizesData(data.data.sort(dynamicSort('Size')))})
        }, []); 
      

    // FETCH MANUFACTURERS BY CLIENT ID
      useEffect(() => {
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/getmanufacturers`)
        .then(response => response.json())
        .then(data =>{setManufacturersData(data.data.sort(dynamicSort('Manufacturer')))})
        }, []);



    // Add New Device Type Modal
      useEffect(() => {
        if (formData.manufacturer==="*Add New") {
          setNewManufacturerTypeModalIsOpen(true);
          //console.log('Form data device type is Add new!', formData.manufacturer, newManufacturerTypeModalIsOpen)
        }
        }, [formData.manufacturer]);


      useEffect(() => {
        if (formData.size==="*Add New") {
          setNewSizeModalIsOpen(true);
      }
      }, [formData.size]);



      useEffect(() => {
        if (formData.deviceType==="*Add New") {
          setNewDeviceTypeModalIsOpen(true);
      }
      }, [formData.deviceType]);



      const handleSubmit = (e) => {
        e.preventDefault();
    
      axios
        .post(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/postdevice`, JSON.stringify(formData), {
          headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin':"*"
          },
        })
        .then(response => {
          if(response.status === 200)
            {
              console.log(response)
              setAlertContent("Device created successfully!");
              setAlert(true);
              handleOpenSubmitModal();
              console.log(response.data.success)
            }
          else
            {
              console.log("Response recieved", response)
              setAlertContent("Error creating device");
              setAlert(true);
              handleOpenSubmitModal();
              console.log(response.data.success)
            }
          }).catch(error=>{
            //alert(error)
          }).then(console.log(JSON.stringify(formData)))
        }
    

    const toggleDrawer = () => {
      setOpen(!open);
    };

    

    const deviceTypes = [
    {
        value: 1,
        label: "RP",
    },
    {
        value: 2,
        label: "DCV",
    },
    {
        value: 3,
        label: "PVB",
    },
    {
        value: 4,
        label: "DCD",
    },
    {
        value: 5,
        label: "Add New",
    },
    ];



    const conditionTypes = [
    {
        value: 1,
        label: "New",
    },
    {
        value: 2,
        label: "Moved",
    },
    {
        value: 3,
        label: "Decomissioned",
    },
    {
        value: 4,
        label: "Defective",
    },
    {
        value: 5,
        label: "Normal",
    },
    ];

    

  return (
    <Box sx={{ display: "flex" }}>
      <NoContactFoundModal open={noContactFoundModal} handleClose = {handleNoContactFoundModalClose}/>
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

    <NewManufacturerModal onSaveManufacturerName={handleNewManufacturerValue} handleModalClose={handleCloseSubmitModalManufacturer} openStatus={newManufacturerTypeModalIsOpen}/>
    <NewSizeModal onSaveSize={handleNewSizeValue} handleModalCloseSize={handleCloseSubmitModalSize} openStatusSize={newSizeModalIsOpen}/>
    <NewDeviceTypeModal onSaveDeviceType={handleNewDeviceTypeValue} handleModalCloseDevice={handleCloseSubmitModalDevice} openStatusDevice={newDeviceTypeModalIsOpen}/>

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
          Add a Device
        </Typography>
        <Typography>* Denotes a required field</Typography>
        <Box
          align="left"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >


<h3>Company and Contact Details</h3>
          <p>Select company below or <Link href="/addcompany">add a new one</Link></p>
          <Grid>
            <TextField
              error={formData.companyName == ''}
              id="outlined-select-currency"
              select
              required
              style = {{width: 500}}
              label="Company Name"
              helperText="Select company name to see contact info"
              value={formData.companyName}              
              //onChange={e => setFormData({...formData, companyName: e.target.value})}
              onChange={e => { 
                setFormData({...formData, companyName:e.target.value})
                if (e.target.value == "") {
                    setCompanyNameIsValid(false)
                } else {
                    setCompanyNameIsValid(true)
              }}}
            >
              {companiesData.map((option) => (
                <MenuItem key={option.CompanyID} value={option.CompanyName}>
                  {option.CompanyName}
                </MenuItem>
              ))}
            </TextField>

            <Typography>Company contact info: {formData.companyName}</Typography>
            {/* <p><Link href="/addcontact">Add a new contact</Link></p> */}


            
            <Grid>
              <Grid>
              <TextField
                id="outlined-select-currency"
                disabled
                helperText="Contact name"
                style = {{width: 375}}
                value={contactFirstName + ' ' + contactLastName}
                >
              </TextField>
            </Grid>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact Job Title"
              style = {{width: 375}}
              value={contactJobTitle}
              >
            </TextField>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact Email"
              value={contactEmailAddress}
              >
            </TextField>
            </Grid>            
            <Grid>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact Job Title"
              style = {{width: 375}}
              value={contactStreetAddress}
              >
            </TextField>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact City"
              value={contactCity}
              >
              </TextField>
              <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact State"
              value={contactState}
              >
            </TextField>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact Zipcode"
              value={contactZip}
              >
              </TextField>
              </Grid>

          </Grid>








          <h3>Device Details</h3>
          
          <Box component="form" onSubmit={handleSubmit}>
          <Grid container sx={{mt:4}} > 
              <TextField
                error={formData.deviceType == ''}
                id="outlined-select-currency"
                select
                label="Device Type"
                helperText="Select device type"
                required
                value={formData.deviceType}
                //onChange={e => setFormData({...formData, deviceType: e.target.value})}
                onChange={e => { 
                  setFormData({...formData, deviceType:e.target.value})
                  if (e.target.value == "") {
                      setDeviceTypeIsValid(false)
                  } else {
                      setDeviceTypeIsValid(true)
                }}}
              >
                {deviceTypesData.map((option) => (
                  <MenuItem key={option.ID} value={option.DeviceType}>
                    {option.DeviceType}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={formData.manufacturer == ''}
                id="outlined-select-currency"
                select
                label="Manufacturer"
                required
                helperText="Select manufacturer"
                //value={newEnteredManValue ? newEnteredManValue !== "" : formData.manufacturer}
                value={formData.manufacturer}
                //onChange={e => setFormData({...formData, manufacturer:e.target.value})}
                onChange={e => { 
                  setFormData({...formData, manufacturer:e.target.value})
                  if (e.target.value == "") {
                      setManufacturerIsValid(false)
                  } else {
                      setManufacturerIsValid(true)
                }}}
              >
                {manufacturersData.map((option) => (
                  <MenuItem key={option.ID} value={option.Manufacturer}>
                    {option.Manufacturer}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={formData.modelNumber == ''}
                id="outlined-select-currency"
                label="Model Number"
                required
                helperText="Type model number"
                value={formData.modelNumber}
                //onChange={e => setFormData({...formData, modelNumber:e.target.value})}
                onChange={e => { 
                  setFormData({...formData,  modelNumber:e.target.value})
                  if (e.target.value == "") {
                      setModelNumberIsValid(false)
                  } else {
                      setModelNumberIsValid(true)
                }}}
              >
                {deviceTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
          </Grid>

          <Grid>
            <TextField
              error={formData.serialNumber == ''}
              id="outlined-select-currency"
              label="Serial Number"
              required
              helperText="Type serial number"
              value={formData.serialNumber}
              //onChange={e => setFormData({...formData, serialNumber:e.target.value})}
              onChange={e => { 
                setFormData({...formData, serialNumber:e.target.value})
                if (e.target.value == "") {
                    setSerialNumberIsValid(false)
                } else {
                  setSerialNumberIsValid(true)
              }}}
            >
              {deviceTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              error={formData.size == ''}
              id="outlined-select-currency"
              select
              label="Size"
              required
              helperText="Select device size"
              value={formData.size}
              //onChange={e => setFormData({...formData, size: e.target.value})}
              onChange={e => { 
                setFormData({...formData, size:e.target.value})
                if (e.target.value == "") {
                    setSizeIsValid(false)
                } else {
                  setSizeIsValid(true)
              }}}
            >
              {sizesData.map((option) => (
                <MenuItem key={option.SizeID} value={option.Size}>
                  {option.Size}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              error={formData.condition == ''}
              id="outlined-select-currency"
              select
              required
              label="Condition"
              helperText="Select condition"
              value={formData.condition}
              //onChange={e => setFormData({...formData, condition: e.target.value})}
              onChange={e => { 
                setFormData({...formData, condition:e.target.value})
                if (e.target.value == "") {
                    setConditionIsValid(false)
                } else {
                  setConditionIsValid(true)
              }}}
            >
              {conditionTypes.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker label="Installed Date"
                onChange={(date) => {
                    setFormData({...formData, installedDate:date.format('YYYY-MM-DD')})}}
                slotProps={{
                      textField: {
                        required: true,
                        error: formData.installedDate == ''
                      },
                    }}
                  />
            </DemoContainer>
        </LocalizationProvider>
          {/* <h3>Company and Contact Details</h3>
          <p>Select company below or <Link href="/addcompany">add a new company</Link></p>
          <Grid>
            <TextField
              id="outlined-select-currency"
              select
              required
              style = {{width: 500}}
              label="Company Name"
              helperText="Select company name to see contact info"
              value={formData.companyName}              
              onChange={e => setFormData({...formData, companyName: e.target.value})}
            >
              {companiesData.map((option) => (
                <MenuItem key={option.CompanyID} value={option.CompanyName}>
                  {option.CompanyName}
                </MenuItem>
              ))}
            </TextField>
            
            <Grid>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact name"
              style = {{width: 200}}
              value={contactFirstName + ' ' + contactLastName}
              >
            </TextField>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact Job Title"
              style = {{width: 375}}
              value={contactJobTitle}
              >
            </TextField>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact Email"
              value={contactEmailAddress}
              >
            </TextField>
            </Grid>            
            <Grid>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact Job Title"
              style = {{width: 375}}
              value={contactStreetAddress}
              >
            </TextField>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact City"
              value={contactCity}
              >
              </TextField>
              <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact State"
              value={contactState}
              >
            </TextField>
            <TextField
              id="outlined-select-currency"
              disabled
              helperText="Contact Zipcode"
              value={contactZip}
              >
              </TextField>
              </Grid>

          </Grid> */}
          <h3>Device Location</h3>
          <Grid>
            <TextField
              error={formData.location == ''}
              id="outlined-select-currency"
              required
              label="Location Notes"
              helperText="Describe location - ex. 'Front lawn'"
              value={formData.location}
              //onChange={e => setFormData({...formData, location:e.target.value})}
              onChange={e => { 
                setFormData({...formData, location:e.target.value})
                if (e.target.value == "") {
                    setLocationIsValid(false)
                } else {
                  setLocationIsValid(true)
              }}}
            >
              {deviceTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              error={formData.addressLine1 == ''}
              id="outlined-select-currency"
              label="Address Line 1"
              required
              helperText="123 Main St"
              value={formData.addressLine1}
              //onChange={e => setFormData({...formData, addressLine1:e.target.value})}
              onChange={e => { 
                setFormData({...formData, addressLine1:e.target.value})
                if (e.target.value == "") {
                    setAddressLineOneIsValid(false)
                } else {
                  setAddressLineOneIsValid(true)
              }}}
            >
              {deviceTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              label="Address Line 2"
              helperText="Optional - ex. Apt 5 or UNIT 2"
              value={formData.addressLine2}
              onChange={e => setFormData({...formData, addressLine2:e.target.value})}
              // onChange={e => { 
              //   setFormData({...formData, addressLine2:e.target.value})
              //   if (e.target.value == "") {
              //       setAddressLineTwoIsValid(false)
              //   } else {
              //     setAddressLineTwoIsValid(true)
              // }}}
            >
              {deviceTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid>
            <TextField
              error={formData.city == ''}
              id="outlined-select-currency"
              label="City"
              required
              helperText="ex. Houston"
              value={formData.city}
              //onChange={e => setFormData({...formData, city:e.target.value})}
              onChange={e => { 
                setFormData({...formData, city:e.target.value})
                if (e.target.value == "") {
                    setCityIsValid(false)
                } else {
                  setCityIsValid(true)
              }}}
            >
              {deviceTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {/* <TextField
              id="outlined-select-currency"
              label="State"
              required
              helperText="ex. TX"
              value={formData.state}
              onChange={e => setFormData({...formData, state:e.target.value})}
            >
              {deviceTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}

            <TextField
              error={formData.state == ''}
              id="outlined-select-currency"
              select
              required
              //style = {{width: 260}}
              label="State"
              helperText="ex. TX"
              value={formData.state}              
              //onChange={e => setFormData({...formData, state: e.target.value})}
              onChange={e => { 
                setFormData({...formData, state:e.target.value})
                if (e.target.value == "") {
                    setStateIsValid(false)
                } else {
                  setStateIsValid(true)
              }}}
            >
              {states.map((option) => (
                <MenuItem key={option.id} value={option.state}>
                  {option.state}
                </MenuItem>
              ))}
            </TextField> 


          <InputMask
              mask="99999-9999"
              value={formData.zipCode}
              disabled={false}
              maskChar=" "
              onChange={e => 
                {
                  setFormData({...formData, zipCode:e.target.value})
                  
                  let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
                  if (digitLength < 5) {
                    setPostalCodeIsValid(false)
                  }
                  else if (digitLength > 5 && digitLength < 9) {
                    setPostalCodeIsValid(false);

                  } else {
                    setPostalCodeIsValid(true);
                    //console.log('Setting fax valid to tru')
              }}}
              >
              {() => <TextField
                //error={formData.zipCode.toString().replace(/[^0-9]/g,"").length <5}
                //helperText={formData.zipCode.toString().replace(/[^0-9]/g,"").length < 5 ? 'Postal code must be either 5 or 9 digits' : ' '}

                error={formData.zipCode.toString().replace(/[^0-9]/g,"").length < 5 || formData.zipCode.toString().replace(/[^0-9]/g,"").length > 5 && formData.zipCode.toString().replace(/[^0-9]/g,"").length < 9}
                helperText={formData.zipCode.toString().replace(/[^0-9]/g,"").length < 5 || formData.zipCode.toString().replace(/[^0-9]/g,"").length > 5 && formData.zipCode.toString().replace(/[^0-9]/g,"").length < 9 ? 'Postal code must be either 5 or 9 digits' : ' '}

                id="outlined-select-currency"
                //style = {{width: 275}}
                required
                label="Postal Code"
                //helperText="Type 5-digit postal code e.g. 12345"
                value={formData.zipCode}
            >
            </TextField>}
            </InputMask>

            </Grid>
            <Grid>

            <h3></h3>


            <InputMask
              mask="99.999999"
              value={formData.latitude}
              disabled={false}
              maskChar=" "
              onChange={e => 
                {
                  setFormData({...formData, latitude:e.target.value})
                  
                  let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
                  if (digitLength < 5) {
                    setLatitudeIsValid(false)
                  }
                  else if (digitLength > 5 && digitLength < 9) {
                    setLatitudeIsValid(false);

                  } else {
                    setLatitudeIsValid(true);
              }}}
              >
              {() => <TextField
                //error={formData.zipCode.toString().replace(/[^0-9]/g,"").length <5}
                //helperText={formData.zipCode.toString().replace(/[^0-9]/g,"").length < 5 ? 'Postal code must be either 5 or 9 digits' : ' '}

                //error={formData.zipCode.toString().replace(/[^0-9]/g,"").length < 5 || formData.zipCode.toString().replace(/[^0-9]/g,"").length > 5 && formData.zipCode.toString().replace(/[^0-9]/g,"").length < 9}
                //helperText={formData.zipCode.toString().replace(/[^0-9]/g,"").length < 5 || formData.zipCode.toString().replace(/[^0-9]/g,"").length > 5 && formData.zipCode.toString().replace(/[^0-9]/g,"").length < 9 ? 'Postal code must be either 5 or 9 digits' : ' '}

                id="outlined-select-currency"
                //style = {{width: 275}}
                //required
                label="Latitude"
                helperText="Enter atleast 2 decimal places"
                value={formData.latitude}
            >
            </TextField>}
            </InputMask>




            <InputMask
              mask="-99.999999"
              value={formData.longitude}
              disabled={false}
              maskChar=" "
              onChange={e => 
                {
                  setFormData({...formData, longitude:e.target.value})
                  
                  let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
                  if (digitLength < 5) {
                    setLongitudeIsValid(false)
                  }
                  else if (digitLength > 5 && digitLength < 9) {
                    setLongitudeIsValid(false);

                  } else {
                    setLongitudeIsValid(true);
              }}}
              >
              {() => <TextField
                //error={formData.zipCode.toString().replace(/[^0-9]/g,"").length <5}
                //helperText={formData.zipCode.toString().replace(/[^0-9]/g,"").length < 5 ? 'Postal code must be either 5 or 9 digits' : ' '}

                //error={formData.zipCode.toString().replace(/[^0-9]/g,"").length < 5 || formData.zipCode.toString().replace(/[^0-9]/g,"").length > 5 && formData.zipCode.toString().replace(/[^0-9]/g,"").length < 9}
                //helperText={formData.zipCode.toString().replace(/[^0-9]/g,"").length < 5 || formData.zipCode.toString().replace(/[^0-9]/g,"").length > 5 && formData.zipCode.toString().replace(/[^0-9]/g,"").length < 9 ? 'Postal code must be either 5 or 9 digits' : ' '}

                id="outlined-select-currency"
                //style = {{width: 275}}
                //required
                label="Longitude"
                helperText="Enter atleast 2 decimal places"
                value={formData.longitude}
            >
            </TextField>}
            </InputMask>






            




            {/* <InputMask
              mask="99999"
              value={formData.zipCode}
              disabled={false}
              maskChar=" "
              onChange={e => setFormData({...formData, zipCode:e.target.value})}
              >
              {() => <TextField
                id="outlined-select-currency"
                style = {{width: 275}}
                required
                label="Postal Code"
                helperText="Type 5-digit postal code e.g. 12345"
                value={formData.zipCode}
            >
            </TextField>}
          </InputMask> */}




            {/* <TextField
              id="outlined-select-currency"
              label="Zip Code"
              required
              helperText="ex. 54321"
              value={formData.zipCode}
              onChange={e => setFormData({...formData, zipCode:e.target.value})}
            >
              {deviceTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
          </Grid>
          <h3>Additional Comments</h3>
          <TextField 
            id="outlined-select-currency"
            label="Comments"
            style = {{width: 900}}
            value={formData.comments}
            onChange={e => setFormData({...formData, comments:e.target.value})}
            >
            {deviceTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box>
            {/* <SubmitAddDeviceModal /> */}
            {/* sx = {{ mr: 6, mt: 4, mb:4}} */}
            {/* <AddTestModal submitTestFileAndData={handleSubmit} openStatus={openSubmitModal} handleModalClose={handleCloseSubmitModal} alertContentText={alertContent}/> */}

            <AddDeviceModal submitTestFileAndData={handleSubmit} openStatus={openSubmitModal} handleModalClose={handleCloseSubmitModal} alertContentText={alertContent}/>
            <Button disabled={formIsValid ? false:true} type="submit" size="large" sx={{ml:1, mr: 6, mt: 4,borderRadius:8, width:225}} variant="contained" color="success">
              Submit
            </Button>
            <Button size="large" href="/" variant="contained" sx={{ml:1, mr: 6, mt: 4,borderRadius:8, width:225}} color="error">
              Cancel
            </Button> 
          </Box>
        </Box>
        </Box>
        <FloTraceLogo style={{mt: 2, height:"200px", width:"200px"}}/>
        <Copyright />
      </Container>
        <Copyright />
    </Box>
  );
};


export default AddDevice;
