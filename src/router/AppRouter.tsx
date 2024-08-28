import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute, ErrorBoundary } from '@/components';
import { Home, About, HistoryPage } from '@/pages';

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