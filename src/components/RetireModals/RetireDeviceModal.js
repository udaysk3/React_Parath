import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import NoDeviceSelectedModal from '../NoDeviceSelectedModal';
import MuiAlert from '@mui/material/Alert';



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

export default function RetireDeviceModal({clientId, openStatus, retireDevice, handleCloseModal, rowSelectionModel}) {

  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });
  
  //const [alert, setAlert] = useState(false);
  //const [alertContent, setAlertContent] = useState('');



return (
    <div>
      {/* <NoDeviceSelectedModal open={deleteDeviceModal} handleClose={handleDeleteDeviceModalClose} /> */}
      <Modal
        open={openStatus}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, textAlign:'center',borderRadius: 2 }}>
          <Typography variant="h5">Are you sure you wish to delete this?</Typography>
          <Typography variant="h6">This action cannot be undone.</Typography>
          <Button type="submit" onClick ={retireDevice} size="large" variant="contained" color="success">Submit</Button>
          <Button onClick ={handleCloseModal} size="large" sx={{ml:2}} href="/" variant="contained" color="error">Cancel</Button>  
        </Box>

      </Modal>
              {/* {alert ? <Alert severity='success'>{alertContent}</Alert>  : <></> } */}

      
    </div>
  );
}
