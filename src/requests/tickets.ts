import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { ticketSchema } from '../types'
import { z } from 'zod'
import { generateError } from 'zod-error'

const currentTicketSchema = z.nullable(ticketSchema)

const ticketsSchema = z.array(ticketSchema)

export type CurrentTicket = z.infer<typeof currentTicketSchema>

export type Tickets = z.infer<typeof ticketsSchema>

export const getCurrentTicket = async (counterId: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL.COUNTER}/${counterId}/tickets/current`)
    const parsedResponse = currentTicketSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      const e = generateError(parsedResponse.error)
      console.error(e.message)
      return null
    }
    return parsedResponse.data
  } catch (e) {
    console.error(e)
    return null
  }
}

export const getCreatedTickets = async (counterId: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL.COUNTER}/${counterId}/tickets/created`)
    const parsedResponse = ticketsSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      const e = generateError(parsedResponse.error)
      console.error(e.message)
      return []
    }
    return parsedResponse.data
  } catch (e) {
    console.error(e)
    return []
  }
}

export const doneTicket = async (counterId: string) => {
  try {
    await axiosInstance.put(`${API_URL.COUNTER}/${counterId}/tickets/done`)
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}

export const nextTicket = async (counterId: string) => {
  try {
    const response = await axiosInstance.put(`${API_URL.COUNTER}/${counterId}/tickets/next`)
    const parsedResponse = ticketSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      const e = generateError(parsedResponse.error)
      console.error(e.message)
      return null
    }
    return parsedResponse.data
  } catch (e) {
    console.error(e)
    return null
  }
}
