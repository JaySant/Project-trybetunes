import React from 'react';
import { Link } from 'react-router-dom';
import Headers from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    isDisabled: true,
    nameArtist: '',
    artists: [],
    loading: false,
    name: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateButtonDisabled);
  }

  validateButtonDisabled = () => {
    const { nameArtist } = this.state;
    const lenghtName = 2;
    this.setState({ isDisabled: nameArtist.length < lenghtName });
  }

  searchAlbum = (nameSearch) => {
    this.setState({
      loading: true,
      nameArtist: nameSearch,
      name: nameSearch,
    }, async () => {
      const artists = await searchAlbumsAPI(nameSearch);
      this.setState({ nameArtist: '', loading: false, artists });
    });
  }

  render() {
    const { isDisabled, nameArtist, artists, loading, name } = this.state;
    const { nome } = this.props;
    return (
      <>
        <Headers />
        {loading ? <Loading /> : (
          <div data-testid="page-search">
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
                onClick={ () => { this.searchAlbum(nameArtist); } }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        <h1>
          Resultado de álbuns de:
          {' '}
          {name}
        </h1>
        {!artists.length && <h2>Nenhum álbum foi encontrado</h2>}
        {artists.map((artist) => (
          <Link
            data-testid={ `link-to-album-${artist.collectionId}` }
            to={ `/album/${artist.collectionId}` }
            key={ artist.collectionId }
          >
            <p>{artist.collectionName}</p>
            <img src={ artist.artworkUrl100 } alt="capa-do-album" />
            <p>{artist.artistName}</p>
          </Link>
        ))}
      </>
    );
  }
}

export default Search;
