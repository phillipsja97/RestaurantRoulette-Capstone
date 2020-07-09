import axios from 'axios';

const getUserByUserId = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44347/api/users/1')
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getUserByUserId };
