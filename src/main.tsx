import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import theme from './helpers/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { socket, WebsocketProvider } from './contexts/WebsocketContext'

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
    <WebsocketProvider value={socket}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </WebsocketProvider>
  </React.StrictMode>
)
