import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Home } from '@/pages/Home';
import HistoryPage from '@/pages/History';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';
import '@/App.css'
import About from './pages/About';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-grow bg-gray-100 pt-16"> {/* Add top padding to account for fixed header */}
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Routes>
                <Route path="/home" element={
                  <ErrorBoundary>
                    <ProtectedRoute element={<Home />} />
                  </ErrorBoundary>
                } />
                <Route path="/history" element={
                  <ErrorBoundary>
                    <ProtectedRoute element={<HistoryPage />} />
                  </ErrorBoundary>
                } />
                <Route path="/about" element={
                  <ErrorBoundary>
                    <About />
                  </ErrorBoundary>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App