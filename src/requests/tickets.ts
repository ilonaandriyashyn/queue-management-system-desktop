import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { ticketSchema } from '../types'
import { z } from 'zod'

const currentTicketSchema = z.nullable(ticketSchema)

const ticketsSchema = z.array(ticketSchema)

export type CurrentTicket = z.infer<typeof currentTicketSchema>

export type Tickets = z.infer<typeof ticketsSchema>

// TODO why request retries 3 times and only then returns failure?
export const getCurrentTicket = async (counterId: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL.COUNTER}/${counterId}/current`)
    const parsedResponse = currentTicketSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      // TODO save error state to redux
      return null
    }
    return parsedResponse.data
  } catch (e) {
    // TODO save error to redux
    return null
  }
}

export const getCreatedTickets = async (counterId: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL.COUNTER}/${counterId}/tickets/created`)
    const parsedResponse = ticketsSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      // TODO save error state to redux
      return []
    }
    return parsedResponse.data
  } catch (e) {
    // TODO save error to redux
    return []
  }
}

export const doneTicket = async (counterId: string) => {
  try {
    await axiosInstance.put(`${API_URL.COUNTER}/${counterId}/tickets/done`)
    return null
  } catch (e) {
    // TODO save error to redux
    return null
  }
}

export const nextTicket = async (counterId: string) => {
  try {
    const response = await axiosInstance.put(`${API_URL.COUNTER}/${counterId}/tickets/next`)
    const parsedResponse = ticketSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      // TODO save error state to redux
      return null
    }
    return parsedResponse.data
  } catch (e) {
    // TODO save error to redux
    return null
  }
}
