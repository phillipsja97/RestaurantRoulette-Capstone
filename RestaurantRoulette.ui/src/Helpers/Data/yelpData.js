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

export default { getRestaurantsByParams };
