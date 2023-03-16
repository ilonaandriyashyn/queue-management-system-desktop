import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import ServiceSelect from '../../components/Settings/ServiceSelect'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectCounter, selectCounterServices, updateCounter, updateServices } from '../../store/counter/slice'
import { getCurrentOfficesServices } from '../../requests/office'
import { useMutation, useQuery } from 'react-query'
import { type SelectChangeEvent } from '@mui/material/Select'
import { createCounter, updateCounterServices } from '../../requests/counters'
import { type Services } from '../../types'

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
  const counter = useAppSelector(selectCounter)
  const [counterName, setCounterName] = useState<string>(counter.name)

  const [services, setServices] = useState<Services>([])
  const counterServices = useAppSelector(selectCounterServices).map((s) => s.id)
  const [servicesSelected, setServicesSelected] = useState<string[]>(counterServices)
  useQuery('services', getCurrentOfficesServices, { onSuccess: setServices })

  const mutationUpdateCounter = useMutation('update_counter', createCounter, {
    onError: () => {
      setCounterName(counter.name)
    },
    onSuccess: (response) => {
      dispatch(updateCounter(response))
      mutationUpdateCounterServices.mutate({ counterId: response.id, services: servicesSelected })
    }
  })

  const mutationUpdateCounterServices = useMutation('update_counter_services', updateCounterServices, {
    onError: () => {
      setServicesSelected(counterServices)
    },
    onSuccess: (response) => {
      dispatch(updateServices(response))
    }
  })

  const handleCounterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCounterName(event.target.value)
  }

  const handleServiceChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event
    setServicesSelected(typeof value === 'string' ? value.split(',') : value)
  }

  const handleSave = () => {
    if (counterName !== counter.name) {
      mutationUpdateCounter.mutate(counterName)
      return
    }
    if (counter.name !== '') {
      mutationUpdateCounterServices.mutate({ counterId: counter.id, services: servicesSelected })
    }
  }

  return (
    <div style={styles.wrapper}>
      {/* TODO we will probably persist counter in store */}
      <TextField
        id="standard-number"
        label="Přepážka"
        value={counterName}
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
