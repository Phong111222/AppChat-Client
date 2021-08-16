import { io } from 'socket.io-client';
import { ServiceTypes } from './type';

const inittialState = {
  socket: null,
};

const reducer = (state = inittialState, action) => {
  switch (action.type) {
    case ServiceTypes.INIT_SOCKET:
      const socket = io('http://localhost:5000');

      return { ...state, socket };
    case ServiceTypes.LOGOUT: {
      state.socket.emit('send-offline', action.payload.user);
      return state;
    }
    case ServiceTypes.LEAVE_SOCKET: {
      state?.socket.disconnect();

      state?.socket.close();
      return { ...state, ...inittialState };
    }

    default:
      return state;
  }
};

export default reducer;
