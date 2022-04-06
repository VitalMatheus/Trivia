export const GET_TOKEN = 'GET_TOKEN';
export const IS_LOADING = 'IS_LOADING';
export const NOT_LOADING = 'NOT_LOADING';
export const GET_USER_INFOS = 'GET_USER_INFOS';
export const GET_SCORE_INFOS = 'GET_SCORE_INFOS';
export const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';
export const SET_SCORE = 'SET_SCORE';
export const ZERO_SCORE = 'ZERO_SCORE';

const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

const isLoading = {
  type: IS_LOADING,
};

const notLoading = {
  type: NOT_LOADING,
};

export const getUserInfos = (email, name) => ({
  type: GET_USER_INFOS,
  email,
  name,
});

export const setGameSettings = (payload) => ({
  type: SET_GAME_SETTINGS,
  payload,
});

export const setScore = (score, assertion) => ({
  type: SET_SCORE,
  score,
  assertion,
});

export const zeroScore = (score) => ({
  type: ZERO_SCORE,
  score,
});

export const fetchToken = () => async (dispatch) => {
  dispatch(isLoading);
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(getToken(data.token));
    dispatch(notLoading);
  } catch (error) {
    console.log(error);
  }
};
