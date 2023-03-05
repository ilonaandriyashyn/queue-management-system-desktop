import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

const ServiceSelect = () => {
  const [service, setService] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setService(event.target.value)
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="service-label">Služba</InputLabel>
        <Select labelId="service-label" value={service} label="Služba" onChange={handleChange}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default ServiceSelect
