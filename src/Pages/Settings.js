import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setGameSettings } from '../Redux/Actions';
import { fetchCategories } from '../Services/fetchApi';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      type: '',
      difficulty: '',
      category: 0,
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await fetchCategories();
    this.setState({ categories });
  }

  sendSettings = () => {
    const { dispatch, history } = this.props;
    const { type, category, difficulty } = this.state;
    dispatch(setGameSettings({ type, category, difficulty }));
    history.push('/');
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { type, difficulty, category, categories } = this.state;
    return (
      <section>
        <h1 data-testid="settings-title">Settings</h1>
        <select name="category" value={ category } onChange={ this.handleChange }>
          {categories.map(({ id, name }) => (
            <option value={ id } key={ id }>{ name }</option>
          ))}
        </select>
        <select name="type" value={ type } onChange={ this.handleChange }>
          <option value="">Select a type</option>
          <option value="multiple">Multiple choice</option>
          <option value="boolean">True or false</option>
        </select>
        <select name="difficulty" value={ difficulty } onChange={ this.handleChange }>
          <option value="">Select a difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          type="button"
          onClick={ this.sendSettings }
        >
          Save settings
        </button>
      </section>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Settings);
