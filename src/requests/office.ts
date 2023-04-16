import { axiosInstance } from '../config/axios'
import { servicesSchema } from '../types'
import { generateError } from 'zod-error'

export const getCurrentOfficesServices = async (officeId: string) => {
  const response = await axiosInstance.get(`/offices/${officeId}/services`)
  const parsedResponse = servicesSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}
