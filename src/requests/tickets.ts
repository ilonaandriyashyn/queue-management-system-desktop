import { axiosInstance } from '../config/axios'
import { ticketSchema } from '../types'
import { z } from 'zod'
import { generateError } from 'zod-error'

const currentTicketSchema = z.preprocess((data) => (data === '' ? null : data), z.nullable(ticketSchema))

const ticketsSchema = z.array(ticketSchema)

export type CurrentTicket = z.infer<typeof currentTicketSchema>

export const getCurrentTicket = async (counterId: string) => {
  const response = await axiosInstance.get(`/counters/${counterId}/tickets/current`)
  const parsedResponse = currentTicketSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}

export const getCreatedTickets = async (counterId: string) => {
  const response = await axiosInstance.get(`/counters/${counterId}/tickets/created`)
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
    await axiosInstance.put(`/counters/${counterId}/tickets/done`)
    return null
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const nextTicket = async (counterId: string) => {
  const response = await axiosInstance.put(`/counters/${counterId}/tickets/next`)
  const parsedResponse = currentTicketSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}
