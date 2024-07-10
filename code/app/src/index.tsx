import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Amplify } from 'aws-amplify'
import { awsconfig } from 'config'
import { AWSCognitoProvider as AuthProvider } from 'contexts/AuthContext'
import { ConfigProvider } from 'contexts/ConfigContext'
import { ToastProvider } from 'contexts/ToastContext'
import App from './App'
import reportWebVitals from './reportWebVitals'

import 'simplebar/src/simplebar.css'

const container = document.getElementById('root')
const root = createRoot(container!)

Amplify.configure(awsconfig)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

root.render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </ConfigProvider>
  </QueryClientProvider>
)

reportWebVitals()
