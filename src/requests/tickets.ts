import { axiosInstance } from '../config/axios'
import { API_URL, TicketState } from '../helpers/consts'
import { z } from 'zod'

const ticketSchema = z.nullable(
  z.object({
    dateCreated: z.string().datetime({ offset: true }),
    id: z.string().uuid(),
    phoneId: z.string(),
    service: z.object({
      id: z.string().uuid(),
      name: z.string()
    }),
    // TODO find a better way
    state: z.enum([TicketState.CREATED, TicketState.PROCESSING])
  })
)

export type Ticket = z.infer<typeof ticketSchema>

// TODO why request retries 3 times and only then returns failure?
export const getCurrentTicket = async (counterId: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL.COUNTER}/${counterId}/current`)
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

export const doneTicket = async () => {
  try {
    await axiosInstance.put(`${API_URL.TICKET}/done`)
    return null
  } catch (e) {
    // TODO save error to redux
    return null
  }
}

export const nextTicket = async () => {
  try {
    const response = await axiosInstance.put(`${API_URL.TICKET}/next`)
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
