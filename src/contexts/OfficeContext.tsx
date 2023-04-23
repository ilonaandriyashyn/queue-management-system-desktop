import React, { createContext, type PropsWithChildren, useEffect, useState } from 'react'

export const OfficeContext = createContext<{ officeId: string }>({ officeId: '' })

const loadOfficeId = async () => {
  let officeId = ''
  try {
    // @ts-expect-error electron preload
    officeId = await window.config.getOfficeId()
  } catch (e) {}
  return officeId
}
export const OfficeProvider = ({ children }: PropsWithChildren) => {
  const [loadedId, setLoadedId] = useState<string | null>(null)
  useEffect(() => {
    loadOfficeId()
      .then((res) => {
        setLoadedId(res)
      })
      .catch(() => null)
  }, [])

  return loadedId === null ? (
    <div>{'Načítá se konfigurační soubor'}</div>
  ) : loadedId === '' ? (
    <div>
      {
        'Nepovedlo se načíst konfigurace ze souboru. Zkuste prosím zkontrolovat konfigurační soubor a pro jeho opětovné načtení znovu spusťte aplikaci.'
      }
    </div>
  ) : (
    <OfficeContext.Provider value={{ officeId: loadedId }}>{children}</OfficeContext.Provider>
  )
}
