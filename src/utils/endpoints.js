export const AuthEndpoint = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
};

export const User = {
  INFO: (userId) => `/user/${userId}`,
};
