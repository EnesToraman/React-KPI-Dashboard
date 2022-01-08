import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['2022-01-01', '2022-01-01', '2022-01-01', '2022-01-01', '2022-01-01', '2022-01-01','2022-01-01', '2022-01-01', '2022-01-01','2022-01-01', '2022-01-01', '2022-01-01','2022-01-01', '2022-01-01', '2022-01-01','2022-01-01', '2022-01-01', '2022-01-01',];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3,4,5,6,7],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

export const Graph1 = () => {
    return (
        <Bar options={options} data={data} />
    );
}