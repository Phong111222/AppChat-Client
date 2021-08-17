import FriendTypes from './type';

const inititalState = {
  suggestList: [],
  loading: false,
  error: null,
  listFriends: [],
  listFriendRequests: [],
  onlineFriends: [],
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
    case FriendTypes.GET_FRIENDS_SUCCESS: {
      const onlineFriends = state.onlineFriends;
      const newListFriends = action.payload.friends.map((friend) =>
        onlineFriends.includes(friend._id)
          ? {
              ...friend,
              isOnline: true,
            }
          : { ...friend, isOnline: false }
      );
      return {
        ...state,
        loading: false,
        listFriends: newListFriends,
      };
    }
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
    case FriendTypes.ADD_FRIEND_REQUEST: {
      const userRequest = action.payload.userRequest;

      return {
        ...state,
        listFriendRequests: [...state.listFriendRequests, userRequest],
      };
    }
    case FriendTypes.DELETE_FRIEND_REQUEST: {
      return {
        ...state,
        listFriendRequests: state.listFriendRequests.filter(
          (request) => request._id.toString() !== action.payload.userId
        ),
      };
    }
    case FriendTypes.ACCEPT_FRIEND_REQUEST: {
      const { userId } = action.payload;
      const AcceptedUser = state.listFriendRequests.find(
        (request) => request._id.toString() === userId
      );
      return {
        ...state,
        listFriends: [...state.listFriends, AcceptedUser],
        listFriendRequests: state.listFriendRequests.filter(
          (request) => request._id.toString() !== userId
        ),
      };
    }
    case FriendTypes.FRIEND_REQUEST_ACCEPTED: {
      return {
        ...state,
        listFriends: [...state.listFriends, action.payload.user],
      };
    }
    case FriendTypes.FRIEND_ONLINE: {
      let newOnlineFriends = [...state.onlineFriends];
      const { userId } = action.payload;
      if (!state.onlineFriends.includes(userId)) {
        newOnlineFriends = [...newOnlineFriends, userId];
      }

      return {
        ...state,
        onlineFriends: newOnlineFriends,
        listFriends: state.listFriends.map((friend) =>
          friend._id === action.payload.userId
            ? { ...friend, isOnline: true }
            : friend
        ),
      };
    }
    case FriendTypes.FRIEND_OFFLINE: {
      const { userId } = action.payload;
      const newOnlineFriends = state.onlineFriends;
      const index = newOnlineFriends.filter((friend) => friend !== userId);
      newOnlineFriends.splice(index, 1);
      return {
        ...state,
        onlineFriends: newOnlineFriends,
        listFriends: state.listFriends.map((friend) =>
          friend._id === userId ? { ...friend, isOnline: false } : friend
        ),
      };
    }
    case FriendTypes.RESET: {
      return { ...state, ...inititalState };
    }
    default:
      return state;
  }
};

export default FriendReducer;
