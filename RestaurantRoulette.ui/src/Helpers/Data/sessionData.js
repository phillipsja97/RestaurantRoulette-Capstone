import axios from 'axios';

const getSessionsByUID = (uid) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/sessions/${uid}`)
    .then((result) => resolve(result.data))
    .catch((errorFromGetSessions) => reject(errorFromGetSessions));
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

const getASession = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/sessions/singleSession/${sessionId}`)
    .then((result) => resolve(result.data))
    .catch((errorFromGetSessions) => reject(errorFromGetSessions));
});

const createNewSession = (sessionToCreate) => axios.post('https://localhost:44347/api/sessions/createSession/newSession', sessionToCreate);

export default {
  getSessionsByUID,
  getSessionsThatNeedSwipedByUID,
  getAllUsersOnASession,
  getASession,
  createNewSession,
};
