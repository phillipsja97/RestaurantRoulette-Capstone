/* eslint-disable no-nested-ternary */
import React from 'react';
import { Button } from 'antd';
import './EndCard.scss';

export default function MyEndCard(props) {
  return (
    <div className="finishSwipeButtonContainer">
      {(props.acceptableRestaurants.length <= 0)
        ? <div className="next20Button">
            <h1>It looks like you didn't like any of these restaurants. Let's get some more options</h1>
            <Button type="ghost" onClick={props.nextTwenty}>Next 20 Restaurants</Button>
          </div>
        : <div className="finishButtonContainer">
            <Button type="primary" className="finishSwipeButton" onClick={props.finishSwipe}>Finish</Button>
          </div>
        }
    </div>
  );
}
