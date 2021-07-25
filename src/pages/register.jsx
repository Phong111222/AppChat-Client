import React from 'react';

import Register from '../components/Auth/Register';
import WrappedAuth from '../components/Auth/WrappedAuth';
export default function RegisterPage() {
  return (
    <WrappedAuth>
      <Register />
    </WrappedAuth>
  );
}
