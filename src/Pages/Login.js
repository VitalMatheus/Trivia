import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../Redux/Actions';

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

  handleClick = () => {
    const { findToken, history } = this.props;
    findToken();
    history.push('/game');
  };

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
          onClick={ this.handleClick }
        >
          Play
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  findToken: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  findToken: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(Login);
