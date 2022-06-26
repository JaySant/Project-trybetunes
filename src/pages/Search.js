import React from 'react';
import Headers from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <>
        <Headers />
        <div data-testid="page-search" />
      </>
    );
  }
}

export default Search;
