import FriendTypes from './type';

const inititalState = {
  suggestList: [],
  loading: false,
  error: null,
  listFriends: [],
  listFriendRequests: [],
};

const FriendReducer = (state = inititalState, action) => {
  switch (action.type) {
    case FriendTypes.GET_SUGGEST_LIST:
      return { ...state, loading: true };
    case FriendTypes.GET_SUGGEST_LIST_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case FriendTypes.GET_SUGGEST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        suggestList: action.payload.friendsSuggest,
      };
    case FriendTypes.GET_FRIENDS:
      return { ...state, loading: true };
    case FriendTypes.GET_FRIENDS_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case FriendTypes.GET_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        listFriends: action.payload.friends,
      };
    case FriendTypes.GET_FRIEND_REQUESTS:
      return { ...state, loading: true };
    case FriendTypes.GET_FRIEND_REQUESTS_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case FriendTypes.GET_FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        listFriendRequests: action.payload.friendRequests,
      };
    default:
      return state;
  }
};

export default FriendReducer;
