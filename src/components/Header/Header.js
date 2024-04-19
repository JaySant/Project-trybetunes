import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../pages/Loading';
import { getUser } from '../../services/userAPI';

class Headers extends React.Component {
  state = {
    name: '',
    loading: false,
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    this.setState({ loading: true });
    const Data = await getUser();
    this.setState({ name: Data.name, loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">perfil</Link>
        { !loading ? <h1 data-testid="header-user-name">{ name }</h1> : <Loading /> }
      </header>
    );
  }
}

export default Headers;
