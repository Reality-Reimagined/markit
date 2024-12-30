import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './hooks/useToast';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';
import { ConvertPage } from './pages/ConvertPage';
import { BatchConvertPage } from './pages/BatchConvertPage';
import { AuthForm } from './components/auth/AuthForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<AuthForm mode="login" />} />
            <Route path="/signup" element={<AuthForm mode="signup" />} />
            <Route
              path="/convert"
              element={
                <ProtectedRoute>
                  <ConvertPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/batch"
              element={
                <ProtectedRoute>
                  <BatchConvertPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;