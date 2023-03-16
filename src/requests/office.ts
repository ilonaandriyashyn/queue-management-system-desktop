import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { servicesSchema } from '../types'

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
