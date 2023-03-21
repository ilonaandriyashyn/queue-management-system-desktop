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
    justifyContent: 'space-around'
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

  // TODO why I receive empty string instead of null
  const [ticket, setTicket] = useState<CurrentTicket>(null)
  useQuery('current_ticket', async () => await getCurrentTicket(counterId), {
    onSuccess: setTicket,
    enabled: counterId !== '' && counterServices.length !== 0
  })

  // TODO this is logged 6 times after some mutation
  console.log(ticket)
  const mutationDoneTicket = useMutation('done_ticket', doneTicket, { onSuccess: setTicket })
  const mutationNextTicket = useMutation('next_ticket', nextTicket, { onSuccess: setTicket })

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
        <Button disabled={ticket?.state === TicketState.PROCESSING} variant="contained" onClick={handleNext}>
          {'Další'}
        </Button>
      </div>
    </div>
  )
}

export default TicketManager
