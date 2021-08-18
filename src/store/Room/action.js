import { getToken } from '../../utils/getToken';
import AxiosConfig from '../../utils/constant';
import { Room } from '../../utils/endpoints';
import RoomTypes from './type';
export const GetListSingleRooms = (token) => async (dispatch, getState) => {
  try {
    const {
      user: {
        info: { _id },
      },
    } = getState();
    dispatch({
      type: RoomTypes.GET_SINGLE_ROOM_LIST,
    });
    const jwt = token || getToken();
    const {
      data: {
        message: { rooms },
      },
    } = await AxiosConfig.get(Room.LIST_SINGLE_ROOM_OF_USER(_id), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: RoomTypes.GET_SINGLE_ROOM_LIST_SUCCESS,
      payload: {
        rooms,
        userId: _id.toString(),
      },
    });
  } catch (error) {
    dispatch({
      type: RoomTypes.GET_SINGLE_ROOM_LIST_FAIL,
      payload: {
        error: error,
      },
    });
  }
};

export const SelectRoom = (roomId) => async (dispatch) => {
  try {
    dispatch({
      type: RoomTypes.SELECT_ROOM,
      payload: {
        roomId,
      },
    });
  } catch (error) {}
};

export const GetRoomListMessage = (roomId) => async (dispatch) => {
  try {
    dispatch({
      type: RoomTypes.GET_ROOM_LIST_MESSAGE,
    });
    const token = getToken();
    const {
      data: {
        message: { messages },
      },
    } = await AxiosConfig.get(Room.SINGLE_ROOM_MESSAGES(roomId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: RoomTypes.GET_ROOM_LIST_MESSAGE_SUCCESS,
      payload: {
        messages,
      },
    });
  } catch (error) {
    dispatch({
      type: RoomTypes.GET_ROOM_LIST_MESSAGE_FAIL,
      payload: {
        error,
      },
    });
  }
};

export const GetMoreMessage = (messages) => {
  return {
    type: RoomTypes.GET_MORE_MESSAGE,
    payload: {
      messages,
    },
  };
};

export const AddMessage = (newMessage) => {
  return {
    type: RoomTypes.ADD_MESSAGE,
    payload: {
      newMessage,
    },
  };
};

export const AddMessageByRoomId = (newMessage, roomId) => {
  return {
    type: RoomTypes.ADD_MESSAGE_BY_ROOMID,
    payload: {
      newMessage,
      roomId,
    },
  };
};

export const SetOnline = (userId) => {
  return {
    type: RoomTypes.SET_ONLINE,
    payload: {
      userId,
    },
  };
};
export const SetOffline = (userId) => {
  return {
    type: RoomTypes.SET_OFFLINE,
    payload: {
      userId,
    },
  };
};

export const AddNewRoom = (newRoom) => ({
  type: RoomTypes.ADD_NEW_ROOM,
  payload: {
    newRoom,
  },
});
