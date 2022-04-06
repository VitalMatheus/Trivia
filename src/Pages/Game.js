import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { fetchApi } from '../Services/fetchApi';
import '../Styles/Game.css';
import { setScore } from '../Redux/Actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      index: 0,
      timer: 30,
      answers: [],
      correctAnswer: '',
      wrongAnswers: [],
      answerSelected: false,
      chosen: '',
    };
  }

  componentDidUpdate(prevProp) {
    const { loading } = this.props;
    if (!loading && prevProp.loading !== loading) {
      this.fetchQuestions();
    }
  }

  fetchQuestions = async () => {
    const { token, gameSettings } = this.props;
    const ask = await fetchApi({ token, gameSettings });
    this.setState({
      results: ask.results,
    }, () => {
      const { results, index } = this.state;
      this.randomBtns(results[index]);
      this.setTimer();
    });
  }

  randomBtns = (asks) => {
    const quest = asks.incorrect_answers;
    const questes = [...quest, asks.correct_answer];
    const RANDOM = 0.5;
    const sorted = questes.sort(() => Math.random() - RANDOM);
    this.setState({ answers: sorted,
      correctAnswer: asks.correct_answer,
      wrongAnswers: quest });
  }

  incrementIndexResults = () => {
    const MAX_LENGTH_RESULTS = 4;
    const { history } = this.props;
    const { index } = this.state;
    this.setState({
      index: index < MAX_LENGTH_RESULTS ? index + 1 : MAX_LENGTH_RESULTS,
      timer: 30,
      answerSelected: false,
    }, () => {
      const { results, index: ind } = this.state;
      clearInterval(this.timerId);
      this.setTimer();
      this.randomBtns(results[ind]);
    });
    if (index === MAX_LENGTH_RESULTS) {
      history.push('/feedback');
    }
  }

  setTimer = () => {
    const timeout = 1000;
    this.timerId = setInterval(() => {
      this.setState((prevSt) => ({
        timer: prevSt.timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer === 0) {
          clearInterval(this.timerId);
        }
      });
    }, timeout);
  }

  selectAnswer = (ask) => {
    // const { correctAnswer, wrongAnswers } = this.state;
    clearInterval(this.timerId);
    this.setState({ answerSelected: true,
      chosen: ask });
  }

  render() {
    const { results, index, timer, answers, correctAnswer,
      wrongAnswers, answerSelected, chosen } = this.state;
    return (
      <>
        <Header />
        <p className="timer">{timer}</p>
        <section className="game-sect">
          {
            results.length > 0
              && (
                <div className="game-card">
                  <div className="question-sect">
                    <h3 data-testid="question-category">{ results[index].category }</h3>
                    <article>
                      <p data-testid="question-text">
                        { results[index].question }
                      </p>
                    </article>
                  </div>
                  <div data-testid="answer-options" className="answers-sect">
                    {answers.map((ask) => (
                      <button
                        key={ ask }
                        type="button"
                        disabled={ timer === 0 }
                        className={ chosen ? 'correct' : 'wrong' }
                        data-testid={
                          ask === correctAnswer
                            ? 'correct-answer'
                            : `wrong-answer-${wrongAnswers.indexOf(ask)}`
                        }
                        onClick={ () => this.selectAnswer(ask) }
                      >
                        { ask }
                      </button>
                    ))}
                  </div>
                </div>
              )
          }
          <div className="next-btn-sect">
            {answerSelected && (
              <button
                className="btn-next"
                type="button"
                onClick={ this.incrementIndexResults }
                data-testid="btn-next"
              >
                Próximo
              </button>
            )}
          </div>
        </section>
      </>
    );
  }
}

Game.propTypes = {
  loading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  gameSettings: PropTypes.shape({
    type: PropTypes.string,
    category: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  loading: state.isLoading,
  gameSettings: state.gameSettings,
});

export default connect(mapStateToProps)(Game);
