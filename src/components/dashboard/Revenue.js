import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { api } from '../../api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Revenue = () => {
	const [revenueData, setRevenueData] = useState([])

	useEffect(() => {
		const fetchAPI = async () => {
			const { data } = await api.getRevenue()
			setRevenueData(data)
		}
		fetchAPI()
	}, [])


	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom'
			},
			title: {
				display: true,
				text: 'Revenue per Day',
			},
		},
	};

	const labels = revenueData.map(revenue => revenue.date);

	const data = {
		labels,
		datasets: [
			{
				label: 'Revenue',
				data: revenueData.map(revenue => revenue.totalPrice),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	return (
		<Bar options={options} data={data} />
	);
}