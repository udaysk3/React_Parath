import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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

export default function AddTestModal(props) {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
  
return (
    <div>
      <Modal
        open={props.openStatus}
        onClose={props.handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, textAlign:'center',borderRadius: 1 }}>
          <Alert severity='success'>{props.alertContentText}</Alert>
        <Button size="large" href="/" variant="contained" sx={{ml:1, mr: 6, mt:4, justifyContent:"center"}}>OK</Button>
        </Box>
      </Modal>
    </div>
  );
}
