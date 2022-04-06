import { GET_USER_INFOS, SET_SCORE, ZERO_SCORE } from '../Actions';

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
  case SET_SCORE:
    return { ...state,
      score: state.score + action.score,
      assertions: state.assertions + action.assertion,
    };
  case ZERO_SCORE:
    return { ...state,
      assertions: 0,
      score: 0,
    };
  default: return state;
  }
};

export default userInfosReducer;
