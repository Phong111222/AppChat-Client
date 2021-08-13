export const AuthEndpoint = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
};

export const User = {
  INFO: (userId) => `/user/${userId}`,
  FRIENDS: `/user/friends/list`,
  SUGGEST_FRIENDS: `user/friends/random`,
};

export const Room = {
  LIST_SINGLE_ROOM_OF_USER: (userId) => `/room/singleRooms/${userId}`,
  CREATE_SINGLE_ROOM: `/room/`,
  SINGLE_ROOM_MESSAGES: (roomId) => `/message/singleMessage/${roomId}`,
  CREATE_SINGLE_MESSAGE: (roomId) => `/message/singleMessage/${roomId}`,
};
