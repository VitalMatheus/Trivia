import { combineReducers } from 'redux';
import gameSettingsReducer from './gameSettings';
import loadingReducer from './loading';
import tokenReducer from './token';
import userInfosReducer from './userInfos';

const rootReducer = combineReducers({
  player: userInfosReducer,
  token: tokenReducer,
  isLoading: loadingReducer,
  gameSettings: gameSettingsReducer,
});

export default rootReducer;
