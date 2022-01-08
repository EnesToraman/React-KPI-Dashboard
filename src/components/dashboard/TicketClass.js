import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { api } from '../../api';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TicketClass = () => {
	const [ticketClassData, setTicketClassData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			const { data } = await api.getTicketClass()
			setTicketClassData(data)
		}
		fetchAPI()
	}, [])

	const data = {
		labels: ['Business Tickets', 'Economy Tickets'],
		datasets: [
			{
				label: 'Tickets',
				data: ticketClassData.map((t) => t.numberOfTickets),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
				],
				borderWidth: 1,
			},
		],
	};
	return (
		<Pie data={data} />
	);
}
