import React from 'react';
import { Link } from 'react-router-dom';
import Headers from '../components/Header/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    infoProfile: {},
    loading: false,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ loading: true });
    this.setState({ infoProfile: user, loading: false });
  }

  render() {
    const { infoProfile, loading } = this.state;
    console.log(infoProfile.email);
    return (
      <>
        <Headers />
        {loading ? <Loading /> : (
          <div data-testid="page-profile">
            <img
              src={ infoProfile.image }
              data-testid="profile-image"
              alt="profile name"
            />
            <h3>Nome</h3>
            <p>{infoProfile.name}</p>
            <h3>Email</h3>
            <p>{infoProfile.email}</p>
            <h3>Description</h3>
            <p>{infoProfile.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </>
    );
  }
}

export default Profile;
