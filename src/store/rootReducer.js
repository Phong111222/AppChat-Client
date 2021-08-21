import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import AuthReducer from './Auth/reducer';
import UserReducer from './User/reducer';
import RoomReducer from './Room/reducer';
import FriendReducer from './Friend/reducer';
import NumberOfMessagesReducer from './NumberOfMessages';
import NavigateReducer from './Navigation/reducer';

const combinedReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  room: RoomReducer,
  friend: FriendReducer,
  numberofmessages: NumberOfMessagesReducer,
  navigation: NavigateReducer,
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
