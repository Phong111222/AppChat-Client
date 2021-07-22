import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducer from './rootReducer';
const composeEnhancer = composeWithDevTools({ trace: true });

const store = createStore(RootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
