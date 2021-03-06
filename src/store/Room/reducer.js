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
        const avatar = room.users.find((user) => user._id !== userId)?.avatar;

        return {
          ...room,
          roomName: roomName,
          avatar,
          active:
            !!state.selectedRoom &&
            (room._id === state.selectedRoom?._id || false),
        };
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
      let gallery = [];
      room.messages.forEach((msg) => {
        gallery = [...gallery, ...msg.images];
      });

      return {
        ...state,

        selectedRoom: { ...room, gallery },
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
    case RoomTypes.ADD_NEW_ROOM: {
      return {
        ...state,
        rooms: [...state.rooms, action.payload.newRoom],
      };
    }
    case RoomTypes.ADD_MESSAGE: {
      const newMessage = action.payload.newMessage;
      const selectedRoom = state.selectedRoom;

      if (newMessage.room === selectedRoom._id) {
        const newMessages = [...selectedRoom.messages, newMessage];
        const newRooms = state.rooms.map((room) =>
          room._id === newMessage.room
            ? { ...room, messages: newMessages }
            : room
        );
        return {
          ...state,
          rooms: newRooms.sort((x, y) =>
            x._id === newMessage.room ? -1 : y._id === newMessage._id ? 1 : 0
          ),
          selectedRoom: {
            ...selectedRoom,
            messages: newMessages,
            gallery: [...selectedRoom.gallery, ...newMessage.images],
          },
        };
      } else {
        return {
          ...state,
          rooms: state.rooms
            .map((room) =>
              room._id === newMessage.room
                ? { ...room, messages: [...room.messages, newMessage] }
                : room
            )
            .sort((x, y) =>
              x._id === newMessage.room ? -1 : y._id === newMessage._id ? 1 : 0
            ),
        };
      }
    }
    case RoomTypes.ADD_MESSAGE_BY_ROOMID: {
      const newMessage = action.payload.newMessage;
      const newRoom = state.rooms.find(
        (room) => room._id === action.payload.roomId
      );

      newRoom?.messages.push(newMessage);
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
        let onlineUser = '';
        room.users.forEach((user) => {
          if (user._id === userId) {
            onlineUser = user.name;
          }
        });

        return { ...room, onlineUser };
      });
      if (state.selectedRoom) {
        const user = state.selectedRoom.users.find(
          (user) => user._id === userId
        );
        if (user) {
          return {
            ...state,
            loading: false,
            rooms: rooms,
            selectedRoom: { ...state.selectedRoom, onlineUser: user.name },
          };
        }
      }
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
      if (state.selectedRoom) {
        const user = state.selectedRoom.users.find(
          (user) => user._id === userId
        );
        if (user) {
          return {
            ...state,
            loading: false,
            rooms: rooms,
            selectedRoom: { ...state.selectedRoom, onlineUser: null },
          };
        }
      }
      return { ...state, loading: false, rooms: rooms };
    }
    case RoomTypes.GET_MORE_MESSAGE: {
      const moreMessages = action.payload.messages;
      return {
        ...state,
        selectedRoom: {
          ...state.selectedRoom,
          messages: [...moreMessages, ...state.selectedRoom.messages],
        },
      };
    }
    case RoomTypes.EDIT_SELECTED_ROOM_NAME: {
      return {
        ...state,
        selectedRoom: {
          ...state?.selectedRoom,
          roomName: `${
            state?.selectedRoom?.roomName
          }, ${action.payload.users.join(', ')}`,
          users: [...state.selectedRoom?.users, ...action.payload.listAddUsers],
        },
      };
    }
    case RoomTypes.RESET_ROOM:
      return { ...state, ...inititalState };
    default:
      return state;
  }
};

export default RoomReducer;
