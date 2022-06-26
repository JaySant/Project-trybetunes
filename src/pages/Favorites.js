import React from 'react';
import Headers from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Headers />
        <div data-testid="page-favorites" />
      </>
    );
  }
}

export default Favorites;
