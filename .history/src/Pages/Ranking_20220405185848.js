import PropTypes from 'prop-types';
import React from 'react';

class Ranking extends React.Component {
  constructor() {
    super();
    this.btnGoHome = this.btnGoHome.bind(this);
  }

  btnGoHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const index = 0; // só pro lint não reclamar
    return (
      <section>
        <p data-testid="ranking-title">Ranking</p>
        <div>
          <img src="/" alt="Aqui fica a imagem do Gravatar" />
          <p data-testid={ `player-name-${index}` }>nome do jogador</p>
          <span>pontuação</span>
          <span data-testid={ `player-score-${index}` }> valor da pontuação</span>
        </div>
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
