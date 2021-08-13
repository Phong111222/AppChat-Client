import FriendTypes from './type';
import { getToken } from '../../utils/getToken';
import AxiosConfig from '../../utils/constant';
import { User } from '../../utils/endpoints';

export const GetListFriends = (token) => async (dispatch) => {
  try {
    dispatch({
      type: FriendTypes.GET_FRIENDS,
    });
    const {
      data: {
        message: { friends },
      },
    } = await AxiosConfig.get(User.FRIENDS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: FriendTypes.GET_FRIENDS_SUCCESS,
      payload: {
        friends,
      },
    });
  } catch (error) {
    dispatch({
      type: FriendTypes.GET_FRIENDS_FAIL,
      payload: {
        error: error.response,
      },
    });
  }
};

export const GetListFriendsSuggest = () => async (dispatch) => {
  try {
    dispatch({
      type: FriendTypes.GET_SUGGEST_LIST,
    });
    const token = getToken();
    const {
      data: {
        message: { friendsSuggest },
      },
    } = await AxiosConfig.get(User.SUGGEST_FRIENDS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: FriendTypes.GET_SUGGEST_LIST_SUCCESS,
      payload: {
        friendsSuggest,
      },
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: FriendTypes.GET_SUGGEST_LIST_FAIL,
      payload: {
        error: error.response,
      },
    });
  }
};

export const GetListFriendRequests = () => async (dispatch) => {
  try {
    const {
      data: {
        message: { friendRequests },
      },
    } = await AxiosConfig.get(User.REQUEST, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    dispatch({
      type: FriendTypes.GET_FRIEND_REQUESTS_SUCCESS,
      payload: {
        friendRequests,
      },
    });
  } catch (error) {
    dispatch({
      type: FriendTypes.GET_FRIEND_REQUESTS_FAIL,
      payload: {
        error: error.response,
      },
    });
  }
};

export const DeleteRequest = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: FriendTypes.DELETE_FRIEND_REQUEST,
      payload: {
        userId,
      },
    });
  } catch (error) {
    dispatch({
      type: FriendTypes.ERROR,
      payload: {
        error: error.response,
      },
    });
  }
};
