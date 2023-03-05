import React from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import Settings from './pages/Settings'
import { useAppSelector } from './store/hooks'
import { selectPage } from './store/common/slice'
import { PAGES } from './helpers/consts'
import Dashboard from './pages/Dashboard'

function App() {
  const page = useAppSelector(selectPage)
  return (
    <Layout>
      {page === PAGES.DASHBOARD.name && <Dashboard />}
      {page === PAGES.SETTINGS.name && <Settings />}
    </Layout>
  )
}

export default App
