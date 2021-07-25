import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useAuth from '../../../hook/useAuth';

export default function WrappedAuth({ children }) {
  const route = useRouter();
  const [jwt] = useAuth();
  useEffect(() => {
    if (!jwt) {
      route.push('/');
    } else route.push('/app');
  }, [route.pathname]);
  return <>{children}</>;
}
