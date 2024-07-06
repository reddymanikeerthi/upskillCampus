import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    fetchTrafficData();
  }, []);

  const fetchTrafficData = async () => {
    try {
      const response = await axios.get('/api/traffic-data');
      setTrafficData(response.data);
    } catch (error) {
      console.error('Error fetching traffic data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Traffic Management System</h1>
        <TrafficDataList data={trafficData} />
      </header>
    </div>
  );
}

function TrafficDataList({ data }) {
  return (
    <div>
      <h2>Real-Time Traffic Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.timestamp} - {item.sensor_id}: {item.traffic_count} vehicles
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
