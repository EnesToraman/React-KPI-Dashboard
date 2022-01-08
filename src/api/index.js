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
            return await httpClient.post('/sign-up', params)
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
            return await httpClient.get('/ticketData')
      },
      async getTicketDataByDate(date) {
            return await httpClient.get(`/ticketData/${date}`)
      }
}
