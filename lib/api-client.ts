import Axios, { AxiosRequestConfig } from 'axios'

export const api = Axios.create({
  baseURL: 'https://dummyjson.com/',
})

api.interceptors.response.use((response) => {
  return response.data
})
