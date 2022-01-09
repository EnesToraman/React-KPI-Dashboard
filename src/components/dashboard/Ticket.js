import { useState, useEffect } from "react"
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { Dropdown } from "react-bootstrap";

import { api } from "../../api";
import { compose, identity, unique, prop, map } from "../../utils";

Chart.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
)

const convert = element => ({ ...element, numberOfPassengers: 0 })

const depPlaceProp = prop('depPlace')
const classProp = prop('class')
const dateProp = prop('date')

const mapConvertPassengers = predicate => map(passenger => predicate(passenger) ? passenger : convert(passenger))

const depPlacePredicate = depPlace => element => depPlaceProp(element) === depPlace
const classPredicate = className => element => classProp(element) === className

const uniqueFor = prop => compose(unique, map(prop))

const uniqueClassess = uniqueFor(classProp)
const uniqueCountries = uniqueFor(depPlaceProp)
const uniqueDates = uniqueFor(dateProp)

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
   
      const labels = uniqueDates(ticketData)
      const countries = uniqueCountries(ticketData) 
      const classess = uniqueClassess(ticketData)
        
      const filteredPassengerData = compose(
            classFilter ? mapConvertPassengers(classPredicate(classFilter)) : mapConvertPassengers(identity),
            countryFilter ? mapConvertPassengers(depPlacePredicate(countryFilter)) : mapConvertPassengers(identity)
      )(ticketData)

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