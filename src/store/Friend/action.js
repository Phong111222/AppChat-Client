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

export const AddRequest = (userRequest) => async (dispatch) => {
  try {
    dispatch({
      type: FriendTypes.ADD_FRIEND_REQUEST,
      payload: {
        userRequest,
      },
    });
    // call api
  } catch (error) {
    dispatch({
      type: FriendTypes.ERROR,
      payload: {
        error: error.response,
      },
    });
  }
};

export const DeleteRequest = (userId) => (dispatch) => {
  try {
    dispatch({
      type: FriendTypes.DELETE_FRIEND_REQUEST,
      payload: {
        userId,
      },
    });
    // call api
  } catch (error) {
    dispatch({
      type: FriendTypes.ERROR,
      payload: {
        error: error.response,
      },
    });
  }
};

export const AcceptFriendRequest = (userId) => (dispatch) => {
  try {
    dispatch({
      type: FriendTypes.ACCEPT_FRIEND_REQUEST,
      payload: {
        userId,
      },
    });
    //call api
  } catch (error) {
    dispatch({
      type: FriendTypes.ERROR,
      payload: {
        error: error.response,
      },
    });
  }
};

export const FriendRequestAccepted = (user) => (dispatch) => {
  try {
    dispatch({
      type: FriendTypes.FRIEND_REQUEST_ACCEPTED,
      payload: {
        user,
      },
    });
  } catch (error) {}
};

export const SetFriendOnline = (userId) => (dispatch) => {
  dispatch({
    type: FriendTypes.FRIEND_ONLINE,
    payload: {
      userId,
    },
  });
};
export const SetFriendOffline = (userId) => (dispatch) => {
  dispatch({
    type: FriendTypes.FRIEND_OFFLINE,
    payload: {
      userId,
    },
  });
};

export const DeleteOneFriendSuggestion = (userId) => ({
  type: FriendTypes.DELETE_ONE_FRIEND_SUGGESTION,
  payload: {
    userId,
  },
});
