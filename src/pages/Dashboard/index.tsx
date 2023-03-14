import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useMutation, useQuery } from 'react-query'
import { doneTicket, getCurrentTicket, nextTicket, type Ticket } from '../../requests'
import { TicketState } from '../../helpers/consts'

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

function Dashboard() {
  // TODO why I receive empty string instead of null
  const [ticket, setTicket] = useState<Ticket>(null)
  useQuery('current_ticket', getCurrentTicket, { onSuccess: setTicket })

  // TODO this is logged 6 times after some mutation
  console.log(ticket)
  const mutationDoneTicket = useMutation('done_ticket', doneTicket, { onSuccess: setTicket })
  const mutationNextTicket = useMutation('next_ticket', nextTicket)

  const handleDone = () => {
    mutationDoneTicket.mutate()
  }

  const handleNext = () => {
    mutationNextTicket.mutate()
  }

  return (
    <div style={styles.wrapper}>
      <div>
        <Typography variant="h5">{'Aktuální číslo'}</Typography>
        <Typography variant="h3">{ticket == null ? 'None' : ticket.id}</Typography>
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

export default Dashboard
