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
      async getUser() {
            return await httpClient.get('/authUser')
      },
      async getPassengerData() {
            return await httpClient.get('/passengerData')
      }
}
