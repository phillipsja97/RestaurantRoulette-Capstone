import React, { useEffect, useState } from 'react';
import UserButton from '../UserButton/UserButton';
import UserFriendsData from '../../../Helpers/Data/userFriendsData';
import authData from '../../../Helpers/Data/authData';
import './AddFriendsParam.scss';

export default function AddFriendsParam(props) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    UserFriendsData.getMyFriends(authData.getUid())
      .then((result) => {
        setFriends(result);
      })
      .catch((errorFromAddFriends) => console.error(errorFromAddFriends));
  }, [friends]);

  const AddFriends = (value) => {
    props.onChange(value);
  };

  return (
    <div className="addFriendsParam">
      <div className="addFriendsParamTitle">
        <h1>Add Friends</h1>
      </div>
      <div className="userButtonContainer">
        {friends.map((user) => <UserButton key={user.userId} user={user} AddFriends={AddFriends} />)}
      </div>
    </div>
  );
}
