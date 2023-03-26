import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'
import { type Services } from '../../types'

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

const label = 'Služba'

const ServiceSelect = ({
  services,
  servicesSelected,
  onChange
}: {
  services: Services
  servicesSelected: string[]
  onChange: (event: SelectChangeEvent<typeof servicesSelected>) => void
}) => {
  const getServiceName = (serviceId: string) => {
    return services.find((s) => s.id === serviceId)?.name ?? ''
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="service-label">{label}</InputLabel>
      <Select
        multiple
        labelId="service-label"
        value={servicesSelected}
        label={label}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={styles.chipWrapper}>
            {selected.map((value) => (
              <Chip key={value} label={getServiceName(value)} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {services.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ServiceSelect
