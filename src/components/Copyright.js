import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


export default function Copyright(props) {
    return (
  <React.Fragment>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        
          LSPS Solutions<Link color="inherit" href="https://lspssolutions.com/">
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="https://www.flo-trace.com/privacy-policy/"> Privacy Policy 
      </Link>
      </Typography>
  </React.Fragment>
    );
  }