import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ChartComponent from './ChartComponent';
import NameComponent from './NameComponent';
import InfoComponent from './InfoComponent';
import ApiDataItem from '.././types/ApiDataItem';
import '../styles/components/DashboardWithChartStyle.css';

/**
 * Props for DashboardWithChart Component.
 */
interface DashboardWithChartProps {
  stateCode: string; // selected state from user
  apiData: ApiDataItem[]; // the data array for the state from the api.
}

/**
 * This function represents the dashboard. On the left is the NameComponent and below it is the InfoComponent. On the right side is the ChartComponent.
 * Uses Grid layout to determine placement.
 * @param DashboardWithChartProps 
 */
const DashboardWithChart: React.FC<DashboardWithChartProps> = ({ stateCode, apiData }) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // hands the changing date when a user hovers ina different spot.
  const handleHoverDateChange = (date: string | null) => {
    setHoveredDate(date);
  };

  return (
    <div className="dashboardRoot">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className="dashboardGridItem">
          <NameComponent stateName={stateCode} />
          <InfoComponent apiData={apiData} date={hoveredDate || ''} />
        </Grid>
        <Grid item xs={12} sm={6} className="dashboardGridItem">
          <ChartComponent stateCode={stateCode} apiData={apiData} onHoverDateChange={handleHoverDateChange} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardWithChart;
