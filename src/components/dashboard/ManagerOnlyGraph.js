import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { api } from '../../api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export const ManagerOnlyGraph = () => {
    const { user } = useContext(UserContext);
    const { role } = user;
    const [employeeData, setEmployeeData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const { data } = await api.getEmployeeSalary()
            setEmployeeData(data)
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
                text: 'Average Salary for Job',
            },
        },
    };

    const labels = employeeData.map(e => e.title);

    const data = {
        labels,
        datasets: [
            {
                label: 'Average Salary',
                data: employeeData.map(e => e.salary),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    if (role === 'STAFF') {
        return ''
    } else {
        return (
            <div className="row mt-4 pb-4" style={{ "backgroundColor": "white", "borderRadius": "10px" }}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Bar options={options} data={data} />
                </div>
            </div>
        )
    }
}
