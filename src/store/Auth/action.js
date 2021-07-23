import AxiosConfig from '../../utils/constant';
import { AuthEndpoint } from '../../utils/endpoints';

import AuhtTypes from './type';

export const SignIn = (route, loginData, toast) => async (dispatch) => {
  try {
    dispatch({
      type: AuhtTypes.LOGIN,
    });
    const res = await AxiosConfig.post(AuthEndpoint.LOGIN, loginData);
    console.log(res);
    dispatch({
      type: AuhtTypes.LOGIN_SUCCESS,
    });
    toast({
      title: 'LOGIN SUCCESS',
      position: 'top',
      status: 'success',
      duration: 2000,
      onCloseComplete: () => toast.closeAll(),
    });
  } catch (error) {
    dispatch({
      type: AuhtTypes.LOGIN_FAIL,
      payload: {
        error: error.response?.data,
      },
    });
    toast({
      status: 'error',
      title: error.response?.data.message.message,
      position: 'top',
      duration: 2000,
      onCloseComplete: () => toast.closeAll(),
    });
  }
};

export const SignUp = (route, registerData, toast) => async (dispatch) => {
  try {
    dispatch({
      type: AuhtTypes.REGISTER,
    });
    const res = await AxiosConfig.post(AuthEndpoint.REGISTER, registerData);
    console.log(res);
    dispatch({
      type: AuhtTypes.REGISTER_SUCCESS,
    });
    toast({
      title: 'REGISTER SUCCESS',
      position: 'top',
      status: 'success',
      duration: 2000,
      onCloseComplete: () => {
        toast.closeAll();
        route.push('/');
      },
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: AuhtTypes.REGISTER_FAIL,
      payload: {
        error: error.response?.data,
      },
    });
    toast({
      status: 'error',
      title: error.response?.data.message.message,
      position: 'top',
      duration: 2000,
      onCloseComplete: () => toast.closeAll(),
    });
  }
};
