import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { ticketSchema } from '../types'
import { z } from 'zod'
import { generateError } from 'zod-error'

const currentTicketSchema = z.preprocess((data) => (data === '' ? null : data), z.nullable(ticketSchema))

const ticketsSchema = z.array(ticketSchema)

export type CurrentTicket = z.infer<typeof currentTicketSchema>

export type Tickets = z.infer<typeof ticketsSchema>

export const getCurrentTicket = async (counterId: string) => {
  const response = await axiosInstance.get(`${API_URL.COUNTER}/${counterId}/tickets/current`)
  const parsedResponse = currentTicketSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}

export const getCreatedTickets = async (counterId: string) => {
  const response = await axiosInstance.get(`${API_URL.COUNTER}/${counterId}/tickets/created`)
  const parsedResponse = ticketsSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}

export const doneTicket = async (counterId: string) => {
  try {
    await axiosInstance.put(`${API_URL.COUNTER}/${counterId}/tickets/done`)
    return null
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const nextTicket = async (counterId: string) => {
  const response = await axiosInstance.put(`${API_URL.COUNTER}/${counterId}/tickets/next`)
  const parsedResponse = ticketSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}
