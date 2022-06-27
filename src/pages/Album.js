import React from 'react';
import PropTypes from 'prop-types';
import Headers from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    loading: false,
    musics: [],
  }

  componentDidMount() {
    this.getMusicAlbum();
  }

  getMusicAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await musicsAPI(id);
    this.setState({ musics: music });
  }

  render() {
    const { loading, musics } = this.state;
    return (
      <>
        <Headers />
        {loading ? <Loading /> : (
          <div data-testid="page-album">
            <h1 data-testid="album-name">{musics[0]?.collectionName}</h1>
            <p data-testid="artist-name">{musics[0]?.artistName}</p>
            {musics.map((music, index) => (
              index > 0
              && <MusicCard key={ music.trackId } { ...music } />
            ))}
          </div>
        )}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
