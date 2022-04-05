import React from 'react';

const MIN_VALUE_INPUT = 1;
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <section>
        <input
          name="name"
          data-testid="input-player-name"
          type="text"
          id="inputName"
          placeholder="Digite seu nome"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          placeholder="Digite seu email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ name.length < MIN_VALUE_INPUT || email.length < MIN_VALUE_INPUT }
        >
          Play
        </button>
      </section>
    );
  }
}

export default Login;
