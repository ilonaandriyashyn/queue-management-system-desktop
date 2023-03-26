import React from 'react'
import Table from '../../components/Dashboard/Table'
import TicketManager from '../../components/Dashboard/TicketManager'
import NoCounterOrServiceAlert from '../../components/NoCounterOrServiceAlert'
import { useAppSelector } from '../../store/hooks'
import { selectCounterId, selectCounterServices } from '../../store/counter/slice'

const styles = {
  wrapper: {
    height: '100%'
  },
  alert: {
    marginTop: '1rem',
    marginBottom: '2rem'
  }
} as const

function Dashboard() {
  const counterId = useAppSelector(selectCounterId)
  const services = useAppSelector(selectCounterServices)
  return (
    <div style={styles.wrapper}>
      {(counterId === '' || services.length === 0) && (
        <div style={styles.alert}>
          <NoCounterOrServiceAlert />
        </div>
      )}
      <TicketManager />
      <Table />
    </div>
  )
}

export default Dashboard
