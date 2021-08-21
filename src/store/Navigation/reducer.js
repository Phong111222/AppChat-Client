import { RiGroupLine, RiMessage2Line } from 'react-icons/ri';
import { TiContacts } from 'react-icons/ti';
import { NavigationTypes } from './type';

const initialState = {
  path: [],
};

const NavigateReducer = (state = initialState, action) => {
  switch (action.type) {
    case NavigationTypes.CHANGE_PATH:
      return state;

    default:
      return state;
  }
};

export default NavigateReducer;
