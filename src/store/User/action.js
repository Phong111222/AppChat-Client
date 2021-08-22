import UserTypes from './type';
import AxiosConfig from '../../utils/constant';
import { User } from '../../utils/endpoints';
export const GetInfoUser = (UserId, token) => async (dispatch) => {
  try {
    dispatch({
      type: UserTypes.GET_INFO,
    });
    const jwt =
      token ||
      (typeof window !== 'undefined' && window.localStorage.getItem('jwt')) ||
      null;

    const {
      data: { message },
    } = await AxiosConfig.get(User.INFO(UserId), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: UserTypes.GET_INFO_SUCCESS,
      payload: {
        data: message,
      },
    });
  } catch (error) {
    dispatch({
      type: UserTypes.GET_INFO_FAIL,
      payload: {
        error: error.response,
      },
    });
  }
};

export const OpenMakeGroupModal = () => ({
  type: UserTypes.OPEN_MODAL_MAKE_GROUP,
});
export const CloseMakeGroupModal = () => ({
  type: UserTypes.CLOSE_MODAL_MAKE_GROUP,
});
export const OpenGalleryModal = () => ({
  type: UserTypes.OPEN_GALLERY_MODAL,
});
export const CloseGalleryModal = () => ({
  type: UserTypes.CLOSE_GALLERY_MODAL,
});
export const OpenImageModal = () => ({
  type: UserTypes.OPEN_IMAGE_MODAL,
});
export const CloseImageModal = () => ({
  type: UserTypes.CLOSE_IMAGE_MODAL,
});

export const OpenAddUsersModal = () => ({
  type: UserTypes.OPEN_ADD_USERS_MODAL,
});
export const CloseAddUsersModal = () => ({
  type: UserTypes.CLOSE_ADD_USERS_MODAL,
});

export const OpenSettingModal = () => ({
  type: UserTypes.OPEN_SETTING_MODAL,
});
export const CloseSettingModal = () => ({
  type: UserTypes.CLOSE_SETTING_MODAL,
});

export const selectImage = (urlImage) => {
  return {
    type: UserTypes.SELECT_IMAGE,
    payload: {
      urlImage,
    },
  };
};
