import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useAuth from '../../../hook/useAuth';
import jsonwebtoken from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../../store/Auth/action';
export default function WrappedAuth({ children }) {
  const dispatch = useDispatch();
  const route = useRouter();
  const [jwt] = useAuth();
  const { info } = useSelector((state) => state.user);
  useEffect(() => {
    if (!jwt) {
      route.push('/');
    }
  }, [route.pathname]);
  useEffect(() => {
    jsonwebtoken.verify(
      jwt,
      '22EC4C46D29738BD9066E80D89390BF97B2091B71BDEEA04EFDD51574D283B10',
      (err, _) => {
        if (err) {
          dispatch(Logout(route, info));
        }
      }
    );
  }, [route.pathname]);
  return <>{children}</>;
}
