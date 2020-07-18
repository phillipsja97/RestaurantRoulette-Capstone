import React from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function UserButton(props) {

  const onChangeCurrentComponent = (e) => {
    e.preventDefault();
    props.AddFriends(props.user.userId);
  };

  return (
      <Button type="primary" icon={<SearchOutlined />} onClick={onChangeCurrentComponent}>
        {props.user.fullName}
      </Button>
  );
}
