import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

export default function NewDeviceTypeModal(props) {

  const [newEnteredDeviceTypeValue, setNewEnteredDeviceTypeValue] = useState("")


  const deviceSubmitHandler = () => {
    props.onSaveDeviceType(newEnteredDeviceTypeValue);
    props.handleModalCloseDevice();
  }


return (
    <div>
      <Modal
        open={props.openStatusDevice}
        onClose={props.handleModalCloseDevice}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, textAlign:'center',borderRadius: 2 }}>
          <Typography variant="h6">Enter new device type:</Typography>
        <TextField
              sx={{mt:4, mr:2, width:300 }}
              id="outlined-select-currency"
              label="Device Type"
              required
              onChange={e => setNewEnteredDeviceTypeValue(e.target.value)}
            >
            </TextField>
          <Button type="submit" onClick={deviceSubmitHandler} size="large" variant="contained" sx={{ml:1, mr: 6, mt:4, justifyContent:"center"}}>OK</Button>
        </Box>
      </Modal>
    </div>
  );
}
