import React, { useContext, useEffect, useState } from 'react'
import Table from '../../components/Dashboard/Table'
import TicketManager from '../../components/Dashboard/TicketManager'
import NoCounterOrServiceAlert from '../../components/NoCounterOrServiceAlert'
import { useAppSelector } from '../../store/hooks'
import { selectCounterId, selectCounterServices } from '../../store/counter/slice'
import { WebsocketContext } from '../../contexts/WebsocketContext'
import { type Ticket, ticketSchema } from '../../types'
import { useQuery } from 'react-query'
import { getCreatedTickets } from '../../requests/tickets'
import { OFFICE_ID, TicketState } from '../../helpers/consts'
import { z } from 'zod'

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

  const socket = useContext(WebsocketContext)

  const [tickets, setTickets] = useState<Ticket[]>([])

  useQuery('get_created_tickets', async () => await getCreatedTickets(counterId), {
    onSuccess: (data) => {
      setTickets(data)
    },
    enabled: counterId !== '' && services.length !== 0
  })

  useEffect(() => {
    socket.on(`ON_DELETE_TICKETS/${OFFICE_ID}`, (data: unknown) => {
      const parserResponse = z.array(ticketSchema).safeParse(data)
      if (parserResponse.success) {
        const tickets = parserResponse.data
        setTickets((prevState) => {
          return prevState.filter((prevTicket) => !tickets.some((removedTicket) => prevTicket.id === removedTicket.id))
        })
      }
    })

    return () => {
      socket.off(`ON_DELETE_TICKETS/${OFFICE_ID}`)
    }
  }, [])

  useEffect(() => {
    services.forEach((service) => {
      socket.on(`ON_UPDATE_QUEUE/${OFFICE_ID}/${service.id}`, (data: unknown) => {
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
      services.forEach((service) => {
        socket.off(`ON_UPDATE_QUEUE/${OFFICE_ID}/${service.id}`)
      })
    }
  }, [services])

  return (
    <div style={styles.wrapper}>
      {(counterId === '' || services.length === 0) && (
        <div style={styles.alert}>
          <NoCounterOrServiceAlert />
        </div>
      )}
      <TicketManager ticketsInQueueNum={tickets.length} />
      <Table tickets={tickets} />
    </div>
  )
}

export default Dashboard
