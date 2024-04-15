import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { ForkLeft } from '@mui/icons-material';


export default function FileCabinet(props) {


  const rows = [
    {
      id: 1,
      name: 'Matheus',
      quantity: 5,
      unitPrice: 'Test',
      total: 'Test',
    },
    {
      id: 2,
      name: 'Matheus',
      quantity: 5,
      unitPrice: 'Test',
      total: 'Test',
    },
  ]


  const [timelineDataFileCabinet, setTimelineDataFileCabinet] = React.useState([]);

  React.useEffect(() => {
    //console.log("In File Cabinet prop", props.timelineData.data)
    //setTimelineDataFileCabinet(props.timelineData.data[1]);
  }, [])

  return (
    <Timeline position="left"> 
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
         Overdue Notice Generated
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="error"/>
          <TimelineConnector /> 
        </TimelineSeparator>
        <TimelineContent>12/13/2023</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          30 Day Notice Generated
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="warning"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>11/13/2023</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          90 Day Notice Generated
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>9/13/2023</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          New Device Letter Generated
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>6/12/2023</TimelineContent>
      </TimelineItem>
    </Timeline>
  )
  }


  