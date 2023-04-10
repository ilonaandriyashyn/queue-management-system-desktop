import * as React from 'react'
import Alert from '@mui/material/Alert'

const TicketProcessingAlert = () => {
  return <Alert severity="warning">Nelze změnit údaje, pokud máte aktivní lístek.</Alert>
}

export default TicketProcessingAlert
