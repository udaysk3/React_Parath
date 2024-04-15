
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { Button } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  export default function MailMergeTableModal({
    clientId, 
    clientName, 
    selectedRowsData, 
    selectedContactsData, 
    selectedTemplate,
    openStatus,
    closeStatus}) {

    const [selectedRowDownloadData, setSelectedRowDownloadData] = useState([])

    const initialSelectionModel = selectedRowsData[0].DeviceID
    
    const handleSelectedRowChange = () => {

      const selectedRowData = selectedRowsData.filter((row) =>
        row.DeviceID === selectedRowsData[0].DeviceID);

      const selectedContactData = selectedContactsData.filter((row) =>
        row.CompanyID === selectedRowData[0].CompanyID);
      

      let newJoinedObject = {
        ...selectedContactData[0],
        ...selectedRowData[0],
      }
      setSelectedRowDownloadData(newJoinedObject);
    }


    // const handleRowClick = (params) => {
    //   setMessage(`Selected file: "${params.row.ClientFileName}"`);
    //   setEventListenerFilenameForDownload(params.row.Filename);
    //   setEventListenerClientFilenameForDownload(params.row.ClientFileName)
    // };



    useEffect(() => {
      handleSelectedRowChange()},
      [])


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


    const handleSubmit = (e) => {
      e.preventDefault();

      fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${clientName}/${selectedTemplate.replace(/ /g, '%20')}/mailmerge`, {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(selectedRowDownloadData)
          })
        .then(response => response.blob())
        .then(blob => download(blob, `${selectedTemplate}_${selectedRowDownloadData.CompanyName}_Serial_number_${selectedRowDownloadData.SerialNumber}.docx`))
      }

      const handleSubmitPDF = (e) => {
        e.preventDefault();
  
        fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${clientName}/${selectedTemplate.replace(/ /g, '%20')}/mailmergepdf`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(selectedRowDownloadData)
            })
          .then(response => response.blob())
          .then(blob => download(blob, `${selectedTemplate}_${selectedRowDownloadData.CompanyName}_Serial_number_${selectedRowDownloadData.SerialNumber}.pdf`))
        }


    useEffect(() => {
      console.log('Data', selectedRowDownloadData)},
      [selectedRowDownloadData])


    const mailMergeColumns = [
        { field: 'DeviceID', headerName: 'Device ID', editable: true, type:"number", width: 75 },
        { field: 'SerialNumber', headerName: 'Serial Number', editable: true, width: 175},
        { field: 'CompanyName', headerName: 'Company Name', editable: true, width: 250 },
        { field: 'Location', headerName: 'Device Location', editable: true,width: 250 }, 
        //{ field: 'DeviceType', headerName: 'Device Type', editable: true,width: 140 },
        //{ field: 'ContactName', headerName: 'Contact Name', editable: true,width: 125 }, 
        //{ field: 'ContactLastName', headerName: 'Contact Last Name', editable: true,width: 200 }, 
        //{ field: 'ContactTitle', headerName: 'Contact Job Title', editable: true,width: 125 }, 
        //{ field: 'ContactAddress', headerName: 'Contact Street Address', editable: true,width: 200 }, 
        { field: 'Download Word', width: 225, headerName: 'Download Word', renderCell: 
        (params) => (
            <FileDownloadIcon onClick={handleSubmit}/>
          )
          },
          
          { field: 'Download PDF', width: 225, headerName: 'Download PDF (Coming Soon)', renderCell: 
          (params) => (
            <FileDownloadIcon color="disabled"/>

              //<FileDownloadIcon onClick={handleSubmitPDF}/>
            )
            },    
        ]



  
    return (
      <div>
        <Modal
          open={openStatus}
          onClose={closeStatus}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{mb: 4 }} id="modal-modal-title" variant="h6" component="h2">
              Generate and download letters for selected devices: {selectedTemplate}
            </Typography>   

            <Typography sx={{mb: 4 }} id="modal-modal-title" variant="h6" component="h2">
              {`For MS Word, after downloading, select "Options", then "Remove Data Source" to open file`}
            </Typography> 

            {/* <Typography sx={{mb: 4 }} id="modal-modal-title" variant="h6" component="h2">
              {`Or download template below:`}
            </Typography>    */}
                        {/* <Button variant="contained">Download Data Source</Button> */}

 

            <DataGridPremium
                pagination
                //pageSizeOptions={[5, 10, 25, 100]}
                //onRowClick={handleRowClick} 
                getRowId={(row) => row.DeviceID}
                rows={selectedRowsData}
                columns={mailMergeColumns}
                rowSelectionModel={initialSelectionModel}
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRowData = selectedRowsData.filter((row) =>
                    selectedIDs.has(row.DeviceID)
                  );

                  const selectedContactData = selectedContactsData.filter((row) =>
                    row.CompanyID === selectedRowData[0].CompanyID);

                    let joinedObject = {
                      ...selectedContactData[0],
                      ...selectedRowData[0]
                  }
                  setSelectedRowDownloadData(joinedObject);}}
                initialState={{
                    rowSelectionModel:{initialSelectionModel},
                    pagination: { paginationModel: { pageSize: 10 }},
                    columns: {
                      columnVisibilityModel: {
                        DeviceID: false,
                      },
                    },
                  }}
            />

            <br></br>
            {/* <Typography sx={{mb: 4 }} id="modal-modal-title" variant="h6" component="h2">
              Ensure you have the correct data source for the Mail Merge by downloading this file first:
            </Typography> 
            <Button variant="contained">Download Data Source</Button> */}

            <Grid>
            </Grid>
          </Box>
          </Modal>
      </div>
    );
  }