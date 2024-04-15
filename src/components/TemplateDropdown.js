import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MailMergeTableModal from '../components/LetterGeneration/MailMergeTableModal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


export default function TemplateDropdown({clientId, clientName, selectedRowsData, selectedContactsData, closeGenerateLettersModal}) {
  
  const [templateSelection, setTemplateSelection] = useState('');
  const [templateTypes, setTemplateTypes] = useState([]);
  const [mailMergeModalOpen, setMailMergeModalOpen] = useState(false);
  const handleOpen = () => setMailMergeModalOpen(true);
  const handleClose = () => setMailMergeModalOpen(false);
  const handleChange = (event) => {
    setTemplateSelection(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Executing handle submit');
    //props.closeGenerateLettersModal();
    console.log('Closed Modal');
    console.log(mailMergeModalOpen);
    // setMailMergeModalOpen(true);
    handleOpen();
    console.log('Mail merge modal open', mailMergeModalOpen)
    

  }


  // FETCH TEMPLATE NAMES
  useEffect(() => {
    fetch(`https://flo-trace-api-prod-ugyxg.ondigitalocean.app/${clientId}/${clientName}/getclienttemplatenames`)
    .then(response => response.json())
    .then(data =>setTemplateTypes(data.data))
    }, []); 

  return (
      <Box sx={{ minWidth: 120 }}>
      <MailMergeTableModal clientId={clientId} clientName={clientName} selectedTemplate={templateSelection} openStatus={mailMergeModalOpen} closeStatus={handleClose} selectedRowsData={selectedRowsData} selectedContactsData={selectedContactsData}/>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Template</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={templateSelection}
          label="Template"
          onChange={handleChange}
        >
        {templateTypes.map((option) => (
            <MenuItem key={option.ID} value={option.templateName}>
                {option.templateName}
            </MenuItem>))}
        </Select>
          <Grid sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent:'center'}}>
            <Button onClick={handleSubmit} variant= "contained" sx= {{mt:2}}>Submit</Button>
            <Button onClick={closeGenerateLettersModal} variant= "contained" sx= {{mt:2, ml:4}}>Cancel</Button>
          </Grid>
      </FormControl>
      </Box>
  );
}