import PropTypes from 'prop-types';
import React from 'react';
// import { getRanking } from '../Services/localStorage';

class Ranking extends React.Component {
  btnGoHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  sortedRanking = () => {
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking = ranking.sort((a, b) => b.score - a.score);
    return ranking;
  }

  render() {
    const ranking = this.sortedRanking();
    return (
      <section>
        <p data-testid="ranking-title">Ranking</p>
        {ranking.map(({ name, score, picture }, index) => (
          <div key={ index }>
            <img src={ picture } alt={ name } />
            <p data-testid={ `player-name-${index}` }>{ name }</p>
            <p><span>Pontuação</span></p>
            <p><span data-testid={ `player-score-${index}` }>{ score }</span></p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.btnGoHome }
        >
          Home
        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.arrayOf({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
