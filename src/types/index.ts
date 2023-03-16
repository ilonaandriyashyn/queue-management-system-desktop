import { z } from 'zod'

export const servicesSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string()
  })
)

export type Services = z.infer<typeof servicesSchema>
