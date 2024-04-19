import React from 'react';
import PropTypes from 'prop-types';
import { removeSong, addSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteList = await getFavoriteSongs();

    const musicIsFavorite = favoriteList.some((music) => music.trackId === trackId);
    this.setState({ isFavorite: musicIsFavorite });
  }

  handleFavoriteMusic = async (music) => {
    const { isFavorite } = this.state;
    this.setState({ loading: true });
    if (!isFavorite) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ loading: false });
    this.setState({ isFavorite: !isFavorite });
  }

  render() {
    const { trackName, previewUrl, trackId, handleUpdate } = this.props;
    const { isFavorite, loading } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            checked={ isFavorite }
            onChange={ () => {
              this.handleFavoriteMusic(this.props);
              handleUpdate();
            } }
          />
          Favorita
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  handleUpdate: PropTypes.func,
}.isRequired;

MusicCard.defaultProps = {
  handleUpdate: () => {},
};

export default MusicCard;
