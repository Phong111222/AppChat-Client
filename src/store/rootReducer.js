import { combineReducers } from 'redux';

import AuthReducer from './Auth/reducer';

const RootReducer = combineReducers({
  auth: AuthReducer,
});

export default RootReducer;
