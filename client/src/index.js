import './index.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store';
import { QueryClientProvider, QueryClient } from 'react-query'


const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </QueryClientProvider>
  </Provider>
)
