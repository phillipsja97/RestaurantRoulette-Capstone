import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class Home extends React.Component {
  render() {
    const { authed } = this.props;
    return (
      <div className="home">
      { (authed) ? <h1>authed in home</h1> : <h1>not authed in home</h1> }
      <Link to={'/swipe'}><Button>Swipe</Button></Link>;
      </div>
    );
  }
}

export default Home;
