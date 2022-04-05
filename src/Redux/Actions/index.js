export const GET_TOKEN = 'GET_TOKEN';
export const IS_LOADING = 'IS_LOADING';
export const NOT_LOADING = 'NOT_LOADING';

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
