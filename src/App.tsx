import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardWithChart from './components/DashboardWithChart';
import HeaderComponent from './components/HeaderComponent';
import ApiDataItem from './types/ApiDataItem';

/**
 * The main component in the app. This top level component calls the covid tracking api and stores the data in state.
 * The component also displays the Header and Dashboard components.
 */
const App: React.FC = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [dataForSelectedStates, setDataForSelectedStates] = useState<ApiDataItem[][]>([]);

  useEffect(() => {
    const fetchDataForStates = async () => {
      try {
        const promises = selectedStates.map(async (stateCode) => {
          // calling the covid tracking api (see https://covidtracking.com/data/api) for info
          const response = await axios.get(`https://api.covidtracking.com/v2/states/${stateCode}/daily/simple.json`);
          // stores data
          return response.data.data as ApiDataItem[];
        });

        const dataForStates = await Promise.all(promises);
        setDataForSelectedStates(dataForStates);
      } catch (error) {
        console.error('Error fetching data for selected states:', error);
      }
    };

    if (selectedStates.length > 0) {
      fetchDataForStates();
    } else {
      // must reset the state in order to remove all dashboards from the app.
      setDataForSelectedStates([]);
    }
  }, [selectedStates]);

  const handleStatesSelected = (selectedStates: string[]) => {
    setSelectedStates(selectedStates);
  };

  return (
    <div>
      <h1>COVID-19 Dashboard</h1>
      <HeaderComponent onStatesChanged={handleStatesSelected} />
      {dataForSelectedStates.map((data, index) => (
        <DashboardWithChart key={selectedStates[index]} stateCode={selectedStates[index]} apiData={data} />
      ))}
    </div>
  );
};

export default App;
