import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LicenseInfo } from '@mui/x-license-pro';

//LicenseInfo.setLicenseKey('e461d7c732ceffecb5ec949f0da9303dTz01ODYzOSxFPTE3MDY0ODgyMDU1NTgsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y');
LicenseInfo.setLicenseKey('59754989333e03db326c9decffc3e814Tz04MzMxNyxFPTE3MzgzMjk5MTUwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
