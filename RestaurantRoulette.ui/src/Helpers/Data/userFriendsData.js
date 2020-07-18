import axios from 'axios';

const getMyFriends = (uid) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/userFriends/getFriends/${uid}`)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

export default { getMyFriends };
