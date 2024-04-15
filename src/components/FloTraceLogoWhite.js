import whiteLogo from '../logo-white.png'
import test from '../'
import Box from '@mui/material/Box';

export default function FloTraceLogoWhite() {

  return (
  <Box
  component="img"
  sx={{
    height: 260,
    width: 255,
    mt: 4,
    borderRadius:6,
    // border: '1px solid grey',
    // boxShadow: "-15px -5px 15px -1px #CECECE"
  }}
  alt="Flo-Trace Logo"
  src={whiteLogo}
/>
  )
  
  
  
  // <img src={flotraceLogo} alt="Flo-Trace logo"  />
}
