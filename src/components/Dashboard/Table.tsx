import React from 'react'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { type Ticket } from '../../types'
import { Typography } from '@mui/material'

const styles = {
  wrapper: {
    marginTop: '9em'
  },
  row: {
    '&:last-child td, &:last-child th': { border: 0 }
  }
} as const

const Table = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <div style={styles.wrapper}>
      <Typography variant="h6">{'Fronta:'}</Typography>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Číslo</TableCell>
            <TableCell>Služba</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id} sx={styles.row}>
              <TableCell>{ticket.ticketNumber}</TableCell>
              <TableCell>{ticket.service.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </div>
  )
}

export default Table
