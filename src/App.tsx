import React from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import Settings from './pages/Settings'
import { useAppSelector } from './store/hooks'
import { selectPage } from './store/common/slice'
import { Pages } from './helpers/consts'
import Dashboard from './pages/Dashboard'

function App() {
  const page = useAppSelector(selectPage)
  return (
    <Layout>
      {page === Pages.dashboard && <Dashboard />}
      {page === Pages.settings && <Settings />}
    </Layout>
  )
}

export default App
