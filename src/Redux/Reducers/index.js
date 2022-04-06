import { combineReducers } from 'redux';
import loadingReducer from './loading';
import tokenReducer from './token';
import userInfosReducer from './userInfos';

const rootReducer = combineReducers({
  player: userInfosReducer,
  token: tokenReducer,
  isLoading: loadingReducer,
});

export default rootReducer;
