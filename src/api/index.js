import axios from 'axios'

const baseURL = 'http://localhost:8080'

export const httpClient = axios.create({
	withCredentials: true,
	baseURL,
	headers: {
		'Content-Type': 'application/json'
	}
})

export const api = {
	async signUp(params) {
		return await httpClient.post('/signUp', params)
	},
	async login(params) {
		return await httpClient.post('/login', params)
	},
	async logout() {
		return await httpClient.post('/logout')
	},
	async getUser() {
		return await httpClient.get('/authUser')
	},
	async getTicketData() {
		return await httpClient.get('/ticketCountGroupByDate')
	},
	async getRevenue() {
		return await httpClient.get('/totalPriceGroupByDate')
	},
	async getAverageTicketPrice() {
		return await httpClient.get('/averageTicketPriceGroupByDate')
	},
	async getTicketClass() {
		return await httpClient.get('/ticketCountGroupByClass')
	},
	async getEmployeeTitle() {
		return await httpClient.get('/employeeCountGroupByTitle')
	},
	async getPlanes() {
		return await httpClient.get('/planeCountGroupByAirline')
	},
	async getEmployeeSalary() {
		return await httpClient.get('employeeAverageSalaryGroupByTitle')
	}
}
