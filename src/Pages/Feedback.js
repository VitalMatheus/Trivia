import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import '../Styles/Feedback.css';

class Feedback extends React.Component {
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
        <section className="feedback-sect">
          <section className="feed-sect">
            <p data-testid="feedback-text">
              {assertions < MIN_ASSERT ? 'Could be better...' : 'Well Done!'}
            </p>
            <p>
              <span>
                Pontuação
              </span>
              <span data-testid="feedback-total-score">
                { score }
              </span>
            </p>
            <p>
              <span>
                Número de acertos
              </span>
              <span data-testid="feedback-total-question">
                { assertions }
              </span>
            </p>
          </section>
          <section className="btn-sect">
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
      </section>
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
};

export default connect(mapStateToProps)(Feedback);
