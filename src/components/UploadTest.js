import React from "react";
import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadTest(props) {

  return(
    <div>
    <Button
      size="large"
      component="label"
      onChange={props.onUploadTestFile}
      sx={{ml: 1, mr: 6, mt: 4, mb: 4,border: '2px dashed black', borderColor: 'grey.500', backgroundColor:'grey.500', width:265}}  
      variant="contained"
      color="primary"
      startIcon={<CloudUploadIcon />}
      Upload File
      >
      <input type="file" hidden accept=".pdf, .doc, .docx"/>
    </Button>
   
    </div>
  )
}
