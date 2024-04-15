import React, { useState, useEffect, useContext } from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { mainListItems, secondaryListItems } from "../listItems";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MuiPhoneNumber from 'mui-phone-number';
import MenuItem from "@mui/material/MenuItem";
import SubmitAddDeviceModal from "../SubmitAddDeviceModalDeprecated";
import Copyright from "../Copyright";
import Select from "@mui/material/Select";
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
import AddTestModal from "../AddTestModal";
import MuiAlert from '@mui/material/Alert';
import InputMask from 'react-input-mask';
import FormattedInputs from "../PhoneMask";
import { states } from "../States.js"
import { LoginContext } from '../store/LoginContext';




const AddContact = ({clientId, clientName, handleLogout}) => {
    
    const lgnContext = useContext(LoginContext);
    
    const [device, setDevice] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = React.useState(true);
    const [companiesData, setCompaniesData] = useState([]);
    const [deviceTypesData, setDeviceTypesData] = useState([]);
    const [sizesData, setSizesData] = useState([]);
    const [manufacturersData, setManufacturersData] = useState([]);
    const [companyQueryName, setCompanyQueryName] = useState('')
    const [openSubmitModal, setOpenSubmitModal] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alert, setAlert] = useState(false);


    const handleOpenSubmitModal = () => setOpenSubmitModal(true);
    const handleCloseSubmitModal = () => setOpenSubmitModal(false);


    const [contactFormData, setContactFormData] = React.useState({
        companyName: "",
        lastName: "",
        firstName: "",
        emailAddress: "",
        jobTitle: "",
        businessPhone: "",
        homePhone: "",
        mobilePhone: "",
        faxNumber: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        notes: "",
    });


    const [companyNameIsValid, setCompanyNameIsValid] = useState(false)
    const [firstNameIsValid, setFirstNameIsValid] = useState(false)
    const [lastNameIsValid, setLastNameIsValid] = useState(false)
    const [jobTitleIsValid, setJobTitleIsValid] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [streetAddressIsValid, setStreetAddressIsValid] = useState(false)


    const [deviceTypeIsValid, setDeviceTypeIsValid] = useState(false)
    const [manufacturerIsValid, setManufacturerIsValid] = useState(false)
    const [modelNumberIsValid, setModelNumberIsValid] = useState(false)
    const [serialNumberIsValid, setSerialNumberIsValid] = useState(false)
    const [sizeIsValid, setSizeIsValid] = useState(false)
    const [conditionIsValid, setConditionIsValid] = useState(false)
    const [installedDateIsValid, setInstalledDateIsValid] = useState(false)
    const [locationNotesIsValid, setLocationNotesIsValid] = useState(false)
    const [cityIsValid, setCityIsValid] = useState(false)
    const [stateIsValid, setStateIsValid] = useState(false)
    const [postalCodeIsValid, setPostalCodeIsValid] = useState(false)



    const [businessPhoneIsValid, setBusinessPhoneIsValid] = useState(false)
    const [homePhoneIsValid, setHomePhoneIsValid] = useState(false)
    const [mobilePhoneIsValid, setMobilePhoneIsValid] = useState(false)
    const [faxIsValid, setFaxIsValid] = useState(false)
    const [zipIsValid, setZipIsValid] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)


    useEffect(()=> {      
      if (businessPhoneIsValid
        // && homePhoneIsValid
        // && mobilePhoneIsValid
        // && faxIsValid
        && zipIsValid
        && companyNameIsValid
        && firstNameIsValid
        && lastNameIsValid
        && jobTitleIsValid
        && emailIsValid
        && streetAddressIsValid
        && stateIsValid
        ) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false)
      }

    }, [businessPhoneIsValid,
      homePhoneIsValid,
      mobilePhoneIsValid,
      faxIsValid,
      zipIsValid,
      companyNameIsValid,
      firstNameIsValid,
      lastNameIsValid,
      jobTitleIsValid,
      emailIsValid,
      streetAddressIsValid,
      stateIsValid])



    function dynamicSort(property) {
        return function(a, b) {
            return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
     }
  

   const handleCompanyChange = e => { 
        setContactFormData({...contactFormData, companyName:e.target.value});
        setCompanyQueryName(e.target.value.replace(/ /g, '%20'));
        console.log('Query Name', companyQueryName)
   }
    
    
    //FETCH COMPANY CONTACT INFO
    useEffect(() => {
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${contactFormData.companyName.replace(/ /g, '%20')}/getcompanycontactinfo`)
        .then(response => response.json())
    },[contactFormData.companyName]);
    


    
     //FETCH COMPANY NAMES BY CLIENT ID
    useEffect(() => {
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/getcompanynames`).then(response => response.json())
        .then(data =>{setCompaniesData(data.data.sort(dynamicSort('CompanyName')))})
      }, []);



 


    const handleSubmit = (e) => {
      e.preventDefault();
      
      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/postcontact`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(contactFormData)
        })
        .then((response) => response.json())
        .then(response => {
          setAlertContent("Contact created successfully!");
          setAlert(true);
          handleOpenSubmitModal();})
        .then((result) => {
        console.log(result)
      })
      }








    const toggleDrawer = () => {
    setOpen(!open);
    };

    
    
    const [phoneNumber, setPhoneNumber] = useState({
      phone: null
    });


    function handlePhoneChange(value) {
      setPhoneNumber({
         phone: value
      });
      console.log("Phone number", phoneNumber)
   }

    


    

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
           {/* <Logout token={props.handleRemoveToken} /> */}
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
          Add a Contact
        </Typography>
        <Typography>* Denotes a required field</Typography>
        <Box
          align="left"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
          autoComplete="off"
        >


      <h3>Contact Company</h3>
          <Grid>

            <TextField
              error={contactFormData.companyName == ''}
              id="outlined-select-currency"
              select
              required
              style = {{width: 500}}
              label="Company Name"
              helperText="Select the company this contact is associated with"
              value={contactFormData.companyName}              
              //onChange={e => setContactFormData({...contactFormData, companyName: e.target.value})}

              onChange={e => { 
                setContactFormData({...contactFormData, companyName:e.target.value})
  
                let digitLength = e.target.value.toString().length
                if (e.target.value == "") {
                    setCompanyNameIsValid(false)
                    console.log(companyNameIsValid)
                } else {
                    setCompanyNameIsValid(true)
                    console.log(companyNameIsValid)
              }}}
            >
              {companiesData.map((option) => (
                <MenuItem key={option.CompanyID} value={option.CompanyName}>
                  {option.CompanyName}
                </MenuItem>
              ))}
            </TextField>   
          </Grid>
          <h3>Contact Info</h3>

          <Grid>
          </Grid>
          <Grid>
          <TextField
              error={contactFormData.firstName == ''}
              id="outlined-select-currency"
              label="First Name"
              required
              helperText="Type contact first name"
              value={contactFormData.firstName}
              //onChange={e => setContactFormData({...contactFormData, firstName:e.target.value})}
              onChange={e => { 
                setContactFormData({...contactFormData, firstName:e.target.value})
  
                //let digitLength = e.target.value.toString().length
                if (e.target.value == "") {
                    setFirstNameIsValid(false)
                    console.log(firstNameIsValid)
                } else {
                    setFirstNameIsValid(true)
                    console.log(firstNameIsValid)
              }}}
            >
          </TextField>
          <TextField
              error={contactFormData.lastName == ''}
              id="outlined-select-currency"
              label="Last Name"
              required
              helperText="Type contact last name"
              value={contactFormData.lastName}
              //onChange={e => setContactFormData({...contactFormData, lastName:e.target.value})}
              onChange={e => { 
                setContactFormData({...contactFormData, lastName:e.target.value})
  
                //let digitLength = e.target.value.toString().length
                if (e.target.value == "") {
                    setLastNameIsValid(false)
                    console.log(lastNameIsValid)
                } else {
                    setLastNameIsValid(true)
                    console.log(lastNameIsValid)
              }}}
            >
          </TextField>
          </Grid>
          <Grid>
          <TextField
              error={contactFormData.jobTitle == ''}
              id="outlined-select-currency"
              label="Job Title"
              required
              style = {{width: 550}}
              helperText="Type contact job title"
              value={contactFormData.jobTitle}
              //onChange={e => setContactFormData({...contactFormData, jobTitle:e.target.value})}
              onChange={e => { 
                setContactFormData({...contactFormData, jobTitle:e.target.value})
  
                //let digitLength = e.target.value.toString().length
                if (e.target.value == "") {
                    setJobTitleIsValid(false)
                    console.log(jobTitleIsValid)
                } else {
                    setJobTitleIsValid(true)
                    console.log(jobTitleIsValid)
              }}}
            >
          </TextField>
        </Grid>
          <Grid>
          <TextField
            error={contactFormData.emailAddress == ''}
            id="outlined-select-currency"
            label="Email Address"
            required
            helperText="Type contact email"
            value={contactFormData.emailAddress}
            //onChange={e => setContactFormData({...contactFormData, emailAddress:e.target.value})}
            onChange={e => { 
              setContactFormData({...contactFormData, emailAddress:e.target.value})
              if (e.target.value == "") {
                  setEmailIsValid(false)
                
              } else {
                  setEmailIsValid(true)
                 
            }}}
            >
          </TextField>


          
          
          {/* <InputMask mask="+4\9 99 999 99" maskChar=" " /> */}
          {/* <InputMask mask="999 999-9999" maskChar="_" /> */}
          {/* <FormattedInputs /> */}
          {/* <InputMask
            mask="(999) 999-9999"
            value={contactFormData.businessPhone}
            disabled={false}
            maskChar="-"
            onChange={e => setContactFormData({...contactFormData, businessPhone:e.target.value})}
          >
          {() => <TextField />}
          </InputMask> */}


          <InputMask
            mask="(999) 999-9999"
            value={contactFormData.businessPhone}
            disabled={false}
            maskChar=" "
            //onChange= {e => 
              //{setContactFormData({...contactFormData, businessPhone:e.target.value})}}
            onChange={e => { 
                setContactFormData({...contactFormData, businessPhone:e.target.value})
  
                let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
                if (digitLength < 10) {
                    setBusinessPhoneIsValid(false)
                } else {
                    setBusinessPhoneIsValid(true)
              }}}
            >
            {() => <TextField
              required
              error={contactFormData.businessPhone.toString().replace(/[^0-9]/g,"").length <10}
              helperText={contactFormData.businessPhone.toString().replace(/[^0-9]/g,"").length < 10 ? 'Business phone must be 10 digits' : ' '}
              id="outlined-select-currency"
              autoComplete='off'
              inputProps={{
                autoComplete: 'off'
             }}
              label="Business Phone"
              value={contactFormData.businessPhone}
            >
          </TextField>}
          </InputMask>


          <InputMask
            mask="(999) 999-9999"
            value={contactFormData.homePhone}
            disabled={false}
            maskChar=" "
            onChange={e => 
              {setContactFormData({...contactFormData, homePhone:e.target.value})
              console.log('Home phone', contactFormData.homePhone.toString().replace(/[^0-9]/g,"").length)

              let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
              if (digitLength < 10) {
                  setHomePhoneIsValid(false)
              } else {
                  setHomePhoneIsValid(true)
            }}}
            >
            {() => <TextField
              //required
              //error={contactFormData.homePhone.toString().replace(/[^0-9]/g,"").length <10}
              helperText={contactFormData.homePhone.toString().replace(/[^0-9]/g,"").length < 10 ? 'Home phone must be 10 digits' : ' '}
              id="outlined-select-currency"
              label="Home Phone"
              value={contactFormData.homePhone}
            >
          </TextField>}
          </InputMask>
          </Grid>
          <Grid>
          
          <InputMask
            mask="(999) 999-9999"
            //required
            value={contactFormData.mobilePhone}
            disabled={false}
            maskChar=" "
            onChange={e => 
              {setContactFormData({...contactFormData, mobilePhone:e.target.value})
              console.log('Mobile phone', contactFormData.mobilePhone.toString().replace(/[^0-9]/g,"").length)

              let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
              if (digitLength < 10) {
                  setMobilePhoneIsValid(false)
              } else {
                  setMobilePhoneIsValid(true)
            }}}
            >
            {() => <TextField
              //error={contactFormData.mobilePhone.toString().replace(/[^0-9]/g,"").length <10}
              helperText={contactFormData.mobilePhone.toString().replace(/[^0-9]/g,"").length < 10 ? 'Mobile phone must be 10 digits' : ' '}
              id="outlined-select-currency"
              label="Mobile Phone"
              value={contactFormData.mobilePhone}
            >
          </TextField>}
          </InputMask>
          
      


          <InputMask
            mask="(999) 999-9999"
            value={contactFormData.faxNumber}
            disabled={false}
            maskChar=" "
            //onChange={setContactFormData({...contactFormData, faxNumber:e.target.value})}
            onChange={e => 
              {
                setContactFormData({...contactFormData, faxNumber:e.target.value})
                
                let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
                if (digitLength < 10) {
                  setFaxIsValid(false)
                  //console.log("setting fax valid to false")
                } else {
                  setFaxIsValid(true)
                  //console.log('Setting fax valid to tru')
            }}}
          >
            {() => <TextField
            //error={faxIsValid}
            //error={contactFormData.faxNumber.toString().replace(/[^0-9]/g,"").length <10}
            helperText={contactFormData.faxNumber.toString().replace(/[^0-9]/g,"").length < 10 ? 'Fax must be 10 digits' : ' '}
            id="outlined-select-currency"
            label="Fax Number"
            value={contactFormData.faxNumber}
            >
          </TextField>}
          </InputMask>




          {/* <TextField
            id="outlined-select-currency"
            label="Fax Number"
            helperText="Type fax number"
            value={contactFormData.faxNumber}
            onChange={e => setContactFormData({...contactFormData, faxNumber:e.target.value})}
            >
          </TextField> */}
          </Grid>

          <h3>Contact Address</h3>
          <Grid>
          <TextField
            error={contactFormData.streetAddress == ''}
            id="outlined-select-currency"
            label="Street Address"
            required
            helperText="eg 102 S Main St"
            value={contactFormData.streetAddress}
            //onChange={e => setContactFormData({...contactFormData, streetAddress:e.target.value})}
            onChange={e => { 
              setContactFormData({...contactFormData, streetAddress:e.target.value})
              if (e.target.value == "") {
                  setStreetAddressIsValid(false)
                
              } else {
                  setStreetAddressIsValid(true)
                 
            }}}
            >
          </TextField>
          <TextField
            error={contactFormData.city == ''}
            id="outlined-select-currency"
            label="City"
            required
            helperText="eg Houston"
            value={contactFormData.city}
            //onChange={e => setContactFormData({...contactFormData, city:e.target.value})}
            onChange={e => { 
              setContactFormData({...contactFormData, city:e.target.value})
              if (e.target.value == "") {
                  setCityIsValid(false)
                
              } else {
                setCityIsValid(true)
                 
            }}}
            >
          </TextField>
          </Grid>
          <Grid>


          <TextField
              error={contactFormData.state == ''}
              id="outlined-select-currency"
              select
              required
              //style = {{width: 260}}
              label="State"
              helperText="Select the state this contact is associated with"
              value={contactFormData.state}              
              //onChange={e => setContactFormData({...contactFormData, state: e.target.value})}
              onChange={e => { 
                setContactFormData({...contactFormData, state:e.target.value})
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





          {/* <InputMask
              mask="aa"
              value={contactFormData.state}
              disabled={false}
              maskChar=" "
              onChange={e => setContactFormData({...contactFormData, state:e.target.value})}
              >
              {() => <TextField
                style = {{width: 260}}
                required
                label="State"
                helperText="Type state"
                value={contactFormData.state}
                >
            </TextField>}
          </InputMask> */}



          {/* <TextField
            id="outlined-select-currency"
            label="State"
            required
            helperText="eg TX"
            value={contactFormData.state}
            onChange={e => setContactFormData({...contactFormData, state:e.target.value})}
            >
          </TextField> */}

          <InputMask
              mask="99999-9999"
              value={contactFormData.postalCode}
              disabled={false}
              maskChar=" "
              //onChange={e => setContactFormData({...contactFormData, postalCode:e.target.value})}
              onChange={e => 
                {
                  setContactFormData({...contactFormData, postalCode:e.target.value})
                  
                  let digitLength = e.target.value.toString().replace(/[^0-9]/g,"").length
                  if (digitLength < 5) {
                    setZipIsValid(false)
                  }
                  else if (digitLength > 5 && digitLength < 9) {
                    setZipIsValid(false);

                  } else {
                    setZipIsValid(true);
                    //console.log('Setting fax valid to tru')
              }}}
              >
              {() => <TextField
                error={contactFormData.postalCode.toString().replace(/[^0-9]/g,"").length < 5 || contactFormData.postalCode.toString().replace(/[^0-9]/g,"").length > 5 && contactFormData.postalCode.toString().replace(/[^0-9]/g,"").length < 9}
                helperText={contactFormData.postalCode.toString().replace(/[^0-9]/g,"").length < 5 || contactFormData.postalCode.toString().replace(/[^0-9]/g,"").length > 5 && contactFormData.postalCode.toString().replace(/[^0-9]/g,"").length < 9 ? 'Postal code must be either 5 or 9 digits' : ' '}
                id="outlined-select-currency"
                //style = {{width: 275}}
                required
                label="Postal Code"
                //helperText="Type 5-digit postal code e.g. 12345"
                value={contactFormData.postalCode}
            >
            </TextField>}
          </InputMask>



          {/* <TextField
            id="outlined-select-currency"
            label="Zip Code"
            required
            helperText="eg 55555"
            value={contactFormData.postalCode}
            onChange={e => setContactFormData({...contactFormData, postalCode:e.target.value})}
            >
          </TextField> */}
          </Grid>

          




        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker label="Installed Date"
                onChange={(date) => {
                    setContactFormData({...contactFormData, installedDate:date.format('YYYY-MM-DD')})}}
                  />
            </DemoContainer>
        </LocalizationProvider> */}

          




          <Box>
            {/* <SubmitAddDeviceModal /> */}

            <AddTestModal submitTestFileAndData={handleSubmit} openStatus={openSubmitModal} handleModalClose={handleCloseSubmitModal} alertContentText={alertContent}/>
            <Button 
            disabled={formIsValid ? false:true}
            size="large"
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ml:1, mr: 6, mt: 2,mb: 2,borderRadius:8, width:225}}>
            
              Submit
            </Button> 
            <Button size="large" href="/" variant="contained" sx={{ml:1, mr: 6, mt: 2,mb: 2,borderRadius:8, width:225}} color="error">
              Cancel
            </Button>
            {/* <AddTestModal submitTestFileAndData={handleSubmit} openStatus={openSubmitModal} handleModalClose={handleCloseSubmitModal} alertContentText={alertContent}/>
            <Button type="submit" size="large" variant="contained" color="success" sx = {{ mr: 6, mt: 4, mb:4}}>
              Submit
            </Button> 
            <Button size="large" href="/" variant="contained" sx = {{ mt: 4, mb:4}}color="error">
              Cancel
            </Button> */}
          </Box>
        </Box>
      </Container>

        <Copyright />
    </Box>
  );
};


export default AddContact;
