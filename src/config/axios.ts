import axios from 'axios'
import { SERVER_URL } from '../helpers/consts'

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000
})
