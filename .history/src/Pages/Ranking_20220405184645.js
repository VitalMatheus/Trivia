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
