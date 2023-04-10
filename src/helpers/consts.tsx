import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import * as React from 'react'

export const SERVER_URL = 'http://localhost:3000'

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
export const OFFICE_ID = 'e22cd045-8ca7-43e5-a5c3-35e8563ccc3a'

export const API_URL = {
  OFFICE: `/offices/${OFFICE_ID}`,
  COUNTER: '/counters'
}

export enum TicketState {
  CREATED = 'created',
  PROCESSING = 'processing'
}
