import axios from 'axios';

const addUsersToSession = (usersToAdd) => axios.post('https://localhost:44347/api/userSessions/usersToAdd', usersToAdd);

const updateSwipeStatus = (updatedStatus) => axios.put('https://localhost:44347/api/userSessions/updateSwipeStatus', updatedStatus);

const getAllUsersSwipeStatusOnSessionId = (sessionId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/userSessions/getAllUsersSwipeStatus/${sessionId}`)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

const ResetSwipeStatusForAllUsers = (sessionId) => axios.put(`https://localhost:44347/api/userSessions/updateAllUsersSwipeStatus/${sessionId}`);

export default {
  addUsersToSession,
  updateSwipeStatus,
  getAllUsersSwipeStatusOnSessionId,
  ResetSwipeStatusForAllUsers,
};
