import { z } from 'zod'
import { TicketState } from '../helpers/consts'

export const serviceSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

export const servicesSchema = z.array(serviceSchema)

export type Services = z.infer<typeof servicesSchema>

export const ticketSchema = z.object({
  dateCreated: z.string().datetime({ offset: true }),
  id: z.string().uuid(),
  ticketNumber: z.number(),
  phoneId: z.string(),
  service: z.object({
    id: z.string().uuid(),
    name: z.string()
  }),
  state: z.nativeEnum(TicketState)
})

export type Ticket = z.infer<typeof ticketSchema>
