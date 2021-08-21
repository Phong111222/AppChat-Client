export const NavigationTypes = {
  CHANGE_PATH: 'navigate/CHANGE_PATH',
};

export const ChangePate = (path) => () => {
  const pathtype = path.split('/')[1];
  console.log(pathtype);
  return {
    type: NavigationTypes.CHANGE_PATH,
    payload: {
      pathtype,
    },
  };
};
