import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ApiDataItem from '.././types/ApiDataItem';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale'; 
import '../styles/components/ChartComponentStyle.css';

/**
 * Props for the ChartComponent.
 */
interface ChartComponentProps {
  stateCode: string; // the current state 
  onHoverDateChange: (date: string | null) => void; // hover function on chart
  apiData: ApiDataItem[]; // the data from the api to display in the chart.
}

/**
 * The component displays the chart for a state in the dashboard using the data from the covid api.
 * @param ChartComponentProps
 */
const ChartComponent: React.FC<ChartComponentProps> = ({ stateCode, onHoverDateChange, apiData }) => {
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [],
  });
  const [chartMode, setChartMode] = useState<'cases' | 'hospitalizations'>('cases');
  const [tabValue, setTabValue] = useState(0);

  // chart.js V3 options.
  // v2 is different and will cause unexpected problems...
  const options: any = {
    scales: {
      x: 
        {
          type: 'time',
          // v3 requires an adapter, in v2 this was automatically done for you.
          adapters: { 
            date: {
              locale: enUS, 
            },
          }, 
          time: {
            parser: 'yyyy-MM-dd',
            unit: 'day',
            displayFormats: {
              day: 'MMM d',
            },
          },
          position: 'bottom',
        },
      y: 
        {
          type: 'linear',
          position: 'left',
        },
    },
    onHover: (_: any, activeElements: string | any[]) => {
      if (activeElements && activeElements.length > 0) {
        const index = activeElements[0].index;
        const date = chartData.labels[index];
        onHoverDateChange(date);
      } else {
        onHoverDateChange(null);
      }
    },
  };

  useEffect(() => {
    const labels: string[] = apiData.map((day: ApiDataItem) => day.date);

    let dataToUse: number[];
    if (chartMode === 'cases') { // determines what data to use.
      dataToUse = apiData.map((day: ApiDataItem) => day.cases.total);
    } else {
      dataToUse = apiData.map((day: ApiDataItem) => day.outcomes.hospitalized.total);
    }

    setChartData({
      labels,
      datasets: [
        {
          // two options from the data to display. Using tabs to switch between them.
          label: chartMode === 'cases' ? 'Total Cases' : 'Total Hospitalizations',
          data: dataToUse,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
        },
      ],
    });
  }, [apiData, chartMode]);

  // used to switch tabs
  const toggleChartMode = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
    setChartMode(newValue === 0 ? 'cases' : 'hospitalizations');
  };

  return (
    <div className="chartContainer">
      <h2>{`COVID-19 Total ${chartMode === 'cases' ? 'Cases' : 'Hospitalizations'} in ${stateCode}`}</h2>
      <Tabs
        value={tabValue}
        onChange={toggleChartMode}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Cases" />
        <Tab label="Hospitalizations" />
      </Tabs>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default ChartComponent;
