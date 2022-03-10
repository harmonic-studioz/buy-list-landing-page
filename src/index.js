import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { TransactionsProvider } from './context/TransactionContext'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.render(
  <AuthContextProvider>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </AuthContextProvider>,
  document.getElementById('root'),
)
