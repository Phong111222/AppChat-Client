import router from 'next/router';
import Login from '../components/Auth/Login';

import useAuth from '../hook/useAuth';
export default function Home() {
  const [jwt] = useAuth();
  if (jwt) {
    router.push('/app');
  }
  return <Login />;
}
