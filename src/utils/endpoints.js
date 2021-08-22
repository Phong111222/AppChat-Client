export const AuthEndpoint = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
};

export const User = {
  INFO: (userId) => `/user/${userId}`,
  FRIENDS: `/user/friends/list`,
  SUGGEST_FRIENDS: `/user/friends/random`,
  REQUEST: `/user/friends/request`,
  CHANGE_PASSWORD: (userId) => `/user/${userId}`,
};

export const Friend = {
  SEND_REQUEST: (userId) => `/friend/${userId}`,
  ACCEPT_REQUEST: (userId) => `/friend/${userId}`,
  DELETE_REQUEST: (userId) => `/friend/${userId}`,
};

export const Room = {
  LIST_SINGLE_ROOM_OF_USER: (userId) => `/room/singleRooms/${userId}`,
  CREATE_SINGLE_ROOM: `/room`,
  SINGLE_ROOM_MESSAGES: (roomId, number = 1) =>
    `/message/singleMessage/${roomId}?numberOfMessages=${number}`,
  CREATE_SINGLE_MESSAGE: (roomId) => `/message/singleMessage/${roomId}`,
  CREATE_GROUP_ROOM: '/room/group',
  ADD_USERS_INTO_GROUP: (roomId) => `/room/group/${roomId}`,
};

export const Upload = {
  UPLOAD: '/upload',
  GET_FILE: (filename) => `/upload/${filename}`,
};
