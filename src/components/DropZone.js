import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import BackupIcon from '@mui/icons-material/Backup';
import axios from 'axios';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 8,
  borderColor: '#F0F0F0',
  width: 270,
  height:125,
  marginTop: 30,
  marginLeft:6,
  backgroundColor: '#C2C2C2',

  color: '#bdbdbd',
  color: '#3C3C3C',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function Dropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
    //image/*
  } = useDropzone({
    accept: {'application/pdf': [".pdf"]}
    });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);


  const handleFileUpload = (event) => {
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post("https://flo-trace-api-prod-ugyxg.ondigitalocean.app/posttest", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
      .then((response) => {
		// handle the response
        console.log(response);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };







  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input type="file" {...getInputProps()} submitFileUpload={handleFileUpload}/>
        <p>Upload Test Results</p>
        <BackupIcon />
      </div>
    </div>
  );
}

