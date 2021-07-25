import Login from '../components/Auth/Login';
import WrappedAuth from '../components/Auth/WrappedAuth';

export default function Home() {
  return (
    <WrappedAuth>
      <Login />
    </WrappedAuth>
  );
}
