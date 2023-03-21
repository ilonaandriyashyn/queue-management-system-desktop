import { z } from 'zod'
import { TicketState } from '../helpers/consts'

export const serviceSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

export const servicesSchema = z.array(serviceSchema)

export type Service = z.infer<typeof serviceSchema>
export type Services = z.infer<typeof servicesSchema>

export const ticketSchema = z.object({
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

export type Ticket = z.infer<typeof ticketSchema>
