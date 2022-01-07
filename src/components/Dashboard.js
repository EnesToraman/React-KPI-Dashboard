import { useState, useContext, useEffect } from "react"
import { UserContext } from "../App"
import { Chart } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { Container, Dropdown } from "react-bootstrap";
import { api } from "../apis/api";

export const Dashboard = () => {
      const [passengerData, setPassengerData] = useState([]);
      const { user } = useContext(UserContext);
      const { role } = user;
      const [dateFilter, setDateFilter] = useState("");

      useEffect(() => {
            const fetchAPI = async () => {
                  const { data } = await api.getPassengerData()
                  setPassengerData(data)
            }
            fetchAPI()
      }, [])

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

      const labels = passengerData.map((p) => p.date);

      const data = {
            labels,
            datasets: [
                  {
                        label: 'Passengers',
                        data: passengerData.map((p) => p.numberOfPassengers),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
            ],
      };

      return (
            <Container>
                  <div className="row ">
                        <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                              <Bar options={options} data={data} />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 align-self-center" style={{ "textAlign": "left" }}>
                              <div className="row mb-4 ps-5">
                                    <div className="col">
                                          <Dropdown>
                                                <Dropdown.Toggle style={{"backgroundColor": "pink", "border": "none"}} id="dropdown-basic">
                                                      {dateFilter ? dateFilter : "Class"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                      <Dropdown.Item onClick={() => setDateFilter("")}>
                                                            All
                                                      </Dropdown.Item>
                                                      {passengerData.map((p) =>
                                                            <Dropdown.Item onClick={() => setDateFilter(p.date)}>
                                                                  {p.date}
                                                            </Dropdown.Item>)}
                                                </Dropdown.Menu>
                                          </Dropdown>
                                    </div>
                              </div>
                              <div className="row ps-5">
                                    <div className="col">
                                          <Dropdown>
                                                <Dropdown.Toggle style={{"backgroundColor": "pink", "border": "none"}} id="dropdown-basic">
                                                      {dateFilter ? dateFilter : "From: Country"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                      <Dropdown.Item onClick={() => setDateFilter("")}>
                                                            All
                                                      </Dropdown.Item>
                                                      {passengerData.map((p) =>
                                                            <Dropdown.Item onClick={() => setDateFilter(p.date)}>
                                                                  {p.date}
                                                            </Dropdown.Item>)}
                                                </Dropdown.Menu>
                                          </Dropdown>
                                    </div>
                              </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                              <Bar options={options} data={data} />
                        </div>
                  </div>

                  <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                              {role == 'STAFF' ? 'staff' : 'admin'}
                        </div>
                  </div>
            </Container>
      )
}