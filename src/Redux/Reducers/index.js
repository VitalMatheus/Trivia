import { combineReducers } from 'redux';
import tokenReducer from './token';
import loadingReducer from './loading';

const rootReducer = combineReducers({
  token: tokenReducer,
  isLoading: loadingReducer,
});

export default rootReducer;
