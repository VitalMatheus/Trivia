import PropTypes from 'prop-types';
import React from 'react';

class Feedback extends React.Component {
  constructor() {
    super();
    this.btnPlayAgain = this.btnPlayAgain.bind(this);
    this.btnRanking = this.btnRanking.bind(this);
  }

  btnPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  btnRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <>
        <div>
          <img data-testid="header-profile-picture" />
          <p data-testid="header-player-name">
            {/* { name } */}
          </p>
          <span data-testid="header-score">
            {/* {score} */}
          </span>
        </div>
        <section>
          <p data-testid="feedback-text">
            {/* {score < 3 ? 'Could be better...' : 'Well Done!'} */}
          </p>
          <span data-testid="feedback-total-score">
            {/* { localStorage chave score }  */}
          </span>
          <span data-testid="feedback-total-question">
            {/* { localSorage chave assertions } */}
          </span>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.btnPlayAgain }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.btnRanking }
          >
            Ranking
          </button>
        </section>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.arrayOf({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
