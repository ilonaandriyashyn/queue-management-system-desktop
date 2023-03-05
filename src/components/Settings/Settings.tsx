import React from 'react'
import { Button, TextField } from '@mui/material'
import ServiceSelect from './ServiceSelect'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  }
} as const
function Settings() {
  return (
    <div style={styles.wrapper}>
      <TextField id="standard-number" label="Číslo přepážky" type="number" variant="outlined" />
      <ServiceSelect />
      <Button variant="contained">{'Uložit'}</Button>
    </div>
  )
}

export default Settings
