const type = {
  SET_NUMBER_OF_MESSAGES: 'numberOfMessages/SET_NUMBER_OF_MESSAGES',
  PERMISSION_GET_MORE: 'numberOfMessages/PERMISSION_GET_MORE',
  RESET: 'numberOfMessages/RESET',
};

export const SetNumberOfMessages = (increaseNumber) => {
  return {
    type: type.SET_NUMBER_OF_MESSAGES,
    payload: {
      increaseNumber,
    },
  };
};

export const ResetNumberOfMessages = () => ({
  type: type.RESET,
});

export const SetPermissionToGetMore = () => ({
  type: type.PERMISSION_GET_MORE,
});

const initialState = {
  NumberOfMessages: 1,
  permission: true,
};

const NumberOfMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_NUMBER_OF_MESSAGES: {
      return {
        ...state,
        NumberOfMessages:
          state.NumberOfMessages + action.payload.increaseNumber,
      };
    }
    case type.PERMISSION_GET_MORE: {
      return {
        ...state,
        permission: false,
      };
    }
    case type.RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
export default NumberOfMessagesReducer;
