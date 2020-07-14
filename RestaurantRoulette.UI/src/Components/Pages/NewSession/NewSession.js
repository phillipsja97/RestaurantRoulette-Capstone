import React from 'react';
import { Steps, Button, message } from 'antd';
import QueryParams from '../../Shared/QueryParams/QueryParams';
import LocationParam from '../../Shared/LocationParam/LocationParam';
import AddFriendsParam from '../../Shared/AddFriendsParam/AddFriendsParam';
import './NewSession.scss';

const { Step } = Steps;

const steps = [
  {
    content: <LocationParam />,
  },
  {
    content: <QueryParams />,
  },
  {
    content: <AddFriendsParam />,
  },
];

export default class NewSession extends React.Component {
    state = {
      current: 0,
    };

    next() {
      const current = this.state.current + 1;
      this.setState({ current });
    }

    prev() {
      const current = this.state.current - 1;
      this.setState({ current });
    }

    render() {
      const { current } = this.state;
      return (
      <div className="newSession">
        <div className="newSessionTitle">
          <h1>Let's get started!</h1>
        </div>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
      );
    }
}
