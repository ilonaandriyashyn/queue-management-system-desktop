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
import { useSnackbar } from 'notistack'
import { getCurrentTicket } from '../../requests/tickets'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '80%'
  },
  counterInput: {
    mb: 2
  },
  saveButton: {
    width: 'max-content',
    mt: 2,
    alignSelf: 'center'
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

  const { enqueueSnackbar } = useSnackbar()

  const mutationUpdateCounter = useMutation('update_counter', createCounter, {
    onError: () => {
      setCounterName(counter.name)
      enqueueSnackbar('Nepovedlo se nastavit přepážku', { variant: 'error' })
    },
    onSuccess: (response) => {
      dispatch(updateCounter(response))
      mutationUpdateCounterServices.mutate({ counterId: response.id, services: servicesSelected })
      enqueueSnackbar('Nastavení přepážky proběhlo úspěšně', { variant: 'success' })
    }
  })

  const mutationUpdateCounterServices = useMutation('update_counter_services', updateCounterServices, {
    onError: () => {
      setServicesSelected(counterServices)
      enqueueSnackbar('Nepovedlo se nastavit služby', { variant: 'error' })
    },
    onSuccess: (response) => {
      dispatch(updateServices(response))
      enqueueSnackbar('Nastavení služeb proběhlo úspěšně', { variant: 'success' })
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

  const { isLoading, isFetching, isError, data } = useQuery(
    'get_current_ticket',
    async () => await getCurrentTicket(counter.id),
    {
      enabled: counter.id !== '' && counterServices.length !== 0
    }
  )

  const settingsDisabled = isLoading || isFetching || isError || (data !== null && data !== undefined)

  const handleSave = () => {
    if (!settingsDisabled) {
      if (counterName !== counter.name) {
        mutationUpdateCounter.mutate(counterName)
        return
      }
      if (counter.name !== '') {
        mutationUpdateCounterServices.mutate({ counterId: counter.id, services: servicesSelected })
      }
    }
  }

  return (
    <div style={styles.wrapper}>
      <TextField
        disabled={settingsDisabled}
        label="Přepážka"
        value={counterName}
        onChange={handleCounterChange}
        variant="outlined"
        sx={styles.counterInput}
      />
      <ServiceSelect
        disabled={settingsDisabled}
        services={services}
        servicesSelected={servicesSelected}
        onChange={handleServiceChange}
      />
      <Button disabled={settingsDisabled} sx={styles.saveButton} onClick={handleSave} variant="contained">
        {'Uložit'}
      </Button>
    </div>
  )
}

export default Settings
