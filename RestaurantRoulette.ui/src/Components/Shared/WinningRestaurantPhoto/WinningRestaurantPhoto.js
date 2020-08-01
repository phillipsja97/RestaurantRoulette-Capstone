import React from 'react';
import Carousel from '@bit/react-bootstrap.react-bootstrap.carousel';
import './WinningRestaurantPhoto.scss';

export default function WinningRestaurantPhoto(props) {
  return (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={props.photo}
            alt="food"
          />
          <Carousel.Caption>
            <h3>User Photos</h3>
          </Carousel.Caption>
        </Carousel.Item>
  );
}
