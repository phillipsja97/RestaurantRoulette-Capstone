import axios from 'axios';

const addUsersToSession = (usersToAdd) => axios.post('https://localhost:44347/api/userSessions/usersToAdd', usersToAdd);

export default { addUsersToSession };
