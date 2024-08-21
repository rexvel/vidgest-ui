import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Home } from '@/components/Home';
import HistoryPage from '@/components/History';
import Navbar from '@/components/Navbar';
import '@/App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/history" element={<ProtectedRoute element={<HistoryPage />} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App