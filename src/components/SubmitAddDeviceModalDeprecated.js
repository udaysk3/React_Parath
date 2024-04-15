// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Grid from '@mui/material/Grid';


// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function SubmitAddDeviceModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <Button variant= "contained" onClick={handleOpen} sx={{ mt: 2,  mb: 4}}>Submit</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Would you like to add test results now?
//           </Typography>
//         <Grid>
//           <Button variant= "contained" onClick={handleOpen} sx={{ ml: 12, mr: 4, mt:4}}>YES</Button>
//           <Button variant= "contained" onClick={handleOpen} sx={{ mt:4}}>NO</Button>
//         </Grid>

//           {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography> */}
//         </Box>
//       </Modal>
//     </div>
//   );
// }
