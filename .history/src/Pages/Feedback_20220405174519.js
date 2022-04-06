import React from 'react';

class Feedback extends React.Component {
  render() {
    const { name } = this.state;
    return (
      <>
        <header>
          <div data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ name }</p>
          <span data-testid="header-score"> score </span>
        </header>
        <section>
          <p data-testid="feedback-text">mensagem</p>
        </section>
      </>
    );
  }
}

export default Feedback;
