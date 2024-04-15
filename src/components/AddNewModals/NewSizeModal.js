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
  boxShadow: 24,
  p: 4,
  
};

export default function NewSizeModal(props) {

  const [newEnteredSizeValue, setNewEnteredSizeValue] = useState("")

  const sizeSubmitHandler = () => {
    props.onSaveSize(newEnteredSizeValue);
    props.handleModalCloseSize();
  }

  
return (
    <div>
      <Modal
        open={props.openStatusSize}
        onClose={props.handleModalCloseSize}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, textAlign:'center',borderRadius: 2 }}>
          <Typography variant="h6">Enter new size:</Typography>
        <TextField
              sx={{mt:4, mr:2, width:300 }}
              id="outlined-select-currency"
              label="Size"
              required
              
              // helperText="Select manufacturer"
              //value={formData.manufacturer}
              //onChange={e => props.passNewManufacturerValue(e.target.value)}
              onChange={e => setNewEnteredSizeValue(e.target.value)}
            >
            </TextField>
          <Button type="submit" onClick={sizeSubmitHandler} size="large" variant="contained" sx={{ml:1, mr: 6, mt:4, justifyContent:"center"}}>OK</Button>
        </Box>
      </Modal>
    </div>
  );
}
