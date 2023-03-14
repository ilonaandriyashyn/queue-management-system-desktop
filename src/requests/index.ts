import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'

export const getCurrentTicket = async () => {
  return await axiosInstance.get(`${API_URL.TICKET}/current`)
}

export const doneTicket = async () => {
  return await axiosInstance.put(`${API_URL.TICKET}/done`)
}

export const nextTicket = async () => {
  return await axiosInstance.put(`${API_URL.TICKET}/next`)
}
