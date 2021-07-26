import UserTypes from './type';
import AxiosConfig from '../../utils/constant';
import { User } from '../../utils/endpoints';
export const GetInfoUser = (UserId, token) => async (dispatch) => {
  try {
    dispatch({
      type: UserTypes.GET_INFO,
    });
    const jwt =
      token ||
      (typeof window !== 'undefined' && window.localStorage.getItem('jwt')) ||
      null;

    const {
      data: { message },
    } = await AxiosConfig.get(User.INFO(UserId), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: UserTypes.GET_INFO_SUCCESS,
      payload: {
        data: message,
      },
    });
  } catch (error) {
    dispatch({
      type: UserTypes.GET_INFO_FAIL,
      payload: {
        error: error.response,
      },
    });
  }
};
