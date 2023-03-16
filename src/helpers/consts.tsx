import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import * as React from 'react'

export const PAGES = {
  DASHBOARD: {
    name: 'dashboard',
    icon: <DashboardIcon />
  },
  SETTINGS: {
    name: 'settings',
    icon: <SettingsIcon />
  }
} as const

export type PagesType = (typeof PAGES)[keyof typeof PAGES]['name']

export const ORGANIZATION_ID = '9ca561dc-9442-4c46-b4b5-d9ba6950e281'
export const OFFICE_ID = 'e22cd045-8ca7-43e5-a5c3-35e8563ccc3a'

// TODO get this from state
// export const COUNTER_ID = '007fc838-53cd-4e5a-8acd-7afeb5e77c97'
// export const COUNTER_ID = 'b9d011be-c7cf-439d-a0c0-d6bcb6126ff4'

export const API_URL = {
  OFFICE: `/offices/${OFFICE_ID}`,
  COUNTER: '/counters'
}

export enum TicketState {
  CREATED = 'created',
  PROCESSING = 'processing'
}
