// import { secret } from '../../utils/constant';
// import { DecryptMessage } from '../../utils/func';
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
        const listUserFilter = room.users
          .filter((user) => user._id !== userId)
          .map((user) => user.name);
        const roomName = listUserFilter.join(', ');

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
      return {
        ...state,
        // selectedRoom: {
        //   ...room,
        //   messages: room.messages.map((message) => {
        //     return {
        //       ...message,
        //       text: DecryptMessage(message.text, room._id),
        //     };
        //   }),
        // },
        selectedRoom: room,
        rooms,
      };
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
          // messages: action.payload.messages.map((message) => {
          //   return {
          //     ...message,
          //     text: DecryptMessage(message.text, message.room),
          //   };
          // }),
          messages: action.payload.messages,
        },
      };
    }

    case RoomTypes.ADD_MESSAGE: {
      const newMessages = state.selectedRoom.messages;
      const newMessage = {
        ...action.payload.newMessage,
        // text: action.payload.newMessage.text,
      };
      newMessages.push(newMessage);
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
    case RoomTypes.ADD_MESSAGE_BY_ROOMID: {
      const newMessage = action.payload.newMessage;
      const newRoom = state.rooms.find(
        (room) => room._id === action.payload.roomId
      );

      newRoom.messages.push(newMessage);
      const newRooms = state.rooms.map((room) =>
        room._id === action.payload.roomId ? { ...room, ...newRoom } : room
      );
      return {
        ...state,
        rooms: newRooms,
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
        return { ...room, onlineUser };
      });
      return { ...state, loading: false, rooms: rooms };
    }
    case RoomTypes.SET_OFFLINE: {
      const userId = action.payload.userId;
      const rooms = state.rooms.map((room) => {
        let onlineUser = null;
        room.users.forEach((user) => {
          if (user._id === userId) {
            onlineUser = '';
          }
        });
        return { ...room, onlineUser };
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
