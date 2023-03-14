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

export const COUNTER_ID = '007fc838-53cd-4e5a-8acd-7afeb5e77c97'
// export const COUNTER_ID = 'b9d011be-c7cf-439d-a0c0-d6bcb6126ff4'

export const API_URL = {
  TICKET: `/counters/${COUNTER_ID}/tickets`
}

export enum TicketState {
  CREATED = 'created',
  PROCESSING = 'processing'
}
