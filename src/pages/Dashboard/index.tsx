import React, { useContext, useEffect, useState } from 'react'
import Table from '../../components/Dashboard/Table'
import TicketManager from '../../components/Dashboard/TicketManager'
import NoCounterOrServiceAlert from '../../components/NoCounterOrServiceAlert'
import { useAppSelector } from '../../store/hooks'
import { selectCounterId, selectCounterServices } from '../../store/counter/slice'
import { WebsocketContext } from '../../contexts/WebsocketContext'
import { type Ticket, ticketSchema } from '../../types'
import { useMutation, useQuery } from 'react-query'
import { type CurrentTicket, doneTicket, getCreatedTickets, getCurrentTicket, nextTicket } from '../../requests/tickets'
import { OFFICE_ID, TicketState } from '../../helpers/consts'
import { z } from 'zod'
import NoTicketsInQueueAlert from '../../components/NoTicketsInQueueAlert'

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
  const [currentTicket, setCurrentTicket] = useState<CurrentTicket | null>(null)

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

  useQuery('get_current_ticket', async () => await getCurrentTicket(counterId), {
    onSuccess: (data) => {
      setCurrentTicket(data)
    },
    enabled: counterId !== '' && services.length !== 0
  })

  const mutationDoneTicket = useMutation('done_ticket', doneTicket, {
    onSuccess: (data) => {
      setCurrentTicket(data)
    }
  })
  const mutationNextTicket = useMutation('next_ticket', nextTicket, {
    onSuccess: (data) => {
      setCurrentTicket(data)
    }
  })

  const handleDone = () => {
    mutationDoneTicket.mutate(counterId)
  }

  const handleNext = () => {
    mutationNextTicket.mutate(counterId)
  }

  return (
    <div style={styles.wrapper}>
      {counterId === '' || services.length === 0 ? (
        <div style={styles.alert}>
          <NoCounterOrServiceAlert />
        </div>
      ) : (
        tickets.length === 0 &&
        currentTicket === null && (
          <div style={styles.alert}>
            <NoTicketsInQueueAlert />
          </div>
        )
      )}
      <TicketManager
        ticket={currentTicket}
        onDoneTicket={handleDone}
        onNextTicket={handleNext}
        ticketsInQueueNum={tickets.length}
      />
      <Table tickets={tickets} />
    </div>
  )
}

export default Dashboard
