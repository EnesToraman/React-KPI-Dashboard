import { useState, useEffect } from "react"
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { Dropdown } from "react-bootstrap";
import { api } from "../../api";

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


export const Ticket = () => {
      const [ticketData, setTicketData] = useState([]);
      const [countryFilter, setCountryFilter] = useState("");
      const [classFilter, setClassFilter] = useState("");

      useEffect(() => {
            const fetchAPI = async () => {
                  const { data } = await api.getTicketData()
                  setTicketData(data)
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
                        text: 'Tickets per Day',
                  },
            },
      };

      const labels = unique(ticketData.map((p) => p.date))
      const countries = unique(ticketData.map(p => p.depPlace))
      const classess = unique(ticketData.map(p => p.class))

      const filters = compose(
            classFilter ? classPredicate(classFilter) : identity,
            countryFilter ? depPlacePredicate(countryFilter) : identity
      )
      const filteredPassengerData = map(filters)(ticketData)

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
                        label: 'Tickets',
                        data: numPassengers,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
            ],
      };

      return (
                  <div className="row mt-4 pb-4" style={{ "backgroundColor": "white", "borderRadius": "10px"}}>
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
                  </div>
      )
}