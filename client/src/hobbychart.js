import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const HobbyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/hobbies') // your Express route
      .then(res => res.json())
      .then(data => {
        const chartData = data.map(hobby => ({
          name: hobby.name,
          hours: hobby.totalHours || 0,
        }));
        setData(chartData);
      });
  }, []);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Time Spent per Hobby</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hours" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HobbyChart;
