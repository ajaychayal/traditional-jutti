import { useUser, useAuth, RedirectToSignIn } from '@clerk/react';
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>Loading Admin...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // Check for admin role
  if (user?.publicMetadata?.role !== 'admin') {
    // If not an admin, redirect to home or a not authorized page
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}
