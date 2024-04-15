import React, { useState } from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadDeviceFile(props) {

  return(
    <div>
    <Button
      size="large"
      component="label"
      onChange={props.onUploadDeviceFile}
      sx={{ml: 1, mr: 6, mt: 4, mb: 4, borderColor: '#2292cc', backgroundColor:'#2292cc', width:265}}  
      variant="contained"
      color="primary"
      startIcon={<CloudUploadIcon />}
      Upload File
      >
        Upload
      <input type="file" hidden accept="image/*, .pdf, .doc, .docx, .csv, .xlsx"/>
    </Button>
   
    </div>
  )
}
