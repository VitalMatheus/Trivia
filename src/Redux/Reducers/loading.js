import { IS_LOADING, NOT_LOADING } from '../Actions';

const INITIAL_LOADING = false;

const loadingReducer = (state = INITIAL_LOADING, action) => {
  switch (action.type) {
  case IS_LOADING:
    return true;

  case NOT_LOADING:
    return false;

  default: return state;
  }
};

export default loadingReducer;
