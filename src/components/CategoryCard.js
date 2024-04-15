import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Title from './Title';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';


export default function CategoryCard(props) {
  const theme = useTheme();

  return (      

      <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', p:2,  }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          {props.title}
          </Typography>
          <Typography component="p" variant="h4" color={props.valueColor} >
          {props.valNumDevices}
          </Typography>
        </CardContent>
        <Button 
            variant="outlined"
            color="primary"
            onClick={props.onClickSeeDevices}
            >
        See Devices
        </Button>
      </Box>
      <Box
        sx={{ width: 51, height: "100%",}}
        backgroundColor="#277233
        "
      />
      </Card>
      
  );
}