import React from 'react';
import { Button } from 'antd';
import './EndCard.scss';

export default function MyEndCard(props) {
  return (
    <div className="finishSwipeButtonContainer">
       <Button type="primary" className="finishSwipeButton" onClick={props.finishSwipe}>Finish</Button>
    </div>
  );
}
