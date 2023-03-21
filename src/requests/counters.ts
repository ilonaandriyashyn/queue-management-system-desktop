import { axiosInstance } from '../config/axios'
import { API_URL, OFFICE_ID } from '../helpers/consts'
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

export const createCounter = async (name: string) => {
  const response = await axiosInstance.post(`${API_URL.COUNTER}/create`, { name, officeId: OFFICE_ID })
  const parsedResponse = counterSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}

export const updateCounterServices = async ({ counterId, services }: { counterId: string; services: string[] }) => {
  const { data } = await axiosInstance.put(`${API_URL.COUNTER}/${counterId}/services`, { services })
  const parsedResponse = counterWithServicesSchema.safeParse(data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    return []
  }
  return parsedResponse.data.services
}
