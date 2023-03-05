import React from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import Settings from './components/Settings/Settings'
import { useAppSelector } from './store/hooks'
import { selectPage } from './store/common/slice'
import { Pages } from './helpers/consts'

function App() {
  const page = useAppSelector(selectPage)
  return <Layout>{page === Pages.settings && <Settings />}</Layout>
}

export default App
