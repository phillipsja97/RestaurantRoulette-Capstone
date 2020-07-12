import axios from 'axios';

const getSessionsByUID = (uid) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/sessions/${uid}`)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

export default { getSessionsByUID };
