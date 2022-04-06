import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { zeroScore } from '../Redux/Actions';
import Header from '../Components/Header';

class Feedback extends React.Component {
  btnPlayAgain = () => {
    const { history, dispatch } = this.props;
    const aux = 0;
    dispatch(zeroScore(aux));
    history.push('/');
  }

  btnRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { score, assertions } = this.props;
    const MIN_ASSERT = 3;
    return (
      <>
        <Header />
        <section>
          <p data-testid="feedback-text">
            {assertions < MIN_ASSERT ? 'Could be better...' : 'Well Done!'}
          </p>
          <p>
            Pontuação:
            {' '}
            <span data-testid="feedback-total-score">
              { score }
            </span>
          </p>
          <p>
            Número de acertos:
            {' '}
            <span data-testid="feedback-total-question">
              { assertions }
            </span>
          </p>
        </section>
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
