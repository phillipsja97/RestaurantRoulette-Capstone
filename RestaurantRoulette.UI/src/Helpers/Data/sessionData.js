import axios from 'axios';

const getSessionsByUID = (uid) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/sessions/${uid}`)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

const getSessionsThatNeedSwipedByUID = (uid) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/sessions/needsSwipedSessions/${uid}`)
    .then((result) => resolve(result.data))
    .catch((errorFromGetSessions) => reject(errorFromGetSessions));
});

const getAllUsersOnASession = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/sessions/users/${sessionId}`)
    .then((result) => resolve(result.data))
    .catch((errorFromGetSessions) => reject(errorFromGetSessions));
});

export default { getSessionsByUID, getSessionsThatNeedSwipedByUID, getAllUsersOnASession };
