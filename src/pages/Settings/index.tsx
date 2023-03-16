import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import ServiceSelect from '../../components/Settings/ServiceSelect'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectCounterName, updateCounter } from '../../store/counter/slice'
import { getCurrentOfficesServices, type Services } from '../../requests/office'
import { useMutation, useQuery } from 'react-query'
import { type SelectChangeEvent } from '@mui/material/Select'
import { createCounter } from '../../requests/counters'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  counterInput: {
    mb: 2
  }
} as const

function Settings() {
  const dispatch = useAppDispatch()
  const counterName = useAppSelector(selectCounterName)
  const [counter, setCounter] = useState<string>(counterName ?? '')

  const [services, setServices] = useState<Services>([])
  const [servicesSelected, setServicesSelected] = useState<Services>([])
  useQuery('services', getCurrentOfficesServices, { onSuccess: setServices })

  const mutationUpdateCounter = useMutation('update_counter', createCounter, {
    onError: () => {
      setCounter(counterName ?? '')
    },
    onSuccess: (response) => {
      dispatch(updateCounter(response))
    }
  })

  const handleCounterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCounter(event.target.value)
  }

  const handleServiceChange = (event: SelectChangeEvent<typeof servicesSelected>) => {
    const {
      target: { value }
    } = event
    setServicesSelected(value)
  }

  const handleSave = () => {
    mutationUpdateCounter.mutate(counter)
  }

  return (
    <div style={styles.wrapper}>
      {/* TODO we will probably persist counter in store */}
      <TextField
        id="standard-number"
        label="Přepážka"
        value={counter}
        onChange={handleCounterChange}
        variant="outlined"
        sx={styles.counterInput}
      />
      <ServiceSelect services={services} servicesSelected={servicesSelected} onChange={handleServiceChange} />
      <Button onClick={handleSave} variant="contained">
        {'Uložit'}
      </Button>
    </div>
  )
}

export default Settings
