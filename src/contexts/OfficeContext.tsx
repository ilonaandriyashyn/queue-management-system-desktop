import { createContext } from 'react'

let officeId = ''
try {
  // @ts-expect-error electron preload
  officeId = await window.config.getOfficeId()
} catch (e) {}

export const OfficeContext = createContext<{ officeId: string }>({ officeId })
