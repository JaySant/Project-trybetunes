import React from 'react';
import Headers from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Headers />
        <div data-testid="page-profile" />
      </>
    );
  }
}

export default Profile;
