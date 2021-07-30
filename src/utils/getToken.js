export const getToken = () => {
  const token =
    (typeof window !== 'undefined' && window.localStorage.getItem('jwt')) ||
    null;
  return token;
};
