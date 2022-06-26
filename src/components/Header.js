import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
        { !loading ? <h1 data-testid="header-user-name">{ name }</h1> : <Loading /> }
      </header>
    );
  }
}

export default Headers;
