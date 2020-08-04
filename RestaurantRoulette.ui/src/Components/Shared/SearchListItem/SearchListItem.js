import React, { useState } from 'react';
import { List, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import userFriendsData from '../../../Helpers/Data/userFriendsData';

export default function ListItem(props) {
  const [addedFriend, setAddedFriend] = useState({});

  const AddANewFriend = () => {
    const userId1 = props.userId;
    const userId2 = props.item.id;
    userFriendsData.AddFriend(userId1, userId2)
      .then((result) => {
        setAddedFriend(result);
      })
      .catch((errorFromAddFriend) => console.error(errorFromAddFriend));
  };

  return (
  <List.Item actions={[<Button type="ghost" id={props.item.id} onClick={AddANewFriend}>Follow</Button>]}>
    <List.Item.Meta
      avatar={<Avatar icon={<UserOutlined />} />}
      title={props.item.fullName}
      description={props.item.email}
    />
  </List.Item>
  );
}
