import React, { useContext, useEffect, useState } from 'react'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useAppSelector } from '../../store/hooks'
import { selectCounterId, selectCounterServices } from '../../store/counter/slice'
import { WebsocketContext } from '../../contexts/WebsocketContext'
import { OFFICE_ID, TicketState } from '../../helpers/consts'
import { type Ticket, ticketSchema } from '../../types'
import { useQuery } from 'react-query'
import { getCreatedTickets } from '../../requests/tickets'

const styles = {
  table: {
    mt: 16
  },
  row: {
    '&:last-child td, &:last-child th': { border: 0 }
  }
}

const Table = () => {
  const counterId = useAppSelector(selectCounterId)
  const counterServices = useAppSelector(selectCounterServices)

  const socket = useContext(WebsocketContext)

  const [tickets, setTickets] = useState<Ticket[]>([])

  useQuery('get_created_tickets', async () => await getCreatedTickets(counterId), {
    onSuccess: (data) => {
      setTickets(data)
    },
    enabled: counterId !== '' && counterServices.length !== 0
  })

  useEffect(() => {
    counterServices.forEach((service) => {
      socket.on(`ON_UPDATE_QUEUE/${OFFICE_ID}/${service.id}`, (data: unknown) => {
        console.log(service.id, data)
        const parserResponse = ticketSchema.safeParse(data)
        if (parserResponse.success) {
          const ticket = parserResponse.data
          if (ticket.state === TicketState.CREATED) {
            setTickets((prevState) => [...prevState, ticket])
            return
          }
          if (ticket.state === TicketState.PROCESSING) {
            setTickets((prevState) => {
              return prevState.filter((prevTicket) => prevTicket.id !== ticket.id)
            })
          }
        }
      })
    })

    return () => {
      console.log('cleanup')
      // TODO test behavior when I have some services and I'm subscribed. But then I choose no services, does this unmount?
      // TODO probably yes because it unmounts when I go to settings page
      counterServices.forEach((service) => {
        socket.off(`ON_UPDATE_QUEUE/${OFFICE_ID}/${service.id}`)
      })
    }
  }, [counterServices])

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
