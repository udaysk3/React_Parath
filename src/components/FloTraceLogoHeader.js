import flotraceLogo from "../logo.jpg"
import Box from '@mui/material/Box';

export default function FloTraceLogoHeader() {

  return (
  <Box
  component="img"
  sx={{
    height: 250,
    width: 250,
    mt: 0,
    ml: 0,
    position: 'relative',
    top: 20,
    borderRadius:50,
    border: '1px solid grey',
    // boxShadow: "-15px -5px 15px -1px #CECECE"
  }}
  alt="Flo-Trace Logo"
  src={flotraceLogo}
/>
  )
  
  
  
  // <img src={flotraceLogo} alt="Flo-Trace logo"  />
}
