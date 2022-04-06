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
    return (
      <section>
        <p data-testid="ranking-title">Ranking</p>
        <div>
          <img src="/" alt="imagem do Gravatar" />
          <p data-testid={ `player-name-${0}` }>nome</p>
          <span>pontuação</span>
          Os elementos com os nomes das pessoas que jogaram devem possuir o atributo  com o valor , onde $
          {index}
          {' '}
          é iniciado em zero
          Os elementos com as pontuações das pessoas que jogaram devem possuir o atributo data-testid com o valor player-score-$
          {index}
          , onde $
          {index}
          {' '}
          é iniciado em zer
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
