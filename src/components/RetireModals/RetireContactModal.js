import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  
};

export default function RetireContactModal({openStatus, handleCloseModal, retireContact}) {

  
return (
    <div>
      <Modal
        open={openStatus}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, textAlign:'center',borderRadius: 2 }}>
          <Typography variant="h5">Are you sure you wish to delete this?</Typography>
          <Typography variant="h6">This action cannot be undone.</Typography>
          <Button onClick ={retireContact} size="large" variant="contained" color="success">Submit</Button>            
          <Button onClick ={handleCloseModal} size="large" sx={{ml:2}} href="/" variant="contained" color="error">Cancel</Button>  
        </Box>
      </Modal>
    </div>
  );
}
