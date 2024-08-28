import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AppRouter } from '@/router/AppRouter';
import '@/App.css'

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-grow bg-gray-100 pt-16">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <AppRouter />
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App