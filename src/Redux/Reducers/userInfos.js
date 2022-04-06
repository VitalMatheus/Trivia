import { GET_SCORE_INFOS, GET_USER_INFOS } from '../Actions';

const INITIAL_PLAYER = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userInfosReducer = (state = INITIAL_PLAYER, action) => {
  switch (action.type) {
  case GET_USER_INFOS:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case GET_SCORE_INFOS:
    return {
      ...state,
      assertions: action.assertions,
      score: action.score,
    };
  default: return state;
  }
};

export default userInfosReducer;
