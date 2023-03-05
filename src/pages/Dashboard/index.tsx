import React from 'react'
import { Button, Typography } from '@mui/material'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
} as const

function Dashboard() {
  return (
    <div style={styles.wrapper}>
      <div>
        <Typography variant="h5">{'Aktuální číslo'}</Typography>
        <Typography variant="h3">{'123'}</Typography>
      </div>
      <Button variant="contained">{'Další'}</Button>
    </div>
  )
}

export default Dashboard
