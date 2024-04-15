import flotraceLogo from "../logo.jpg"
import Box from '@mui/material/Box';

export default function FloTraceLogo() {

  return (
  <Box
  component="img"
  sx={{
    height: 260,
    width: 255,
    mt: 4,
    borderRadius:6,
    border: '1px solid grey',
    boxShadow: "-15px -5px 15px -1px #CECECE"
  }}
  alt="Flo-Trace Logo"
  src={flotraceLogo}
/>
  )
  
  
  
  // <img src={flotraceLogo} alt="Flo-Trace logo"  />
}
