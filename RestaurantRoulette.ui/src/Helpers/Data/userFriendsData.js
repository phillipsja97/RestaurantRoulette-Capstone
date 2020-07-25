import axios from 'axios';

const getMyFriends = (uid) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44347/api/userFriends/getFriends/${uid}`)
    .then((result) => resolve(result.data))
    .catch((errorFromUserData) => reject(errorFromUserData));
});

const AddFriend = (userId1, userId2) => axios.post(`https://localhost:44347/api/userFriends/addFriend/${userId1}/${userId2}`);

export default { getMyFriends, AddFriend };
