import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { api } from '../../api';

ChartJS.register(ArcElement, Tooltip, Legend);

export const EmployeeTitle = () => {
	const [employeeData, setEmployeeData] = useState([])

	useEffect(() => {
		const fetchAPI = async () => {
			const { data } = await api.getEmployeeTitle()
			setEmployeeData(data)
		}
		fetchAPI()
	}, [])

	const data = {
		labels: employeeData.map(e => e.title),
		datasets: [
			{
				label: '# of People',
				data: employeeData.map(e => e.numberOfEmployees),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	};
	return (
		<Doughnut data={data} />
	);
}