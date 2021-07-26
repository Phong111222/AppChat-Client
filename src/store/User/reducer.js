import UserTypes from './type';

const initialState = {
  loading: false,
  info: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTypes.GET_INFO:
      return { ...state, loading: true };
    case UserTypes.GET_INFO_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case UserTypes.GET_INFO_SUCCESS: {
      const { rooms, friends, ...newInfo } = action.payload.data;
      return { ...state, loading: false, info: newInfo };
    }
    case UserTypes.RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default UserReducer;
