import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import * as React from 'react'

export const SERVER_URL = 'http://192.168.0.172:3000'

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

export enum TicketState {
  CREATED = 'created',
  PROCESSING = 'processing'
}
