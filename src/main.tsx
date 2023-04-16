import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SnackbarProvider } from 'notistack'
import { OfficeProvider } from './contexts/OfficeContext'

// Consider enabling in production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <OfficeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SnackbarProvider>
            <CssBaseline />
            <App />
          </SnackbarProvider>
        </Provider>
      </QueryClientProvider>
    </OfficeProvider>
  </React.StrictMode>
)
