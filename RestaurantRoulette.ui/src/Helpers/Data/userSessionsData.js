import axios from 'axios';

const addUsersToSession = (usersToAdd) => axios.post('https://localhost:44347/api/userSessions/usersToAdd', usersToAdd);

const updateSwipeStatus = (updatedStatus) => axios.put('https://localhost:44347/api/userSessions/updateSwipeStatus', updatedStatus);

export default { addUsersToSession, updateSwipeStatus };
