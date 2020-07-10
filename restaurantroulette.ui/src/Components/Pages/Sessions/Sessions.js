import React from 'react';

class Sessions extends React.Component {
  render() {
    const { authed } = this.props;
    return (
      (authed) ? <h1>authed</h1> : <h1>not authed</h1>
    );
  }
}

export default Sessions;
