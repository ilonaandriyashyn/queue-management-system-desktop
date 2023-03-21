import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { servicesSchema } from '../types'
import { generateError } from 'zod-error'

export const getCurrentOfficesServices = async () => {
  const response = await axiosInstance.get(`${API_URL.OFFICE}/services`)
  const parsedResponse = servicesSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}
