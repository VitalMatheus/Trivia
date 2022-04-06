import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      index: 0,
    };
  }

  componentDidUpdate(prevProp) {
    const { loading } = this.props;
    if (!loading && prevProp.loading !== loading) {
      this.fetchApi();
    }
  }

  fetchApi = async () => {
    const { token } = this.props;

    const responseAsk = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const ask = await responseAsk.json();
    this.setState({
      results: ask.results,
    });
  }

  randomBtns = (asks) => {
    const quest = asks.incorrect_answers;
    const questes = [...quest, asks.correct_answer];
    const RANDOM = 0.5;
    const sorted = questes.sort(() => Math.random() - RANDOM);
    return (
      sorted.map((ask) => (
        <button
          key={ ask }
          type="button"
          data-testid={
            ask === asks.correct_answer
              ? 'correct-answer'
              : `wrong-answer-${quest.indexOf(ask)}`
          }
        >
          { ask }
        </button>
      ))
    );
  }

  incrementIndexResults = () => {
    const MAX_LENGTH_RESULTS = 4;
    const { history } = this.props;
    const { index } = this.state;
    this.setState({
      index: index < MAX_LENGTH_RESULTS ? index + 1 : MAX_LENGTH_RESULTS,
    });
    if (index === MAX_LENGTH_RESULTS) {
      history.push('/feedback');
    }
  }

  render() {
    const { results, index } = this.state;
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
                    {
                      this.randomBtns(results[index])
                    }
                  </div>
                </div>
              )
          }
          <div>
            <button
              type="button"
              onClick={ this.incrementIndexResults }
              data-testid="btn-next"
            >
              Próximo
            </button>
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
};

const mapStateToProps = (state) => ({
  token: state.token,
  loading: state.isLoading,
});

export default connect(mapStateToProps)(Game);
