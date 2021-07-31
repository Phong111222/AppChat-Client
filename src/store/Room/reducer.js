import RoomTypes from './type';
const inititalState = {
  rooms: [],
  selectedRoom: null,
  loading: false,
  error: null,
};

const RoomReducer = (state = inititalState, action) => {
  switch (action.type) {
    case RoomTypes.GET_SINGLE_ROOM_LIST:
      return { ...state, loading: true };
    case RoomTypes.GET_SINGLE_ROOM_LIST_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case RoomTypes.GET_SINGLE_ROOM_LIST_SUCCESS: {
      const userId = action.payload.userId;
      const rooms = action.payload.rooms.map((room) => {
        let roomName = '';
        room.users.forEach((user) => {
          if (user._id !== userId) {
            roomName = user.name;
          }
        });
        return { ...room, roomName: roomName, active: false };
      });

      return { ...state, loading: false, rooms: rooms };
    }
    case RoomTypes.SELECT_ROOM: {
      const roomId = action.payload.roomId;
      const room = state.rooms.find((room) => room._id === roomId);
      const rooms = state.rooms.map((room) =>
        room._id === roomId
          ? { ...room, active: true }
          : { ...room, active: false }
      );
      return { ...state, selectedRoom: room, rooms };
    }
    case RoomTypes.GET_ROOM_LIST_MESSAGE:
      return { ...state, loading: true };
    case RoomTypes.GET_ROOM_LIST_MESSAGE_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case RoomTypes.GET_ROOM_LIST_MESSAGE_SUCCESS: {
      const newRooms = state.rooms.map((room) =>
        room._id === state.selectedRoom._id
          ? { ...room, messages: action.payload.messages }
          : room
      );

      return {
        ...state,
        loading: false,
        rooms: newRooms,
        selectedRoom: {
          ...state.selectedRoom,
          messages: action.payload.messages,
        },
      };
    }

    case RoomTypes.ADD_MESSAGE: {
      const newMessages = state.selectedRoom.messages;
      newMessages.push(action.payload.newMessage);
      const newRooms = state.rooms.map((room) =>
        room._id === state.selectedRoom._id
          ? { ...room, messages: newMessages }
          : room
      );
      return {
        ...state,
        rooms: newRooms,
        selectedRoom: {
          ...state.selectedRoom,
          messages: newMessages,
        },
      };
    }
    case RoomTypes.SET_ONLINE: {
      const userId = action.payload.userId;
      const rooms = state.rooms.map((room) => {
        let onlineUser = null;
        room.users.forEach((user) => {
          if (user._id === userId) {
            onlineUser = user.name;
          }
        });
        return { ...room, onlineUser, active: false };
      });
      return { ...state, loading: false, rooms: rooms };
    }
    case RoomTypes.RESET_ROOM:
      return { ...state, ...inititalState };

    default:
      return state;
  }
};

export default RoomReducer;
