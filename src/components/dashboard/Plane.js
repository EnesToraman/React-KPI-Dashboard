import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { api } from '../../api';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Plane = () => {
  const [planeData, setPlaneData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await api.getPlanes()
      setPlaneData(data)
    }
    fetchAPI()
  }, [])

  const data = {
    labels: planeData.map(p => p.airlineName),
    datasets: [
      {
        label: 'Planes',
        data: planeData.map(p => p.numberOfPlanes),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie data={data} />
  );
}
