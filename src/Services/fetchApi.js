export const fetchApi = async (obj) => {
  const { token, gameSettings } = obj;
  const { type, difficulty, category } = gameSettings;
  let endpoint = 'https://opentdb.com/api.php?amount=5';
  if (category) endpoint += `&category=${category}`;
  if (difficulty) endpoint += `&difficulty=${difficulty}`;
  if (type) endpoint += `&type=${type}`;
  endpoint += `&token=${token}`;
  const responseAsk = await fetch(endpoint);
  const ask = await responseAsk.json();
  return ask;
};

export const fetchCategories = async () => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  return data.trivia_categories;
};
