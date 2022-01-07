import { useState, useContext, useEffect } from "react"
import { UserContext } from "../App"
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { Container, Dropdown } from "react-bootstrap";
import { api } from "../api/api";
import { Logout } from "./Logout"

Chart.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
)


const map = predicate => arr => arr.map(el => predicate(el) ? el : ({ ...el, numberOfPassengers: 0 }))
const depPlacePredicate = depPlace => element => element.depPlace === depPlace
const classPredicate = className => element => element.class === className
const unique = (array) => Array.from(new Set([...array]))
const compose = (...fns) => arg => fns.reduceRight((acc, fn) => fn(acc), arg)

const identity = x => x


export const Dashboard = () => {
      const [passengerData, setPassengerData] = useState([]);
      const { user } = useContext(UserContext);
      const { role } = user;
      const [dateFilter, setDateFilter] = useState("");
      const [countryFilter, setCountryFilter] = useState("");

      const [classFilter, setClassFilter] = useState("");
 
      useEffect(() => {
            const fetchAPI = async () => {
                  const { data } = await api.getTicketData()
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


      const labels = unique(passengerData.map((p) => p.date))
      const countries = unique(passengerData.map(p => p.depPlace))
      const classess = unique(passengerData.map(p => p.class))


      const filters = compose(
            classFilter ? classPredicate(classFilter) : identity,
            countryFilter ? depPlacePredicate(countryFilter): identity
      )
      const filteredPassengerData = map(filters)(passengerData)
 
      const passengerByDate = filteredPassengerData.reduce((passengerByDate, passenger) => {
            if (passengerByDate[passenger.date]) {
                  passengerByDate[passenger.date] += passenger.numberOfPassengers
            } else {
                  passengerByDate[passenger.date] = passenger.numberOfPassengers
            }
            return passengerByDate
      }, {})

      const numPassengers = Object.values(passengerByDate)
      const data = {
            labels,
            datasets: [
                  {
                        label: 'Passengers',
                        data: numPassengers,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
            ],
      };

      return (
            <Container>
                  <Logout />
                  <div className="row ">
                        <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                              <Bar options={options} data={data} />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 align-self-center" style={{ "textAlign": "left" }}>
                              <div className="row mb-4 ps-5">
                                    <div className="col">
                                          <Dropdown>
                                                <Dropdown.Toggle style={{ "backgroundColor": "pink", "border": "none" }} id="dropdown-basic">
                                                      {classFilter ? classFilter : "Class"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                      <Dropdown.Item onClick={() => setClassFilter("")}>
                                                            All
                                                      </Dropdown.Item>
                                                      {classess.map((className, index) =>
                                                            <Dropdown.Item key={index} onClick={() => setClassFilter(className)}>
                                                                  {className}
                                                            </Dropdown.Item>)}
                                                </Dropdown.Menu>
                                          </Dropdown>
                                    </div>
                              </div>
                              <div className="row ps-5">
                                    <div className="col">
                                          <Dropdown>
                                                <Dropdown.Toggle style={{ "backgroundColor": "pink", "border": "none" }} id="dropdown-basic">
                                                      {countryFilter ? countryFilter : "From: Country"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                      <Dropdown.Item onClick={() => setCountryFilter("")}>
                                                            All
                                                      </Dropdown.Item>
                                                      {countries.map((country, index) =>
                                                            <Dropdown.Item key={index} onClick={() => setCountryFilter(country)}>
                                                                  {country}
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