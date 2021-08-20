import UserTypes from './type';

const initialState = {
  loading: false,
  info: null,
  isModalMakeGroupOpen: false,
  isGalleryModalOpen: false,
  isImageModalOpen: false,
  selectedImage: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTypes.GET_INFO:
      return { ...state, loading: true };
    case UserTypes.GET_INFO_FAIL:
      return { ...state, loading: false, error: action.payload.error };
    case UserTypes.GET_INFO_SUCCESS: {
      const { rooms, friends, ...newInfo } = action.payload.data;
      return { ...state, loading: false, info: newInfo };
    }
    case UserTypes.SELECT_IMAGE:
      return {
        ...state,
        selectedImage: action.payload.urlImage,
      };
    case UserTypes.OPEN_MODAL_MAKE_GROUP:
      return { ...state, isModalMakeGroupOpen: true };
    case UserTypes.CLOSE_MODAL_MAKE_GROUP:
      return { ...state, isModalMakeGroupOpen: false };
    case UserTypes.OPEN_GALLERY_MODAL:
      return { ...state, isGalleryModalOpen: true };
    case UserTypes.CLOSE_GALLERY_MODAL:
      return { ...state, isGalleryModalOpen: false };
    case UserTypes.OPEN_IMAGE_MODAL:
      return { ...state, isImageModalOpen: true };
    case UserTypes.CLOSE_IMAGE_MODAL:
      return { ...state, isImageModalOpen: false };
    case UserTypes.RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default UserReducer;
