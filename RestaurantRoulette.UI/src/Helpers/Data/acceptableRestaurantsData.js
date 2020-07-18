import axios from 'axios';

const addRestaurantsToAcceptableList = (restaurantsToAdd) => axios.post('https://localhost:44347/api/acceptableRestaurants/restaurantsToAdd', restaurantsToAdd);

export default { addRestaurantsToAcceptableList };
