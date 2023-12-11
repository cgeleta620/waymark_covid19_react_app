import React, { useEffect, useState } from 'react';
import { calculateStats } from '../stats/stats';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';
import ApiDataItem from '.././types/ApiDataItem';
import Statistics from '../types/Statistics';

/**
 * Props for InfoComponent
 */
interface InfoComponentProps {
  apiData: ApiDataItem[]; // data from the covid api
  date: string; // the date hovered over
}

/**
 * The component displays the statistics for a certain date selected by the user by hovering in the chart.
 * The data is displayed as a list.
 * @param InfoComponentProps 
 */
const InfoComponent: React.FC<InfoComponentProps> = ({ apiData, date }) => {
  const [stats, setStats] = useState<Statistics>({
    totalPcrTests: null,
    totalRecoveredCount: null,
    currentIcuCount: null,
    currentVentilatorCount: null,
    currentHospitalizationCount: null,
    date: null,
    rollingAverage: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // calculated the stats using stats.ts
        const statsData: Statistics = await calculateStats(apiData, date);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
  }, [apiData, date]);

  // displays the data as a list.
  return (
    <Paper>
      <Typography variant="h5" gutterBottom>
        Statistics
      </Typography>
      <List>
      <ListItem>
          <ListItemText primary="Date" secondary={stats.date !== null ? stats.date : 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Total PCR Tests" secondary={stats.totalPcrTests !== null ? stats.totalPcrTests : 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Total Recovered Count"
            secondary={stats.totalRecoveredCount !== null ? stats.totalRecoveredCount : 'N/A'}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Current ICU Count" secondary={stats.currentIcuCount !== null ? stats.currentIcuCount : 'N/A'} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Current Ventilator Count"
            secondary={stats.currentVentilatorCount !== null ? stats.currentVentilatorCount : 'N/A'}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Current Hospitalization Count"
            secondary={stats.currentHospitalizationCount !== null ? stats.currentHospitalizationCount : 'N/A'}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Rolling 7 Day Average"
            secondary={stats.rollingAverage !== null ? stats.rollingAverage : 'N/A'}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default InfoComponent;
