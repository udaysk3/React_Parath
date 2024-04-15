import React, { useState, useEffect, useCallback } from 'react';
import Title from './Title';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomToolbar from './CustomToolbar';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadDeviceFile from './UploadDeviceFile';
import { Button } from '@mui/material';
import NoFileSelectedDetailPanelContentModal from './NoFileSelectedDetailPanelContentModal';
import NoDeviceSelectedModal from './NoDeviceSelectedModal';
import AddFileModal from './AddFileModal';
import RetireDeviceModal from './RetireModals/RetireDeviceModal';
import AddTestModal from './AddTestModal';
import axios from 'axios';
import Box from "@mui/material/Box";
import DeleteAttachmentModal from './RetireModals/DeleteAttachmentModal';
import Alert from '@mui/material/Alert';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import Map from '../img/map.svg';
import Device from '../img/device.svg';
import { alignProperty } from '@mui/material/styles/cssUtils';


const ODD_OPACITY = 0.2;

export default function DeviceTable({
  onSaveNumDevices,
  onSelectRows,
  currentFilterModel,
  setFilterModelFunction,
  clientId,
  clientName }) {

  moment.updateLocale("language_code", {
    invalidDate: ""
  });


  const [deviceData, setDeviceData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [uploadedDeviceFileName, setUploadedDeviceFileName] = useState("")
  const [testFiles, setTestFiles] = useState([]);
  const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState([]);
  const [filenameForDownload, setFilenameForDownload] = useState('');
  const [eventListenerFilenameForDownload, setEventListenerFilenameForDownload] = useState('');
  const [eventListenerClientFilenameForDownload, setEventListenerClientFilenameForDownload] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [dummyState, setDummyState] = useState()
  const [detailRowSelectionModel, setDetailRowSelectionModel] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [previousRowSelectionModel, setPreviousRowSelectionModel] = useState([]);

  const [openNoFileSelectedModal, setNoFileOpenSelectedModal] = useState(false);
  const handleNoFileSelectedModalOpen = () => setNoFileOpenSelectedModal(true);
  const handleNoFileSelectedModalClose = () => setNoFileOpenSelectedModal(false);

  const handleOpenSubmitModal = () => setOpenSubmitModal(true);
  const handleCloseSubmitModal = () => setOpenSubmitModal(false);

  const [selectedIDs, setSelectedIDs] = useState(1)
  const [detailSelectedIDs, setDetailSelectedIDs] = useState(1)
  const [detailPanelSelectedIDs, setDetailPanelSelectedIDs] = useState(1)
  const [detailPanelIDs, setDetailPanelIDs] = useState()

  // useEffect(() => {
  //   console.log("ROW SELECTION MODEL", rowSelectionModel[0]);
  // }, [rowSelectionModel])

  // useEffect(() => {
  //   console.log("PREVIOUS ROW SELECTION MODEL", previousRowSelectionModel[0]);
  // }, [previousRowSelectionModel])



  const [retireDeviceModalStatus, setRetireDeviceModalStatus] = useState(false);
  const [alert, setAlert] = useState(false);
  const handleOpenModal = () => setRetireDeviceModalStatus(true);
  const handleCloseModal = () => setRetireDeviceModalStatus(false);

  const [deleteAttachmentModal, setDeleteAttachmentModal] = useState(false);
  const handleDeleteAttachmentModalOpen = () => setDeleteAttachmentModal(true);
  const handleDeleteAttachmentModalClose = () => setDeleteAttachmentModal(false);


  const [deleteDeviceModal, setDeleteDeviceModal] = useState(false);
  const handleDeleteDeviceModalOpen = () => setDeleteDeviceModal(true);
  const handleDeleteDeviceModalClose = () => setDeleteDeviceModal(false);


  const [message, setMessage] = React.useState('');



  const handleRowClick = (params) => {
    setMessage(`Selected file: "${params.row.ClientFileName}"`);
    setEventListenerFilenameForDownload(params.row.Filename);
    setEventListenerClientFilenameForDownload(params.row.ClientFileName)
  };






  const handleRetireDevice = (e) => {
    e.preventDefault();
    if (rowSelectionModel[0] == undefined) {
      console.log('Row selection model undefined')
      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${previousRowSelectionModel[0]}/retiredevice`)
        .then((response) => response.json())
        .then(response => {
          setAlertContent("Device retired successfully.");
          setAlert(true);
          setOpenSubmitModal(true);
        })
        .then((result) => { console.log(result) })
    }
    else {
      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${rowSelectionModel[0]}/retiredevice`)
        .then((response) => response.json())
        .then(response => {
          setAlertContent("Device retired successfully.");
          setAlert(true);
          setOpenSubmitModal(true);
        })
        .then((result) => { console.log(result) })
    }
  }



  const handleDeleteAttachment = () => {
    const setIds = new Set(detailRowSelectionModel);
    const filteredData = timelineData.filter((row) =>
      setIds.has(row.AttachmentID)
    );

    if (filteredData.length !== 0) {
      const filename = filteredData[0].Filename
      const attachmentID = filteredData[0].AttachmentID

      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${clientName}/${filename.replace(/ /g, '%20')}/${attachmentID}/deleteattachment`)
        .then(response => {
          setAlertContent("File deleted successfully.");
          setAlert(true);
          setOpenSubmitModal(true);
        })
        .then((result) => { console.log(result) })
    }
    else {
      handleNoFileSelectedModalOpen()
    }
  }



  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const filename = file.name;
    setUploadedDeviceFileName(filename);
    setTestFiles(uploadFormData);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const action = "File uploaded"
    axios
      .post(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${clientName}/${detailPanelExpandedRowIds}/${uploadedDeviceFileName.replace(/ /g, '%20')}/${action.replace(/ /g, '%20')}/uploadfile`, testFiles, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      .then(response => {
        if (response.data.success === "success") {
          setAlertContent("File uploaded successfully!");
          handleOpenSubmitModal();
        }
        else {
          setAlertContent("Error uploading file");
          handleOpenSubmitModal();
        }
      }).catch(error => {
        //alert(error)
      })


    // fetch(`http://127.0.0.1:5000/${lgnContext.clientId}/posttest`, {
    //   method: "POST",
    //   headers: {
    //       'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    //   })
    //   .then((response) => response.json())
    //   .then((result) => {
    //   console.log(result)
    // })
  }




  const rowSelectionModelChangeHandler = (newDetailRowSelectionModel) => {
    setDetailRowSelectionModel(newDetailRowSelectionModel);
  }




  function download(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }


  const handleDownload = () => {
    fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${clientName}/${eventListenerFilenameForDownload.replace(/ /g, '%20')}/downloadfile`)
      .then(response => response.blob())
      .then(blob => download(blob, `${eventListenerFilenameForDownload}`))
      .then(console.log('Filename actually executing in download function', eventListenerFilenameForDownload))
  }




  // const handleDownload = () => {
  //     console.log('Detail row selection model', detailRowSelectionModel)
  //     console.log('onRowClick', dummyState)


  //     let filteredData = timelineData.filter((row) => row.AttachmentID === detailRowSelectionModel);



  //     if (filteredData.length !==0) {
  //       console.log("filtered data found to be greater than 0");
  //       const filename = filteredData[0].Filename;
  //       fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/${clientName}/${filename.replace(/ /g, '%20')}/downloadfile`)
  //       .then(response => response.blob())
  //       .then(blob => download(blob, `${filename}`))
  //       .then(console.log('Filename actually executing in download function', filename))
  //        }
  //     else {
  //        handleNoFileSelectedModalOpen()


  //     }
  // }


  // console.log('Filename actually executing in download function', filename)
  //const dummyStateFilename = timelineData[dummyState].Filename
  // const detailPanelSelectedRows = timelineData.filter((row) =>
  //   detailPanelSelectedIDs.has(row.AttachmentID) 
  // );


  //const dummyStateFilename = timelineData.filter((row) =>
  //  row.AttachmentID = dummyState)



  //console.log("filtered", dummyStateFilename)
  //console.log("Filename for download", dummyStateFilename)

  //fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/${clientName}/${filenameForDownload.replace(/ /g, '%20')}/downloadfile`)



  const attachmentTableColumns = [
    { headerClassName: 'super-app-theme--header', field: 'AttachmentID', headerName: 'Attachment ID', editable: true, width: 350 },
    { headerClassName: 'super-app-theme--header', field: 'ClientFileName', headerName: 'File Name', editable: true, width: 350 },
    { headerClassName: 'super-app-theme--header', field: 'CreateDateStamp', headerName: 'Created At', editable: true, width: 215 },
    { headerClassName: 'super-app-theme--header', field: 'Action', headerName: 'Details', editable: true, width: 140 },
    {
      headerClassName: 'super-app-theme--header',
      field: 'Delete', width: 150, headerName: 'Delete', renderCell:
        (params) => (
          <RemoveCircleIcon onClick={handleDeleteAttachmentModalOpen} color="error" />
        )
    },

  ]


  const handleDetailPanelExpandedRowIdsChange = (newIds) => {
    const setIds = new Set(rowSelectionModel);

    const filteredData = timelineData.filter((row) =>
      setIds.has(row.AttachmentID)
    );

    if (filteredData.length !== 0) {

      console.log('FILTERED DATA DOT LENGTH GREATER 0', filteredData)

      //if (newIds.length > 0) {
      setDetailPanelExpandedRowIds(newIds);

    }
    else {
      console.log('FILTERED DATA DOT LENGTH EQUALS 0', filteredData)
      setDetailPanelExpandedRowIds(newIds);

    }
  }



  // useEffect(() => {
  //   fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/${deviceID}/getuploadedfilenames`) 
  //     .then((response) => response.json())
  //     .then((result) => setTimelineData(result.data))
  //   }, []) 







  // useEffect(() => {
  //   const filteredRow = timelineData.filter((row) =>
  //   detailPanelIDs.has(row.AttachmentID)
  //   );
  //   console.log("Filtered row executng in useEffect after state update")


  //   }, [detailPanelIDs]) 


  // useEffect(() => {
  //   console.log('DETAIL PANEL EXPANDED ROW IDS', detailPanelExpandedRowIds);
  //   fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${detailPanelExpandedRowIds}/getuploadedfilenames`) 
  //   .then((response) => response.json())
  //   .then((result) => {
  //     setTimelineData(result.data);
  //     setDetailRowSelectionModel(result.data[0].AttachmentID)
  //     setFilenameForDownload(result.data[0].Filename)
  //     setDummyState(result.data[0].AttachmentID)})}, [detailPanelExpandedRowIds])



  useEffect(() => {
    async function fetchDetailPanelExpandedRowIDs() {
      const response = await fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${detailPanelExpandedRowIds}/getuploadedfilenames`)
      const result = await response.json()

      setTimelineData(result.data);
      setDetailRowSelectionModel((result.data.length > 0) ? result.data[0].AttachmentID : 1)
      setFilenameForDownload((result.data.length > 0) ? result.data[0].Filename : "")
      setDummyState((result.data.length > 0) ? result.data[0].AttachmentID : 1)
    }
    fetchDetailPanelExpandedRowIDs();

  }, [detailPanelExpandedRowIds]
  )











  function DetailPanelContent({ row: rowProp }) {
    // fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/${rowProp.DeviceID}/getuploadedfilenames`) 
    //     .then((response) => response.json())
    //     .then((result) => {
    //       setTimelineData(result.data);
    //       setDetailRowSelectionModel(result.data[0].AttachmentID)
    //       setFilenameForDownload(result.data[0].Filename)
    //       setDummyState(result.data[0].AttachmentID)})





    //.then(setDetailRowSelectionModel)
    //.then(console.log('detailRowSel', filenameForDownload))
    //   if () {
    // setFilenameForDownload(timelineData[0].Filename))
    //   }
    //.then((nextResult) => console.log('nextresult', nextResult))
    //.then(setFilenameForDownload(timelineData[0].Filename))
    //{setFilenameForDownload(result[0].Filename)}
    //.then((result) => console.log('result',result))



    return (
      <React.Fragment>
        <code>
          detailPanelExpandedRowIds: {JSON.stringify(detailPanelExpandedRowIds)}
        </code>
        <Typography sx={{ ml: 10, mt: 0, textAlign: "left" }} variant="h6">{`Device Serial Number:${rowProp.SerialNumber}`}</Typography>
        {/* <Typography sx={{ ml:10, mt:0, textAlign:"left"}} variant="body1">{`Device ID: ${rowProp.DeviceID}`}</Typography> */}
        {/* <Typography sx={{ ml:10, mt:0, textAlign:"left"}} variant="body1">{`Serial Number: ${rowProp.SerialNumber}`}</Typography> */}
        <Typography sx={{ ml: 10, mt: 0, textAlign: "left" }} variant="body1">{`Company: ${rowProp.CompanyName}`}</Typography>
        <Typography sx={{ ml: 10, mt: 0, textAlign: "left" }} variant="body1">{`Device Location: ${rowProp.Location}`}</Typography>
        <Typography sx={{ ml: 10, mt: 0, textAlign: "left" }} variant="body1">{`Manufacturer: ${rowProp.Manufacturer}`}</Typography>
        <Typography sx={{ ml: 10, mt: 0, textAlign: "left" }} variant="body1">{`Model: ${rowProp.Model}`}</Typography>
        <Typography sx={{ ml: 10, mt: 0, textAlign: "left" }} variant="body1">{`Size: ${rowProp.Size}`}</Typography>
        <Typography sx={{ ml: 10, mt: 0, textAlign: "left" }} variant="body1">{`Scheduled Test Date: ${rowProp.NewSchTestDate}`}</Typography>

        <Grid container spacing={8}>
          {/* sx={{ml:10, mt:2}} */}
          <Grid item xs={2.5} sx={{ ml: 10 }}>
            {message && <Alert severity="info">{message}</Alert>}
            <DataGridPremium
              style={{ height: 350 }}
              //checkboxSelection
              // disableRowSelectionOnClick
              pagination
              pageSizeOptions={[5, 10, 25, 100]}
              components={{ Toolbar: CustomToolbar }}
              density="compact"
              getRowId={(row) => row.AttachmentID}
              rows={timelineData}
              //onRowClick={(rows)=>{setDummyState(rows.id)}}
              onRowClick={handleRowClick}
              columns={attachmentTableColumns}
              initialState={{
                ...timelineData.initialState,
                pagination: { paginationModel: { pageSize: 5 } },
                columns: {
                  columnVisibilityModel: {
                    AttachmentID: true
                  }
                }
              }}
              //rowSelectionModel={detailPanelInitialSelectionModel}
              // onRowSelectionModelChange={(newDetailRowSelectionModel) => {
              //   setDetailRowSelectionModel(newDetailRowSelectionModel);
              // }}



              onRowSelectionModelChange={rowSelectionModelChangeHandler}
              rowSelectionModel={detailRowSelectionModel}





            // onRowSelectionModelChange={(ids) => {
            //   setDetailSelectedIDs(ids[0]);
            //   console.log("IDS", ids)
            //   console.log("Detail selected ids state", detailSelectedIDs)
            //const selectedIDs = new Set(ids);
            //const selectedRows = deviceData.filter((row) =>
            //  selectedIDs.has(row.DeviceID)
            //);
            //onSelectRows(selectedRows);
            //}}






            //onRowSelectionModelChange={(ids) => {
            //  console.log('onRowSelectionModelChange', ids)
            //const filteredRow = timelineData.filter((row) =>
            //  row.AttachmentID = ids[0])
            //console.log('filtered row', filteredRow)


            //const detailPanelSelectedIDs = new Set(ids);
            //setDetailPanelExpandedRowIds(ids);
            // const filteredFilename = timelineData.filter((row) =>
            //    detailPanelSelectedIDs.has(row.AttachmentID) 
            //  );


            //setDetailPanelIDs(detailPanelSelectedIDs)
            //setFilenameForDownload(ids[0].Filename)
            // console.log('Filename for download state', filenameForDownload)

            //}}
            />

            <Button variant="contained" size="large" onClick={handleDownload} disabled={eventListenerFilenameForDownload === "" ? true : false} sx={{ mt: 1, mb: 0 }}>{eventListenerFilenameForDownload === "" ? "SELECT A ROW TO DOWNLOAD" : `Download ${eventListenerClientFilenameForDownload}`}</Button>

          </Grid>
          <Grid item sx={{ mt: 4, textAlign: "left" }}>
            <Box component="form" onSubmit={handleSubmit}>
              {/* <Box> */}

              {/* <Typography sx={{ ml: 5, mt: -2, textAlign: "left" }} variant="h6">Upload Attachment</Typography>
              <Typography sx={{ ml: 0.5, mt: 1, textAlign: "center" }} variant="body1">Acceptable files: PDF, JPEG, PNG, DOCX, XLSX, CSV</Typography> */}
              <UploadDeviceFile onUploadDeviceFile={handleFileUpload} />
              <p>{uploadedDeviceFileName}</p>
              <AddFileModal submitTestFileAndData={handleSubmit} openStatus={openSubmitModal} handleModalClose={handleCloseSubmitModal} alertContentText={alertContent} />
              <Button type="submit" variant="contained" size="large" sx={{ backgroundColor: '#a6a6a5', ml: 1, mr: 6, mt: 4, borderRadius: 8, width: 225 }}>Submit</Button>
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>

    );
  }


  const getDetailPanelContent = ({ row }) => <DetailPanelContent row={row} />
  const getDetailPanelHeight = useCallback(() => "auto", []);

  const deviceColumns = [
    //COLUMNS THAT ARE PRESENT BUT NOT VISIBLE
    { headerClassName: 'super-app-theme--header', field: 'DeviceID', headerName: 'Device ID', editable: true, type: "number", width: 75 },
    { headerClassName: 'super-app-theme--header', field: 'ClientID', headerName: 'Client ID', editable: true, type: "number", width: 75 },
    { headerClassName: 'super-app-theme--header', field: 'ContactID', headerName: 'Contact ID', editable: true, type: "number", width: 100 },
    { headerClassName: 'super-app-theme--header', field: 'SlateID', headerName: 'Slate ID', editable: true, type: "number", width: 75 },

    //COLUMNS THAT ARE PRESENT AND VISIBLE WITHOUT SCROLLING
    { headerClassName: 'super-app-theme--header', field: 'CompanyName', headerName: 'Company Name', editable: true, width: 180 },
    { headerClassName: 'super-app-theme--header', field: 'DeviceType', headerName: 'Device Type', editable: true, width: 100 },
    { headerClassName: 'super-app-theme--header', field: 'Location', headerName: 'Location', editable: true, width: 175 },
    // { field: 'LatestTestDate', headerName: 'Last Test Date', editable: true, width: 150, type: 'date', valueFormatter: params => new Date(params?.value)},
    // { field: 'ActualTestDate', headerName: 'Actual Test Date', editable: true, width: 150, type: 'date', valueFormatter: params => new Date(params?.value)},

    { headerClassName: 'super-app-theme--header', field: 'LatestTestDate', headerName: 'Last Test Date', editable: true, width: 150, type: 'date', valueGetter: ({ value }) => value && new Date(value), valueFormatter: params => moment(params?.value).format("MM/DD/YYYY") },
    { headerClassName: 'super-app-theme--header', field: 'ActualTestDate', headerName: 'Actual Test Date', editable: true, width: 150, type: 'date', valueGetter: ({ value }) => value && new Date(value), valueFormatter: params => moment(params?.value).format("MM/DD/YYYY") },
    { headerClassName: 'super-app-theme--header', field: 'NewSchTestDate', headerName: 'Scheduled Test Date', editable: true, width: 150, type: 'date', valueGetter: ({ value }) => value && new Date(value), valueFormatter: params => moment(params?.value).format("MM/DD/YYYY") },
    { headerClassName: 'super-app-theme--header', field: 'DaysUntilDue', width: 125, headerName: 'Days Until Due' },
    { headerClassName: 'super-app-theme--header', field: 'Manufacturer', headerName: 'Manufacturer', editable: true },
    { headerClassName: 'super-app-theme--header', field: 'Model', headerName: 'Model', editable: true, width: 75 },

    //COLUMNS THAT ARE PRESENT BUT REQUIRE SCROLLING HORIZONTALLY
    { headerClassName: 'super-app-theme--header', field: 'Condition', headerName: 'Condition', editable: true },
    { headerClassName: 'super-app-theme--header', field: 'SerialNumber', headerName: 'Serial Number', editable: true, width: 125 },
    { headerClassName: 'super-app-theme--header', field: 'Status', headerName: 'Status', editable: true, width: 100 },
    { headerClassName: 'super-app-theme--header', field: 'Comments', headerName: 'Comments', editable: true, width: 250 },
    { headerClassName: 'super-app-theme--header', field: 'InstalledDate', headerName: 'Installed Date', editable: true, width: 150, type: "date", valueGetter: ({ value }) => value && new Date(value), valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), type: 'date' },
    { headerClassName: 'super-app-theme--header', field: 'RetiredDate', headerName: 'Retired Date', editable: true, width: 150, type: "date", valueGetter: ({ value }) => value && new Date(value), valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), type: 'date' },
    { headerClassName: 'super-app-theme--header', field: 'PWS', headerName: 'PWS', editable: true },
    { headerClassName: 'super-app-theme--header', field: 'Size', headerName: 'Size', editable: true },
    { headerClassName: 'super-app-theme--header', field: 'IsMandatory', headerName: 'Is Mandatory', editable: true },
    { headerClassName: 'super-app-theme--header', field: 'StreetAddress', headerName: 'Address', editable: true, width: 175 },
    { headerClassName: 'super-app-theme--header', field: 'City', headerName: 'City', editable: true },
    { headerClassName: 'super-app-theme--header', field: 'State', headerName: 'State', editable: true },
    { headerClassName: 'super-app-theme--header', field: 'CompanyID', headerName: 'Company ID', editable: true },
    { headerClassName: 'super-app-theme--header', field: 'ReplacesDeviceID', headerName: 'Replaces Device ID', editable: true, width: 150 },
    { headerClassName: 'super-app-theme--header', field: 'CompletedTestID', headerName: 'Completed Test ID', editable: true, type: 'integer', width: 150 },
    { headerClassName: 'super-app-theme--header', field: 'CompletedTestDeviceID', headerName: 'Completed Test Device ID', editable: true, width: 185 },
    { headerClassName: 'super-app-theme--header', field: 'CompletedTestTechID', headerName: 'Completed Test Tech ID', editable: true, hide: true, width: 175 },
    { headerClassName: 'super-app-theme--header', field: 'GaugeCalibrationDate', headerName: 'Gauge Calibration Date', editable: true, width: 175, type: "date", valueGetter: ({ value }) => value && new Date(value), valueFormatter: params => moment(params?.value).format("MM/DD/YYYY") },
    { headerClassName: 'super-app-theme--header', field: 'CompletedTestReport', headerName: 'Test Report', editable: true },
    { headerClassName: 'super-app-theme--header', field: 'TechID', headerName: 'Technician ID', editable: true, hide: true },
    { headerClassName: 'super-app-theme--header', field: 'CertTestNumber', headerName: 'Certification Test Number', editable: true, width: 175 },
    { headerClassName: 'super-app-theme--header', field: 'TechName', headerName: 'Technician Name', editable: true, width: 150 },
    { headerClassName: 'super-app-theme--header', field: 'ScheduledTestID', headerName: 'Scheduled Test ID', editable: true, width: 150 },
    { headerClassName: 'super-app-theme--header', field: 'SchTestDeviceID', headerName: 'Scheduled Test Device ID', editable: true, width: 175 },
    {
      headerClassName: 'super-app-theme--header',
      field: 'Retire Device', width: 225, headerName: 'Retire Device', renderCell:
        (params) => (
          <RemoveCircleIcon onClick={handleOpenModal} color="error" />
        )
    },
  ];



  const addDaysUntilDue = (row) => {
    const today = new Date()
    const millisecondsUntilDue = new Date(row.NewSchTestDate).getTime() - today.getTime()
    const cutoffVal = -9000
    const numDays = Math.floor(millisecondsUntilDue / (1000 * 3600 * 24))

    const rowVal = {
      ...row,
      DaysUntilDue: numDays > cutoffVal ? numDays : "N/A"
    }
    return rowVal
  }


  // useEffect(() => {
  //   async function fetchDevices() {
  //     const response = await fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/devices`)
  //     const data = await response.json()


  //     console.log("Length found", data.data.filter(record => record.NewSchTestDate !== null && record.IsMandatory === "Yes" && new Date(record.NewSchTestDate) < new Date()).length)


  //     onSaveNumDevices(data.data.map(addDaysUntilDue))
  //     setDeviceData(data.data.map(addDaysUntilDue))
  //   }
  //   fetchDevices();

  // }, []
  // )
  
  useEffect(() => {
    setDeviceData([
      {
      DeviceID: 1,
      ClientID: 101,
      ContactID: 201,
      SlateID: 301,
      CompanyName: 'ABC Inc.',
      DeviceType: 'Type A',
      Location: 'Location 1',
      LatestTestDate: new Date(),
      ActualTestDate: new Date(),
      NewSchTestDate: new Date(),
      DaysUntilDue: 10,
      Manufacturer: 'Manufacturer X',
      Model: 'Model Y',
      Condition: 'Good',
      SerialNumber: 'SN001',
      Status: 'Active',
      Comments: 'Lorem ipsum',
      InstalledDate: new Date(),
      RetiredDate: new Date(),
      PWS: 'PWS A',
      Size: 'Medium',
      IsMandatory: true,
      StreetAddress: '123 Street',
      City: 'City A',
      State: 'State X',
      CompanyID: 501,
      ReplacesDeviceID: 401,
      CompletedTestID: 601,
      CompletedTestDeviceID: 701,
      CompletedTestTechID: 801,
      GaugeCalibrationDate: new Date(),
      CompletedTestReport: 'Report URL',
      TechID: 901,
      CertTestNumber: 'Cert123',
      TechName: 'John Doe',
      ScheduledTestID: 1001,
      SchTestDeviceID: 1101,
    },
      {
      DeviceID: 2,
      ClientID: 101,
      ContactID: 201,
      SlateID: 301,
      CompanyName: 'ABC Inc.',
      DeviceType: 'Type A',
      Location: 'Location 1',
      LatestTestDate: new Date(),
      ActualTestDate: new Date(),
      NewSchTestDate: new Date(),
      DaysUntilDue: 10,
      Manufacturer: 'Manufacturer X',
      Model: 'Model Y',
      Condition: 'Good',
      SerialNumber: 'SN001',
      Status: 'Active',
      Comments: 'Lorem ipsum',
      InstalledDate: new Date(),
      RetiredDate: new Date(),
      PWS: 'PWS A',
      Size: 'Medium',
      IsMandatory: true,
      StreetAddress: '123 Street',
      City: 'City A',
      State: 'State X',
      CompanyID: 501,
      ReplacesDeviceID: 401,
      CompletedTestID: 601,
      CompletedTestDeviceID: 701,
      CompletedTestTechID: 801,
      GaugeCalibrationDate: new Date(),
      CompletedTestReport: 'Report URL',
      TechID: 901,
      CertTestNumber: 'Cert123',
      TechName: 'John Doe',
      ScheduledTestID: 1001,
      SchTestDeviceID: 1101,
    },
      {
      DeviceID: 3,
      ClientID: 101,
      ContactID: 201,
      SlateID: 301,
      CompanyName: 'ABC Inc.',
      DeviceType: 'Type A',
      Location: 'Location 1',
      LatestTestDate: new Date(),
      ActualTestDate: new Date(),
      NewSchTestDate: new Date(),
      DaysUntilDue: 10,
      Manufacturer: 'Manufacturer X',
      Model: 'Model Y',
      Condition: 'Good',
      SerialNumber: 'SN001',
      Status: 'Active',
      Comments: 'Lorem ipsum',
      InstalledDate: new Date(),
      RetiredDate: new Date(),
      PWS: 'PWS A',
      Size: 'Medium',
      IsMandatory: true,
      StreetAddress: '123 Street',
      City: 'City A',
      State: 'State X',
      CompanyID: 501,
      ReplacesDeviceID: 401,
      CompletedTestID: 601,
      CompletedTestDeviceID: 701,
      CompletedTestTechID: 801,
      GaugeCalibrationDate: new Date(),
      CompletedTestReport: 'Report URL',
      TechID: 901,
      CertTestNumber: 'Cert123',
      TechName: 'John Doe',
      ScheduledTestID: 1001,
      SchTestDeviceID: 1101,
    },
      {
      DeviceID: 4,
      ClientID: 101,
      ContactID: 201,
      SlateID: 301,
      CompanyName: 'ABC Inc.',
      DeviceType: 'Type A',
      Location: 'Location 1',
      LatestTestDate: new Date(),
      ActualTestDate: new Date(),
      NewSchTestDate: new Date(),
      DaysUntilDue: 10,
      Manufacturer: 'Manufacturer X',
      Model: 'Model Y',
      Condition: 'Good',
      SerialNumber: 'SN001',
      Status: 'Active',
      Comments: 'Lorem ipsum',
      InstalledDate: new Date(),
      RetiredDate: new Date(),
      PWS: 'PWS A',
      Size: 'Medium',
      IsMandatory: true,
      StreetAddress: '123 Street',
      City: 'City A',
      State: 'State X',
      CompanyID: 501,
      ReplacesDeviceID: 401,
      CompletedTestID: 601,
      CompletedTestDeviceID: 701,
      CompletedTestTechID: 801,
      GaugeCalibrationDate: new Date(),
      CompletedTestReport: 'Report URL',
      TechID: 901,
      CertTestNumber: 'Cert123',
      TechName: 'John Doe',
      ScheduledTestID: 1001,
      SchTestDeviceID: 1101,
    },
      {
      DeviceID: 5,
      ClientID: 101,
      ContactID: 201,
      SlateID: 301,
      CompanyName: 'ABC Inc.',
      DeviceType: 'Type A',
      Location: 'Location 1',
      LatestTestDate: new Date(),
      ActualTestDate: new Date(),
      NewSchTestDate: new Date(),
      DaysUntilDue: 10,
      Manufacturer: 'Manufacturer X',
      Model: 'Model Y',
      Condition: 'Good',
      SerialNumber: 'SN001',
      Status: 'Active',
      Comments: 'Lorem ipsum',
      InstalledDate: new Date(),
      RetiredDate: new Date(),
      PWS: 'PWS A',
      Size: 'Medium',
      IsMandatory: true,
      StreetAddress: '123 Street',
      City: 'City A',
      State: 'State X',
      CompanyID: 501,
      ReplacesDeviceID: 401,
      CompletedTestID: 601,
      CompletedTestDeviceID: 701,
      CompletedTestTechID: 801,
      GaugeCalibrationDate: new Date(),
      CompletedTestReport: 'Report URL',
      TechID: 901,
      CertTestNumber: 'Cert123',
      TechName: 'John Doe',
      ScheduledTestID: 1001,
      SchTestDeviceID: 1101,
    },
    ])

    console.log('Device data', deviceData)

  }, []
  )

  useEffect(() => {
    onSaveNumDevices(deviceData)
    //console.log('Dvice data filtered overdue', deviceData.filter(record => record.NewSchTestDate!==null && record.IsMandatory === "Yes" && new Date(record.NewSchTestDate) < new Date()).length)
  }, [deviceData]
  )


  // useEffect(() => {
  //   fetch(`https://flo-trace-api-bmjve.ondigitalocean.app/${clientId}/devices`)
  //   .then(response => response.json())
  //   .then(data => {setDeviceData(data.data.map(addDaysUntilDue))})
  //   .then(onSaveNumDevices(deviceData))
  // }, []);



  useEffect(() => {
    onSaveNumDevices(deviceData)
  }, [deviceData]);


  


  return (
    <React.Fragment>
      
      <NoFileSelectedDetailPanelContentModal open={openNoFileSelectedModal} handleClose={handleNoFileSelectedModalClose} />
      {/* <Title>{'Devices ' + props.updateTableTitle}</Title> */}
      <DeleteAttachmentModal retireDevice={handleRetireDevice} deleteAttachment={handleDeleteAttachment} openStatus={deleteAttachmentModal} handleClose={handleDeleteAttachmentModalClose} />
      <RetireDeviceModal retireDevice={handleRetireDevice} clientId={clientId} rowSelectionModel={rowSelectionModel} openStatus={retireDeviceModalStatus} handleCloseModal={handleCloseModal} />
      <AddTestModal openStatus={openSubmitModal} alertContentText={alertContent} />
      <Box component="div" style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width:'100%'
      }}><Box component="div">DEVICES (Due in 90 Days)</Box>
        <Box component="div">
          <Box
            component="img"
            sx={{ height: 50, width: 50, mt: 0, ml: 0, alignItems:'center' }}
            alt="Map SVG"
            src={Map}
          />
          <Box
            component="img"
            sx={{ height: 50, width: 50, mt: 0, ml: 0, alignItems:'center' }}
            alt="Device SVG"
            src={Device}
          />
        </Box>
      </Box>
      <Box component="div"
        sx={{
          overflowX: 'auto',
          width: '100%',
      }}>
      <DataGridPremium
        sx={{
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: "#1493cd",
            color: "white",
            
          },
          
          }}
          getRowClassName={(params) => {
            console.log('params', params)
            return params.indexRelativeToCurrentPage % 2 == 0 ? 'even-row' : 'odd-row';
          }}
        pinnedRows={deviceData[0]}
        enableStickyHeader={true}
        getRowId={(row) => row.DeviceID}
        pagination
        checkboxSelection={true}
        disableMultipleRowSelection={true}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          //setSelectedIDs(newRowSelectionModel);
          setPreviousRowSelectionModel(rowSelectionModel)
          setRowSelectionModel(newRowSelectionModel);
          const ids = new Set(newRowSelectionModel);
          const selectedRows = deviceData.filter((row) =>
            ids.has(row.DeviceID)
          );
          onSelectRows(selectedRows);
        }}
        rowSelectionModel={rowSelectionModel}
        

        // onRowSelectionModelChange={(ids) => {
        //   setSelectedIDs(ids[0]);
        //   const selectedIDs = new Set(ids);
        //   const selectedRows = deviceData.filter((row) =>
        //     selectedIDs.has(row.DeviceID)
        //   );
        //   onSelectRows(selectedRows);
        // }}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
        detailPanelExpandedRowIds={detailPanelExpandedRowIds}
        //onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
        onDetailPanelExpandedRowIdsChange={(ids) => setDetailPanelExpandedRowIds(ids)}
        initialState={{
          ...deviceData.initialState,
          //pinnedColumns: { left: ['CompanyName'], right: ['RetireDevice'] },
          //pinnedRows: {left: ['CompanyName'], right: ['RetireDevice'] },
          pagination: { paginationModel: { pageSize: 10 } },
          columns: {
            columnVisibilityModel: {
              ClientID: false,
              DeviceID: false,
              TechID: false,
              ContactID: false,
              SlateID: false,
              ScheduledTestID: false
            },
          }
        }
        }
        pageSizeOptions={[5, 10, 25, 100]}
        editMode="row"
        filterModel={currentFilterModel}
        rows={deviceData}
        loading={deviceData.length === 0}
        columns={deviceColumns}
        onFilterModelChange={(newFilterModel) => setFilterModelFunction(newFilterModel)}
        components={{ Toolbar: CustomToolbar }}
        lenDeviceData={deviceData.length}
        />
        </Box>
    </React.Fragment>
  );
}
