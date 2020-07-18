/* eslint-disable no-useless-concat */
import axios from 'axios';
import Key from '../yelpKey';

const CORS = 'https://cors-anywhere.herokuapp.com/';

const getRestaurantsByParams = (City, params) => new Promise((resolve, reject) => {
  axios.get(`${CORS}` + 'https://api.yelp.com/v3/businesses/search', {
    headers: {
      Authorization: `Bearer ${Key}`,
    },
    params: {
      location: City,
      categories: params,
    },
  })
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getRestaurantsByParams };
