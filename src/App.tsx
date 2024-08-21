import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Home } from '@/pages/Home';
import HistoryPage from '@/pages/History';
import Navbar from '@/components/Navbar';
import ErrorBoundary from '@/components/ErrorBoundary';
import '@/App.css'
import About from './pages/About';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
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
      </ErrorBoundary>
    </Router>
  )
}

export default App