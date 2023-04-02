import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  
  const router = useRouter();
  const { currentUser } = useAuth({ redirectTo: '/login' })

  if (!currentUser) {
    router.push('/Login');
    return null;
  }
  return <>{children}</>;
};

export default PrivateRoute;
