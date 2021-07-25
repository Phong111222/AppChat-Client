import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function useAuth() {
  const route = useRouter();
  const [jwt, setJwt] = useState(() => {
    const token =
      (typeof window !== 'undefined' && window.localStorage.getItem('jwt')) ||
      null;
    return token;
  });
  useEffect(() => {
    const token =
      (typeof window !== 'undefined' && window.localStorage.getItem('jwt')) ||
      null;
    setJwt(token);
  }, [jwt, route.basePath]);
  return [jwt, setJwt];
}
