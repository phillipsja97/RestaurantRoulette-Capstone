import axios from 'axios';

const getUserByUserId = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44347/api/users/1')
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

const getUserByFirebaseUID = (uid) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/users/uid/${uid}`)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

const SignUpOrSignIn = (userToAdd) => new Promise((resolve, reject) => {
  axios.post('https://localhost:44347/api/users/newUser', userToAdd)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

export default { getUserByUserId, getUserByFirebaseUID, SignUpOrSignIn };
