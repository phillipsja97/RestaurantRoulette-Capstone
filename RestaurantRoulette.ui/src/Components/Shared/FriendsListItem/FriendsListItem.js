import React, { useState, useEffect } from 'react';
import { List, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import userFriendsData from '../../../Helpers/Data/userFriendsData';

export default function ListItem(props) {
  return (
  <List.Item>
    <List.Item.Meta
      avatar={<Avatar icon={<UserOutlined />} />}
      title={props.item.fullName}
      description={props.item.email}
    />
  </List.Item>
  );
}
