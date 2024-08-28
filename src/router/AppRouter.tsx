import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Home } from '@/pages/Home';
import HistoryPage from '@/pages/History';
import About from '@/pages/About';
import ErrorBoundary from '@/components/ErrorBoundary';

export const AppRouter: React.FC = () => {
  return (
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
  );
};