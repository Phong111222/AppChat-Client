import FriendTypes from "./type";

const inititalState = {
    suggestList =[],
    loading: false,
    error: null,
    listFriends:[]
}


const FriendReducer = (state = inititalState, action) => {
    switch (action.type) {
        case FriendTypes.GET_SUGGEST_LIST:
            
            break;
    
        default:
            return state
    }
}

export default FriendReducer