import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import L from 'leaflet';
import Title from './Title';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import { mainListItems, secondaryListItems } from './listItems';
import AppBar from './AppBar'
import FloTraceDrawer from './FloTraceDrawer';
import { Paper } from '@mui/material';


const icon = L.icon({ 
    iconRetinaUrl:iconRetina, 
    iconUrl: iconMarker, 
    shadowUrl: iconShadow 
});


export default function Map({handleLogout, onSelectRows, currentFilterModel, clientId, clientName}) {

    const [mapData, setMapData] = useState([])
    const [open, setOpen] = useState(true);

    useEffect(() => {
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/devicemapdata`) 
        .then((response) => response.json())
        .then((result) => setMapData(result.data))
    }, [])

    useEffect(() => {
      console.log('mapdata', mapData)
  }, [mapData])


    const toggleDrawer = () => {
        setOpen(!open);
      };


    return(

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


          <Button onClick={handleLogout} variant="contained">Logout</Button>


          </Toolbar>
        </AppBar>
        <FloTraceDrawer />
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
        <Paper sx={{ ml:1, mt:1, p: 1, display: 'flex', flexDirection: 'column' }}>
        <Title>Devices Map</Title>

        <div style={{ height: "800px" }}>
        {/* center={[29.0939, -97.2892]} */}
        <MapContainer style={{ height: "100%", minHeight: "100%"}}  center={[33.0939, -97.2892]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

    {mapData.map((val) => (
        <Marker icon={icon} position={[val.Latitude, val.Longitude]}>
            <Popup>
                Location: {val.Location} <br />
                Company: {val.CompanyName} <br />
                Street Address: {val.StreetAddress}<br />
                City: {val.City}<br />
                State: {val.State}<br />
                Serial Number: {val.SerialNumber}<br />
                Condition: {val.Condition}<br />
                Device Type: {val.DeviceType}<br />
                Installed Date: {val.InstalledDate}<br />
                Manufacturer: {val.Manufacturer}<br />
                Size: {val.Size}<br />
                Latitude: {val.Latitude}<br />
                Longitude: {val.Longitude}<br />

                </Popup>
        </Marker>
    ))}
        </MapContainer>
        </div>
        </Paper>
              </Grid>
        </Box>
      </Box>
    )
}