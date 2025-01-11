import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { LangProvider } from './contexts/LangContext';
import { AuthProvider } from './contexts/AuthContext';
import router from './router';

function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LangProvider>
  );
}

export default App;