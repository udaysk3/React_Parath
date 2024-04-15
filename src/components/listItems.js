import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import AddTest from '../img/add-test.svg';
import AddTechnician from '../img/add-technician.svg';
import AddDevice from '../img/add-device.svg';
import AddContact from '../img/add-contact.svg';
import AddCompany from '../img/add-company.svg';
import Map from '../img/map.svg';
import Technicians from '../img/technician.svg';
import Devices from '../img/device.svg';
import Contacts from '../img/contact.svg';



//href="/"
export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      {/* <Link to="/" /> */}
      <ListItemIcon>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            mt: 0,
            ml: 0,
          }}
          alt="Devices SVG"
          src={Devices}
        />
      </ListItemIcon>
      <ListItemText primary="Devices" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <GasMeterIcon />
      </ListItemIcon>
      <ListItemText primary="Devices" />
    </ListItemButton> */}
    {/* <ListItemButton>
      <ListItemIcon>
        <EmailIcon /> 
      </ListItemIcon>
      <ListItemText primary="Letters" />
    </ListItemButton> */}
    <ListItemButton component={Link} to="/technicians">
      <ListItemIcon>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            mt: 0,
            ml: 0,
          }}
          alt="Technicians SVG"
          src={Technicians}
        />
      </ListItemIcon>
      <ListItemText primary="Technicians" />
    </ListItemButton>
    <ListItemButton component={Link} to="/contacts">
      <ListItemIcon>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            mt: 0,
            ml: 0,
          }}
          alt="Contacts SVG"
          src={Contacts}
        />
      </ListItemIcon>
      <ListItemText primary="Contacts" />
    </ListItemButton>
    <ListItemButton component={Link} to="/map">
      <ListItemIcon>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            mt: 0,
            ml: 0,
          }}
          alt="Map SVG"
          src={Map}
        />
      </ListItemIcon>
      <ListItemText primary="Map" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment >
    <ListSubheader component="div" inset sx={{
      backgroundColor: '#e9e9e9',
      fontSize: '20px',
      fontWeight: '700',
      alignSelf: 'flex-start',
      justifySelf: 'flex-start'
  }}>
      Add New
    </ListSubheader>


    <ListItemButton component={Link} to="/addcompany"sx={{
    backgroundColor: '#e9e9e9'
  }}>
      <ListItemIcon>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            mt: 0,
            ml: 0,
          }}
          alt="AddCompany SVG"
          src={AddCompany}
        />
      </ListItemIcon>
      <ListItemText component="a" primary="Add a Company" />
    </ListItemButton>


    <ListItemButton component={Link} to="/addcontact"sx={{
    backgroundColor: '#e9e9e9'
  }}>
      <ListItemIcon>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            mt: 0,
            ml: 0,
          }}
          alt="AddContact SVG"
          src={AddContact}
        />
      </ListItemIcon>
      <ListItemText component="a" primary="Add a Contact" />
    </ListItemButton>

    <ListItemButton component={Link} to="/adddevice"sx={{
    backgroundColor: '#e9e9e9'
  }}>
      <ListItemIcon>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            mt: 0,
            ml: 0,
          }}
          alt="AddDevice SVG"
          src={AddDevice}
        />
      </ListItemIcon>
      <ListItemText component="a" primary="Add a Device" />
    </ListItemButton>



    <ListItemButton component="a" href="/addtechnician"sx={{
    backgroundColor: '#e9e9e9'
  }}>
      <ListItemIcon>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            mt: 0,
            ml: 0,
          }}
          alt="AddTechnician SVG"
          src={AddTechnician}
        />
      </ListItemIcon>
      <ListItemText component="a" primary="Add a Technician" />
    </ListItemButton>



    <ListItemButton component={Link} to="/addtest"sx={{
    backgroundColor: '#e9e9e9'
  }}>
      <ListItemIcon>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            mt: 0,
            ml: 0,
          }}
          alt="AddTest SVG"
          src={AddTest}
        />
      </ListItemIcon>
      <ListItemText component="a" primary="Add a Test" />
    </ListItemButton>







  </React.Fragment>
);