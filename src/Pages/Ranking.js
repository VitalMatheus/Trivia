import PropTypes from 'prop-types';
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { getRanking } from '../Services/localStorage';
import '../Styles/Ranking.css';

class Ranking extends React.Component {
  btnGoHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const ranking = getRanking() || [];
    return (
      <section className="ranking-page">
        <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
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
  history: PropTypes.arrayOf({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
