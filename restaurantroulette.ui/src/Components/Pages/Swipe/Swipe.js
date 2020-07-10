import React from 'react';

export default function Swipe(props) {
  return (
    <div className="Swipe">
      { (props.authed) ? <h1>authed in swipe</h1> : <h1>not authed in swipe</h1> }
    </div>
  );
}
