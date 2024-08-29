import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import { ClerkProvider } from '@clerk/clerk-react'
import '@/styles/custom.scss';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

async function prepare() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('@/mocks/browser')
    return worker.start()
  }
  return Promise.resolve()
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>
  )
})
