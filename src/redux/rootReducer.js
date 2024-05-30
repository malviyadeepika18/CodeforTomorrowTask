import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices

import empReducer from './slices/emp';



// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({

  emp : empReducer,

});

export { rootPersistConfig, rootReducer };
