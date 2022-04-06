import React from 'react';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <p data-testid="ranking-title">Ranking</p>
        <button type="button" data-testid="btn-go-home">Home</button>
      </>
    );
  }
}

export default Ranking;
