import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./theme"; // Asegúrate de que el archivo esté en `src/theme.js`
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import AccountManagement from './pages/AccountManagement';
import AuditLogs from './pages/AuditLogs';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          <Route path="/account-management" element={<ProtectedRoute><AccountManagement /></ProtectedRoute>} />
          <Route path="/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
