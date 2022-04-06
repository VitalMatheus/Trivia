import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../Styles/Header.css';

class Header extends React.Component {
  render() {
    const { getName, getEmail, getScore, loading } = this.props;
    const imageGravatar = !loading && md5(getEmail).toString();
    return (
      <div className="header-sect">
        <img
          src={ `https://www.gravatar.com/avatar/${imageGravatar}` }
          alt="nome da pessoa"
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">{ getName }</h4>
        <h4 className="header-score" data-testid="header-score">{ getScore }</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getName: state.player.name,
  getEmail: state.player.gravatarEmail,
  getScore: state.player.score,
  loading: state.isLoading,
});

Header.propTypes = {
  getName: PropTypes.string,
  getEmail: PropTypes.string,
  getScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
