import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      name: '',
      loading: false,
      buttonClicked: false,
    };
  }

  renderLoading = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ buttonClicked: true });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateButtonDisabled);
  }

  validateButtonDisabled = () => {
    const { name } = this.state;
    const lenghtName = 3;
    if (name.length >= lenghtName) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled, name, loading, buttonClicked } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            value={ name }
            name="name"
            type="text"
            placeholder="Nome"
            onChange={ this.handleChange }

          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isDisabled }
            buttonClicked={ buttonClicked }
            onClick={ this.renderLoading }
          >
            Entrar
          </button>
        </form>
        {buttonClicked && <Redirect to="/search" />}
        {loading && <Loading />}
      </div>
    );
  }
}

Login.protoTypes = {
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Login;
