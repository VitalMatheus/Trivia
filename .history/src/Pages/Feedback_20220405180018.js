import React from 'react';

class Feedback extends React.Component {
  render() {
    const { name } = this.state;
    return (
      <>
        <header>
          <div data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
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
        </section>
      </>
    );
  }
}

export default Feedback;
