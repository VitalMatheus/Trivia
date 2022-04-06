import PropTypes from 'prop-types';
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { connect } from 'react-redux';
import { FiSettings } from 'react-icons/fi';
import { fetchToken, getUserInfos } from '../Redux/Actions';
import '../Styles/Login.css';

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
    const { email, name } = this.state;
    const { findToken, history, getUserInfo } = this.props;

    findToken();
    history.push('/game');
    getUserInfo(email, name);
  };

  render() {
    const { history } = this.props;
    const { name, email } = this.state;
    return (
      <section className="login-sect">
        <h1>
          Wanna play
          {' '}
          <em>
            Trivia?
          </em>
        </h1>
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
        </section>
        <section className="login-btn-sect">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ name.length < MIN_VALUE_INPUT || email.length < MIN_VALUE_INPUT }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            <FiSettings className="settings-icon" />
          </button>
        </section>
      </section>
    );
  }
}

Login.propTypes = {
  findToken: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  getUserInfo: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  findToken: () => dispatch(fetchToken()),
  getUserInfo: (email, name) => dispatch(getUserInfos(email, name)),
});

export default connect(null, mapDispatchToProps)(Login);
