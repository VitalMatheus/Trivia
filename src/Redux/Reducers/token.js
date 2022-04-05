import { GET_TOKEN } from '../Actions';

const INITIAL_TOKEN = '';

const tokenReducer = (state = INITIAL_TOKEN, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return action.token;
  default: return state;
  }
};

export default tokenReducer;
