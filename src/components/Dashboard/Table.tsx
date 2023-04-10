import React from 'react'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { type Ticket } from '../../types'

const styles = {
  table: {
    mt: 16
  },
  row: {
    '&:last-child td, &:last-child th': { border: 0 }
  }
}

const Table = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <MuiTable sx={styles.table}>
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
  )
}

export default Table
