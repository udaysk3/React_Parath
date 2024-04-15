import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TemplateDropdown from './TemplateDropdown';
import NoLettersSelectedModal from './NoLettersSelectedModal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function GenerateLettersModal({clientId, clientName, selectedRowsData, selectedContactsData}) {
  const [open, setOpen] = useState(false);
  
  const [noSelectedRowsModal, setNoSelectedRowsModal] = useState(false);
  const handleNoSelectedRowsModalOpen = () => setNoSelectedRowsModal(true);
  const handleNoSelectedRowsModalClose = () => setNoSelectedRowsModal(false);


  const handleGenerateLettersModalOpen = () => {

    console.log("Selected rows in Generate letters modal", selectedRowsData.length)
    
    if (selectedRowsData.length === 0) {
      console.log("selected rows length", selectedRowsData.length)
      handleNoSelectedRowsModalOpen();
    }
    else {
      setOpen(true);
    }
  }
  const handleGenerateLettersModalClose = () => setOpen(false);


  return (
    <div>
      <NoLettersSelectedModal open={noSelectedRowsModal} handleClose={handleNoSelectedRowsModalClose} />
      <Button variant= "contained" onClick={handleGenerateLettersModalOpen} sx={{ mt: 2,  mb: 4, width:"30%", color:'white'}}>GENERATE LETTERS</Button>
      <Modal
        open={open}
        onClose={handleGenerateLettersModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{mb: 4 }} id="modl-modal-title" variant="h6" component="h2">
            Select a template:
          </Typography>
          <Grid>
          <TemplateDropdown clientId={clientId} clientName={clientName} selectedRowsData={selectedRowsData} selectedContactsData={selectedContactsData} closeGenerateLettersModal={handleGenerateLettersModalClose} />
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
