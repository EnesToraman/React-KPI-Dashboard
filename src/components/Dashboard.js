import { useContext } from "react"
import { UserContext } from "../App"
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
import { Container } from "react-bootstrap";

export const Dashboard = () => {
      const { user } = useContext(UserContext)
      const { email } = user

      const options = {
            responsive: true,
            plugins: {
                  legend: {
                        position: 'top',
                  },
                  title: {
                        display: true,
                        text: 'Passengers per Day',
                  },
            },
      };

      const labels = ['01.01.2022', '02.01.2022', '03.01.2022', '04.01.2022', '05.01.2022', '06.01.2022', '07.01.2022',
            '08.01.2022', '09.01.2022', '10.01.2022', '11.01.2022', '12.01.2022', '13.01.2022', '14.01.2022'];

      const data = {
            labels,
            datasets: [
                  {
                        label: 'Passengers',
                        data: [10, 20, 30, 40, 5, 6, 7],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
            ],
      };

      return (
            <Container>
                  <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                              <Bar options={options} data={data} />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                              <Bar options={options} data={data} />
                        </div>
                  </div>
            </Container>
      )
}