import { useAuth, RedirectToSignIn } from '@clerk/react';
import { Outlet } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>Loading...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children ? children : <Outlet />;
}
