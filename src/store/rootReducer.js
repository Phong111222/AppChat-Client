import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import AuthReducer from './Auth/reducer';
import UserReducer from './User/reducer';
import RoomReducer from './Room/reducer';
import FriendReducer from './Friend/reducer';

const combinedReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  room: RoomReducer,
  friend: FriendReducer,
});

const RootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = { ...state, ...action.payload };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default RootReducer;
