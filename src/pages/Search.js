import React from 'react';
import Headers from '../components/Header';

class Search extends React.Component {
  state = {
    isDisabled: true,
    nameArtist: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateButtonDisabled);
  }

  validateButtonDisabled = () => {
    const { nameArtist } = this.state;
    const lenghtName = 2;
    if (nameArtist.length >= lenghtName) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled, nameArtist } = this.state;
    return (
      <>
        <Headers />
        <div data-testid="page-search" />
        <form>
          <input
            data-testid="search-artist-input"
            value={ nameArtist }
            name="nameArtist"
            type="text"
            placeholder="Nome do Artista"
            onChange={ this.handleChange }

          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

export default Search;
