import axios from 'axios';

const getUserByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/users/${userId}`)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

const getUserByFirebaseUID = (uid) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/users/uid/${uid}`)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

const FindUsersByParameter = (input) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/users/searchUsers/${input}`)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

const SignUpOrSignIn = (userToAdd) => new Promise((resolve, reject) => {
  axios.post('https://localhost:44347/api/users/newUser', userToAdd)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

const SignUpThroughGoogleAuth = (userToAdd) => axios.post('https://localhost:44347/api/users/googleAuth/newOrReturningUser', userToAdd);

const UpdateProfile = (userId, updatedUser) => axios.put(`https://localhost:44347/api/users/updateProfile/${userId}`, updatedUser);

export default {
  getUserByUserId,
  getUserByFirebaseUID,
  SignUpOrSignIn,
  SignUpThroughGoogleAuth,
  UpdateProfile,
  FindUsersByParameter,
};
