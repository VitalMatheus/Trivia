const TRIVIA_RANKING = 'TRIVIA_RANKING';

if (!localStorage.getItem(TRIVIA_RANKING)) {
  localStorage.setItem(TRIVIA_RANKING, JSON.stringify([]));
}

export const addPlayer = (player) => {
  const list = JSON.parse(localStorage.getItem(TRIVIA_RANKING)) || [];
  const newList = [...list, player];
  localStorage.setItem(TRIVIA_RANKING, JSON.stringify(newList));
};

export const getRanking = () => {
  const list = JSON.parse(localStorage.getItem(TRIVIA_RANKING));
  return list;
};
