import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { z } from 'zod'

const servicesSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string()
  })
)

export type Services = z.infer<typeof servicesSchema>

export const getCurrentOfficesServices = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL.OFFICE}/services`)
    const parsedResponse = servicesSchema.safeParse(response.data)
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
