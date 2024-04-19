import React from 'react';
import Headers from '../components/Header/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMusics: [],
    };
  }

  async componentDidMount() {
    this.setState({ favoriteMusics: await getFavoriteSongs() });
  }

  handleUpdate = async () => {
    this.setState({ favoriteMusics: await getFavoriteSongs() });
  }

  render() {
    const { favoriteMusics } = this.state;
    return (
      <>
        <Headers />
        <div data-testid="page-favorites">
          {favoriteMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              { ...music }
              handleUpdate={ this.handleUpdate }
            />
          ))}
        </div>
      </>
    );
  }
}

export default Favorites;
