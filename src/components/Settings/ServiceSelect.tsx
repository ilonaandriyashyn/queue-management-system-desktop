import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'
import { useState } from 'react'
import { getCurrentOfficesServices, type Services } from '../../requests/office'
import { useQuery } from 'react-query'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const styles = {
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5
  }
}

const ServiceSelect = () => {
  const [services, setServices] = useState<Services>([])
  const [servicesSelected, setServicesSelected] = useState<Services>([])
  useQuery('services', getCurrentOfficesServices, { onSuccess: setServices })

  const handleChange = (event: SelectChangeEvent<typeof servicesSelected>) => {
    const {
      target: { value }
    } = event
    setServicesSelected(value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="service-label">Služba</InputLabel>
      <Select
        multiple
        labelId="service-label"
        value={servicesSelected}
        label="Služba"
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <Box sx={styles.chipWrapper}>
            {selected.map((value) => (
              <Chip key={value.id} label={value.name} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {services.map((service) => (
          <MenuItem key={service.id} value={service}>
            {service.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ServiceSelect
