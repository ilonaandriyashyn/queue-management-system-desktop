import { axiosInstance } from '../config/axios'
import { API_URL, OFFICE_ID } from '../helpers/consts'
import { z } from 'zod'
import { servicesSchema } from '../types'

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
  try {
    const response = await axiosInstance.post(`${API_URL.COUNTER}/create`, { name, officeId: OFFICE_ID })
    const parsedResponse = counterSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      // TODO save error state to redux
      throw new Error('parsing error')
    }
    return parsedResponse.data
  } catch (e) {
    // TODO save error to redux
    throw e
  }
}

export const updateCounterServices = async ({ counterId, services }: { counterId: string; services: string[] }) => {
  try {
    const { data } = await axiosInstance.put(`${API_URL.COUNTER}/${counterId}/services`, { services })
    const parsedResponse = counterWithServicesSchema.safeParse(data)
    if (!parsedResponse.success) {
      // TODO save error state to redux
      throw new Error('parsing error')
    }
    return parsedResponse.data.services
  } catch (e) {
    // TODO save error to redux
    throw e
  }
}
