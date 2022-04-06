import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { AiOutlineHome } from 'react-icons/ai';
import { getRanking } from '../Services/localStorage';
import '../Styles/Ranking.css';

class Ranking extends React.Component {
  btnGoHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  sortedRanking = () => {
    let ranking = getRanking();
    ranking = ranking.sort((a, b) => b.score - a.score);
    return ranking;
  }

  render() {
    const ranking = this.sortedRanking();
    return (
      <section className="ranking-page">
        <p data-testid="ranking-title" className="ranking-title">
          Ranking
        </p>
        <button
          className="ranking-btn"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.btnGoHome }
        >
          <AiOutlineHome className="home-icon" />
        </button>
        <section className="ranking-sect">
          {ranking.map(({ name, score, picture }, index) => (
            <div key={ name } className="ranking-card">
              <img src={ picture } alt={ name } />
              <p
                data-testid={ `player-name-${index}` }
                className="ranking-name"
              >
                { name }
              </p>
              <p>
                <span data-testid={ `player-score-${index}` }>{ score }</span>
                <span> pontos</span>
              </p>
            </div>
          ))}
        </section>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
