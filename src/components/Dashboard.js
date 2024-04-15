import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from './Copyright';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import GenerateLettersModal from './GenerateLettersModal';
import { mainListItems, secondaryListItems } from './listItems';
import AppBar from './AppBar'
import FloTraceDrawer from './FloTraceDrawer';
import CategoryCard from './CategoryCard';
import DeviceTable from './DeviceTable';
import FloTraceLogo from './FloTraceLogo';
import FloTraceLogoWhite from './FloTraceLogoWhite';
import FloTraceLogoHeader from './FloTraceLogoHeader';
import background from '../background.png';
import Collapse from '../img/collapse.svg';
import Expand from '../img/expand.svg';




const defaultTheme = createTheme();

export default function Dashboard({ handleLogout, clientId, clientName }) {

  const [open, setOpen] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentlyFilteringBy, setCurrentlyFilteringBy] = useState("");
  const [numDevices90Days, setNumDevices90Days] = useState();
  const [numDevices30Days, setNumDevices30Days] = useState();
  const [numDevicesOverdue, setNumDevicesOverdue] = useState();
  const [selectedTableRows, setSelectedTableRows] = useState([]);
  const [selectedRowsContactData, setSelectedRowsContactData] = useState([]);
  const [filterModel, setFilterModel] = useState({
    items: []
  }
  );


  useEffect(() => {
    const removeDuplicates = (arr) => {
      return [...new Set(arr)];
    }


    // useEffect(() => {
    //   const today = new Date()
    //   const todayPlus30 = today.setDate(today.getDate() + 30)
    //   const todayPlus90 = today.setDate(today.getDate() + 90)
    //   console.log("OVERDUE LENGTH", selectedTableRows.filter(record => record.NewSchTestDate!==null && record.IsMandatory === "Yes" && new Date(record.NewSchTestDate) < today).length)
    // }, [])


    const companyIDs = removeDuplicates(selectedTableRows.map(row => row.CompanyID)).toString()


    // GET COMPANY CONTACT INFO BY ID
    fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${companyIDs}/getcompanycontactinfobyid`)
      .then(response => response.json())
      .then(data => { setSelectedRowsContactData(data.data) })
  }, [selectedTableRows]);





  const handleSelectedTableRows = (tableRows) => {
    setSelectedTableRows(tableRows)
  }



  const toggleDrawer = () => {
    setOpen(!open);
  };



  useEffect(() => {
    console.log('Number devices found overdue', numDevicesOverdue)
  }, [numDevicesOverdue])


  const handleSetNumDevices = (deviceDataArray) => {
    const today = new Date()
    const todayPlus30 = today.setDate(today.getDate() + 30)
    const todayPlus90 = today.setDate(today.getDate() + 90)

    setNumDevicesOverdue(deviceDataArray.filter(record => record.NewSchTestDate !== null && record.IsMandatory === "Yes" && new Date(record.NewSchTestDate) < new Date()).length)
    //setNumDevicesOverdue(deviceDataArray.filter(record => record.NewSchTestDate!==null && record.IsMandatory === "Yes" && new Date(record.NewSchTestDate) < today).length) 
    setNumDevices30Days(deviceDataArray.filter(record => record.NewSchTestDate !== null && record.IsMandatory === "Yes" && new Date(record.NewSchTestDate) >= new Date() && new Date(record.NewSchTestDate) <= new Date().setDate(today.getDate() + 30)).length)
    setNumDevices90Days(deviceDataArray.filter(record => record.NewSchTestDate !== null && record.IsMandatory === "Yes" && new Date(record.NewSchTestDate) >= new Date() && new Date(record.NewSchTestDate) <= new Date().setDate(today.getDate() + 90)).length)
  }


  const handleSeeDevicesNinetyDays = () => {

    const today = new Date();
    const todayPlus30 = today.setDate(today.getDate() + 30)
    const todayPlus90 = today.setDate(today.getDate() + 90)
    isFiltered === false
      ? (function () {
        setFilterModel({
          items: [
            {
              field: 'NewSchTestDate',
              operator: 'onOrBefore',
              value: "2024-05-30",
            },
            {
              field: 'NewSchTestDate',
              operator: 'onOrAfter',
              value: "2024-02-20",
            },
            {
              field: 'IsMandatory',
              operator: 'equals',
              value: "Yes",

            },
          ],
        }); setCurrentlyFilteringBy("90 Days")
      })()
      : setFilterModel({
        items: [
        ],
      })
    setIsFiltered(!isFiltered)
  }

  const handleSeeDevicesThirtyDays = () => {
    const today = new Date();
    const todayPlus30 = today.setDate(today.getDate() + 30)
    const todayPlus90 = today.setDate(today.getDate() + 90)
    isFiltered === false
      ? setFilterModel({
        items: [
          {
            field: 'NewSchTestDate',
            operator: 'onOrBefore',
            value: "2024-03-20",
          },
          {
            field: 'NewSchTestDate',
            operator: 'onOrAfter',
            value: "2024-02-20",
          },
          {
            field: 'IsMandatory',
            operator: 'equals',
            value: "Yes",

          },
        ],
      })
      : setFilterModel({
        items: [
        ],
      })
    setIsFiltered(!isFiltered)
  }


  const handleSeeDevicesOverdue = () => {
    isFiltered === false
      ? setFilterModel({
        items: [
          {
            field: 'NewSchTestDate',
            operator: 'onOrBefore',
            value: new Date().toISOString(),
          },
          {
            field: 'IsMandatory',
            operator: 'equals',
            value: "Yes",
          },
        ],
      })
      : setFilterModel({
        items: [
        ],
      })
    setIsFiltered(!isFiltered)
  }

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    //paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    // '@media all': {
    //   minHeight: 128,
    // },
  }));

  return (
    <ThemeProvider theme={defaultTheme} >
      <Box sx={{ display: 'flex', marginTop: '55px', }}>
        <AppBar position="fixed" open={false} >
          <StyledToolbar sx={{
            height: '210px',
            backgroundImage: `linear-gradient(to left, rgba(245, 246, 252, 1), #1493cd)
            ,url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",

            // pr: '24px',
          }}>
            {/* <Toolbar
            sx={{
              pr: '24px',
            }}
          > */}

            <FloTraceLogoHeader style={{ mt: 2, height: "10px", width: "10px" }} />


            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '25px',
              width: '20%',
            }}>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, mt: 6, alignSelf: 'flex-start' }}
              >
                Flo-Trace®
              </Typography>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                noWrap
                sx={{
                  fontSize: '16px', alignSelf: 'flex-start'
                }}
              >
                by LSPS Solutions
              </Typography>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                noWrap
                sx={{
                  fontSize: '20px', alignSelf: 'flex-start', marginTop: '40px'
                }}
              >
                Welcome Lynn Short
              </Typography>
            </Box>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              sx={{
                fontSize: '24px', marginBottom: '2%', width: '30%', alignSelf: 'flex-end', color: '#1493cd', fontWeight: '700'
              }}
            >
              City of Cuero Database
            </Typography>
            <Box sx={{ display: 'block', justifySelf: 'end', position: 'relative', left: '20%' }}>
              <Button sx={{ color: 'white', display: 'block', justifySelf: 'end', position: 'relative', left: '20%', marginTop: '40px', backgroundColor: '#d3dee6', color: '#000' }} onClick={handleLogout} variant="contained" >Logout</Button>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                sx={{
                  fontSize: '18px', marginTop: '60%', width: '100%', alignSelf: 'flex-end', color: '#000'
                }}
              >
                March 2, 2024
              </Typography>
            </Box>

            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {/* clearStorage={handleRemoveToken} */}
            {/* <Logout logoutHandler={handleLogout}/> */}

            {/* </Toolbar> */}

          </StyledToolbar>
        </AppBar>


        {/* <Drawer variant="permanent" open={open}> */}
        <FloTraceDrawer variant="permanent" open={open} >

          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'flex-start',
              height: '220px',

            }}
          >
            <IconButton onClick={toggleDrawer}
              sx={{
                ...(!open && { display: 'none' }),
                position: 'relative',
                right: '15px',
              }}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                ...(open && { display: 'none' }),
              }}
            >
              <ChevronRightIcon />
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
            height: 'auto',
            overflow: 'hidden',
            mt: '85px'
          }}
        >

          <Toolbar />

          <Container maxWidth="xlg" sx={{ mt: 4, mb: 4, }}>
            <Grid container spacing={3}>
              {/* Due Within 90 Days */}
              <Grid item xs={12} md={2} lg={3}>
                <Paper
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                  }}
                >
                  <CategoryCard onClickSeeDevices={handleSeeDevicesNinetyDays} title={'Due in 90 Days'} valNumDevices={numDevices90Days} updateTableTitle={currentlyFilteringBy} />
                </Paper>
              </Grid>
              {/* Due Within 30 Days */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                  }}
                >
                  <CategoryCard onClickSeeDevices={handleSeeDevicesThirtyDays} title={'Due in 30 Days'} valNumDevices={numDevices30Days} />
                </Paper>
              </Grid>
              {/* Overdue */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                  }}
                >
                  <CategoryCard onClickSeeDevices={handleSeeDevicesOverdue} title={'Overdue'} valNumDevices={numDevicesOverdue} valueColor={"error.main"} />
                </Paper>
              </Grid>
              {/* Overdue */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                  }}
                >
                  <CategoryCard onClickSeeDevices={handleSeeDevicesOverdue} title={'Overdue'} valNumDevices={numDevicesOverdue} valueColor={"error.main"} />
                </Paper>
              </Grid>


              <Grid item xs={12}>
                <Paper sx={{  display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      p: 2, display: 'flex', flexDirection: 'column', alignItems: 'start',
                      
                    }}
                    component="div">
                    <DeviceTable

                      clientId={clientId}
                      clientName={clientName}
                      currentFilterModel={filterModel}
                      setFilterModelFunction={setFilterModel}
                      onSaveNumDevices={handleSetNumDevices}
                      onSelectRows={handleSelectedTableRows}
                      currentlySelectedRows={selectedTableRows}
                    />
                  </Box>
                  <GenerateLettersModal clientId={clientId} clientName={clientName} selectedRowsData={selectedTableRows} selectedContactsData={selectedRowsContactData} />
                </Paper>
              </Grid>
            </Grid>





          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}