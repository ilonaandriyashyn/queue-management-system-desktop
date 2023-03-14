import { axiosInstance } from '../config/axios'
import { COUNTER_ID } from '../helpers/consts'

export const getCurrentTicket = async () => {
  return await axiosInstance.get(`/counters/${COUNTER_ID}/tickets/current`)
}

export const doneTicket = async () => {
  return await axiosInstance.put(`/counters/${COUNTER_ID}/tickets/done`)
}

export const nextTicket = async () => {
  return await axiosInstance.put(`/counters/${COUNTER_ID}/tickets/next`)
}
