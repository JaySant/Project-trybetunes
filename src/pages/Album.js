import React from 'react';
import Headers from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <>
        <Headers />
        <div data-testid="page-album" />
      </>
    );
  }
}

export default Album;
