import React, { type PropsWithChildren, useContext } from 'react'
import { OfficeContext } from '../../contexts/OfficeContext'

function ConfigBoundary({ children }: PropsWithChildren): JSX.Element {
  const officeId = useContext(OfficeContext).officeId
  return officeId === '' ? (
    <div>
      {
        'Nepovedlo se načíst konfigurace ze souboru. Zkuste prosím zkontrolovat konfigurační soubor, nebo znovu spustit aplikaci.'
      }
    </div>
  ) : (
    <div>{children}</div>
  )
}

export default ConfigBoundary
