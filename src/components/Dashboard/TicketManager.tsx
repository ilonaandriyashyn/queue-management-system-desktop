import React from 'react'
import { Button, Typography } from '@mui/material'
import { type CurrentTicket } from '../../requests/tickets'
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

const TicketManager = ({
  ticket,
  onDoneTicket,
  onNextTicket,
  ticketsInQueueNum
}: {
  ticket: CurrentTicket
  onDoneTicket: () => void
  onNextTicket: () => void
  ticketsInQueueNum: number
}) => {
  const counterId = useAppSelector(selectCounterId)
  const counterServices = useAppSelector(selectCounterServices)

  return (
    <div style={styles.wrapper}>
      <div>
        <Typography variant="h5">{'Aktuální číslo'}</Typography>
        <Typography variant="h3">{ticket == null ? '- - -' : ticket.ticketNumber}</Typography>
        {ticket !== null && <Typography variant="body1">{`Požadovaná služba: ${ticket.service.name}`}</Typography>}
      </div>
      <div style={styles.buttonsWrapper}>
        <Button
          disabled={ticket == null || ticket.state !== TicketState.PROCESSING}
          color="success"
          variant="contained"
          onClick={onDoneTicket}
          sx={styles.doneButton}
        >
          {'Vyřízeno'}
        </Button>
        <Button
          disabled={
            ticketsInQueueNum === 0 ||
            ticket?.state === TicketState.PROCESSING ||
            counterId === '' ||
            counterServices.length === 0
          }
          variant="contained"
          onClick={onNextTicket}
        >
          {'Další'}
        </Button>
      </div>
    </div>
  )
}

export default TicketManager
