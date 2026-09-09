import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import App from './App.jsx';
import './styles/global.scss';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: '#8b1e3f',
          colorText: '#222222',
          colorBackground: '#ffffff',
          colorDanger: '#dc3545',
          colorSuccess: '#198754',
          colorWarning: '#f59e0b',
          fontFamily: '"Inter", sans-serif',
          borderRadius: '0.5rem',
        },
        elements: {
          card: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
          },
          headerTitle: {
            fontFamily: '"Playfair Display", serif',
            color: '#1f2937',
            fontSize: '1.5rem',
            fontWeight: 600,
          },
          headerSubtitle: {
            fontFamily: '"Inter", sans-serif',
            color: '#6b7280',
          },
          socialButtonsBlockButton: {
            border: '1px solid #e5e7eb',
            '&:hover': {
              backgroundColor: '#faf7f2',
            },
          },
          formButtonPrimary: {
            backgroundColor: '#8b1e3f',
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#6f1632',
            },
          },
          footerActionLink: {
            color: '#8b1e3f',
            fontWeight: 600,
            '&:hover': {
              color: '#6f1632',
            },
          },
        },
      }}
    >
      <Provider store={store}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>,
);
