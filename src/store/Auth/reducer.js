import AuhtTypes from './type';

const initialState = {
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuhtTypes.LOGIN:
      return { ...state, loading: true };
    case AuhtTypes.LOGIN_SUCCESS:
      return { ...state, loading: false };
    case AuhtTypes.LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case AuhtTypes.REGISTER:
      return { ...state, loading: true };
    case AuhtTypes.REGISTER_SUCCESS:
      return { ...state, loading: false };
    case AuhtTypes.REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default authReducer;
