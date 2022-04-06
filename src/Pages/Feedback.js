import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { zeroScore } from '../Redux/Actions';
import Header from '../Components/Header';
import { addPlayer } from '../Services/localStorage';

class Feedback extends React.Component {
  componentDidMount() {
    this.saveRanking();
  }

  saveRanking = () => {
    const { name, score, email, dispatch } = this.props;
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const playerRanking = {
      name,
      score,
      picture,
    };
    addPlayer(playerRanking);
    const aux = 0;
    dispatch(zeroScore(aux));
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
  name: state.player.name,
  email: state.player.gravatarEmail,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
