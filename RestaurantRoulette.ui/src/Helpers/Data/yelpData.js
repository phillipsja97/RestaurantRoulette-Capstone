/* eslint-disable no-useless-concat */
import axios from 'axios';

const getRestaurantsByParams = (City, params) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/yelp/allrestaurants/${City}`, {
    params: {
      categories: params,
    },
  })
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getRestaurantsByCoordinatesAndParams = (coordinates, params) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/yelp/allRestaurantsByCoords/${coordinates}`, {
    params: {
      categories: params,
    },
  })
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getWinningRestaurant = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/yelp/getWinner/${sessionId}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getNext20RestaurantsByParams = (City, params, offsetNumber) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/yelp/allrestaurants/next20/${City}`, {
    params: {
      categories: params,
      offset: offsetNumber,
    },
  })
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getNext20RestaurantsByCoordinatesAndParams = (coordinates, params, offsetNumber) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/yelp/allRestaurants/next20byCoords/${coordinates}`, {
    params: {
      categories: params,
      offset: offsetNumber,
    },
  })
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

const getWinningRestaurantDetails = (winningId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/yelp/winningRestaurantId/${winningId}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default {
  getRestaurantsByParams,
  getWinningRestaurant,
  getRestaurantsByCoordinatesAndParams,
  getNext20RestaurantsByParams,
  getNext20RestaurantsByCoordinatesAndParams,
  getWinningRestaurantDetails,
};
