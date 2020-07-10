import React from 'react';

// class Swipe extends React.Component {
//   render() {
//     const { authed } = this.props;
//     return (
//       (authed) ? <h1>authed in swipe</h1> : <h1>not authed in swipe</h1>
//     );
//   }
// }

// export default Swipe;

export default function Swipe(props) {
  return (
    <div className="Swipe">
      { (props.authed) ? <h1>authed in swipe</h1> : <h1>not authed in swipe</h1> }
    </div>
  );
}
