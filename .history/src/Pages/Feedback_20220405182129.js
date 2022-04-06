import PropTypes from 'prop-types';
import React from 'react';

class Feedback extends React.Component {
  constructor() {
    super();
    this.redirectButton = this.redirectButton.bind(this);
  }

  redirectButton = () => {
    const { history } = this.props;
    history.push('/');
    console.log('teste');
  }

  render() {
    return (
      <>
        <header>
          <div data-testid="header-profile-picture" />
          <p data-testid="header-player-name">
            {/* { name } */}
          </p>
          <span data-testid="header-score">
            {/* {score} */}
          </span>
        </header>
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
            onClick={ this.redirectButton }
          >
            Play Again
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
