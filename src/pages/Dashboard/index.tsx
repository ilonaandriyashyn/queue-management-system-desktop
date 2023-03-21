import React from 'react'
import Table from '../../components/Dashboard/Table'
import TicketManager from '../../components/Dashboard/TicketManager'

const styles = {
  wrapper: {
    height: '100%'
  }
} as const

function Dashboard() {
  return (
    <div style={styles.wrapper}>
      <TicketManager />
      <Table />
    </div>
  )
}

export default Dashboard
