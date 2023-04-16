import { axiosInstance } from '../config/axios'
import { z } from 'zod'
import { servicesSchema } from '../types'
import { generateError } from 'zod-error'

const counterSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

const counterWithServicesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  services: servicesSchema
})

export type Counter = z.infer<typeof counterSchema>

export const createCounter = async ({ name, officeId }: { name: string; officeId: string }) => {
  const response = await axiosInstance.post(`/counters/create`, { name, officeId })
  const parsedResponse = counterSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}

export const updateCounterServices = async ({ counterId, services }: { counterId: string; services: string[] }) => {
  const { data } = await axiosInstance.put(`/counters/${counterId}/services`, { services })
  const parsedResponse = counterWithServicesSchema.safeParse(data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    return []
  }
  return parsedResponse.data.services
}
