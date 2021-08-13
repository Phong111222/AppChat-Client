import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
  key: 'root',

  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'user', 'room', 'friend'],
};

const persistedReudcer = persistReducer(persistConfig, RootReducer);

const composeEnhancer = composeWithDevTools({ trace: true });

export const store = createStore(
  persistedReudcer,
  composeEnhancer(applyMiddleware(thunk))
);
export const persistor = persistStore(store);

const wrapper = createWrapper(() => store);

export default wrapper;
