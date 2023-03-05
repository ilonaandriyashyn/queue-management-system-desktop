import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'

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

const serviceList = [
  'service1',
  'service2',
  'service3',
  'service4',
  'service5',
  'service6',
  'service7',
  'service8',
  'service9',
  'service10',
  'service11',
  'service12',
  'service13',
  'service14',
  'service15',
  'service16',
  'service17',
  'service18',
  'service19',
  'service20',
  'service21'
]
const ServiceSelect = () => {
  const [services, setServices] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof services>) => {
    const {
      target: { value }
    } = event
    setServices(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="service-label">Služba</InputLabel>
      <Select
        multiple
        labelId="service-label"
        value={services}
        label="Služba"
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => (
          <Box sx={styles.chipWrapper}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {serviceList.map((serviceItem) => (
          <MenuItem key={serviceItem} value={serviceItem}>
            {serviceItem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ServiceSelect
