import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import AuthReducer from './Auth/reducer';
import UserReducer from './User/reducer';

const combinedReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
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
