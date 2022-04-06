import { SET_GAME_SETTINGS } from '../Actions';

const INITIAL_SETTINGS = {
  type: '',
  difficulty: '',
  category: 0,
};

const gameSettingsReducer = (state = INITIAL_SETTINGS, action) => {
  switch (action.type) {
  case SET_GAME_SETTINGS:
    return {
      ...state,
      ...action.payload,
    };
  default: return state;
  }
};

export default gameSettingsReducer;
