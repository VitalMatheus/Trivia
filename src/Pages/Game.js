import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { fetchApi } from '../Services/fetchApi';
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
      // chosen: '',
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

  // Recebe array de questões
  randomBtns = (asks) => {
    // Questões erradas
    const quest = asks.incorrect_answers;
    // Todas as questões
    const questes = [...quest, asks.correct_answer];
    const RANDOM = 0.5;
    const sorted = questes.sort(() => Math.random() - RANDOM);
    // Salva questões corretas e incorretas no estado
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
      this.saveRanking();
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
    const { correctAnswer } = this.state;
    clearInterval(this.timerId);
    this.setState({ answerSelected: true,
      // chosen: ask
    });
    console.log(ask);
    console.log(correctAnswer);
    this.saveScore(ask);
  }

  saveScore = (ask) => {
    const { correctAnswer, results, index, timer } = this.state;
    const tres = 3;
    const { dispatch } = this.props;
    const { difficulty } = results[index];
    if (ask === correctAnswer) {
      if (difficulty === 'easy') {
        const score = 10;
        let aux = 0;
        aux = score + timer * 1;
        return dispatch(setScore(aux));
      }
      if (difficulty === 'medium') {
        const score = 10;
        let aux = 0;
        aux = score + timer * 2;
        return dispatch(setScore(aux));
      }
      if (difficulty === 'hard') {
        const score = 10;
        let aux = 0;
        aux = score + timer * tres;
        return dispatch(setScore(aux));
      }
    }
  }

  saveRanking = () => {
    let ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    const { name, score, email } = this.props;
    const hash = md5(email).toString();
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const playerRanking = {
      name,
      score,
      picture,
    };
    ranking = [...ranking, playerRanking];
    // Salva o obj alterado
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { results, index, timer, answers, correctAnswer,
      wrongAnswers, answerSelected } = this.state;
    return (
      <>
        <Header />
        <section>
          {
            results.length > 0
              && (
                <div>
                  <div>
                    <h3 data-testid="question-category">{ results[index].category }</h3>
                    <article>
                      <p data-testid="question-text">
                        { results[index].question }
                      </p>
                    </article>
                  </div>
                  <div data-testid="answer-options">
                    {answers.map((ask) => (
                      <button
                        key={ ask }
                        type="button"
                        disabled={ timer === 0 }
                        className={
                          ask === correctAnswer
                            ? 'correct-answer'
                            : 'wrong-answer'
                        }
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
          <div>
            <p>{timer}</p>
            {answerSelected && (
              <button
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
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
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
  name: state.player.name,
  score: state.player.score,
  email: state.player.email,
});

export default connect(mapStateToProps)(Game);
