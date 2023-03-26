import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useMutation, useQuery } from 'react-query'
import { type CurrentTicket, doneTicket, getCurrentTicket, nextTicket } from '../../requests/tickets'
import { TicketState } from '../../helpers/consts'
import { useAppSelector } from '../../store/hooks'
import { selectCounterId, selectCounterServices } from '../../store/counter/slice'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    minHeight: '172px'
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  doneButton: {
    mb: 1
  }
} as const

const TicketManager = () => {
  const counterId = useAppSelector(selectCounterId)
  const counterServices = useAppSelector(selectCounterServices)

  const [ticket, setTicket] = useState<CurrentTicket | null>(null)
  useQuery('get_current_ticket', async () => await getCurrentTicket(counterId), {
    onSuccess: (data) => {
      setTicket(data)
    },
    enabled: counterId !== '' && counterServices.length !== 0
  })

  const mutationDoneTicket = useMutation('done_ticket', doneTicket, {
    onSuccess: (data) => {
      setTicket(data)
    }
  })
  const mutationNextTicket = useMutation('next_ticket', nextTicket, {
    onSuccess: (data) => {
      setTicket(data)
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
      <div>
        <Typography variant="h5">{'Aktuální číslo'}</Typography>
        <Typography variant="h3">{ticket == null ? '- - -' : ticket.id}</Typography>
        {ticket !== null && <Typography variant="body1">{`Požadovaná služba: ${ticket.service.name}`}</Typography>}
      </div>
      <div style={styles.buttonsWrapper}>
        <Button
          disabled={ticket == null || ticket.state !== TicketState.PROCESSING}
          color="success"
          variant="contained"
          onClick={handleDone}
          sx={styles.doneButton}
        >
          {'Vyřízeno'}
        </Button>
        <Button
          disabled={ticket?.state === TicketState.PROCESSING || counterId === '' || counterServices.length === 0}
          variant="contained"
          onClick={handleNext}
        >
          {'Další'}
        </Button>
      </div>
    </div>
  )
}

export default TicketManager
