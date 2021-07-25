import Main from '../components/app';
import WrappedAuth from '../components/Auth/WrappedAuth';

export default function App() {
  return (
    <WrappedAuth>
      <Main />
    </WrappedAuth>
  );
}
