/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { Input, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SearchListItem from '../../Shared/SearchListItem/SearchListItem';
import FriendsListItem from '../../Shared/FriendsListItem/FriendsListItem';
import userFriendsData from '../../../Helpers/Data/userFriendsData';
import userData from '../../../Helpers/Data/userData';
import authData from '../../../Helpers/Data/authData';
import './AddFriends.scss';

export default function AddFriends(props) {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState('');
  const [friends, setFriends] = useState([]);
  // const [addedFriend, setAddedFriend] = useState({});

  const onChange = (e) => {
    setInput(e.target.value);
    if (e.target.value !== '') {
      userData.FindUsersByParameter(e.target.value)
        .then((result) => {
          setUsers(result);
        })
        .catch((error) => {
          if (error) {
            setUsers([]);
          }
          console.error(error.response.data);
        });
    } else {
      setUsers(e.target.value);
    }
  };

  useEffect(() => {
    userFriendsData.getMyFriends(authData.getUid())
      .then((result) => {
        setFriends(result);
      })
      .catch((errorFromGetFriends) => console.error(errorFromGetFriends));
  }, [friends]);

  const onKeyDown = (e) => {
    if (e.keyCode === 8) {
      onChange(e);
    }
  };

  return (
    <React.Fragment>
      <div className="searchContainer">
        <div className="searchFriendsTitle">
          <h1>Search For New Users</h1>
        </div>
          <div className="searchInputContainer">
            <Input
            className="searchFriends"
            size="large"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={input}
            placeholder="Search by name or number"
            prefix={<UserOutlined />}
            />
          </div>
          <div className="usersListContainer">
          <List
            itemLayout="horizontal"
            className="usersList"
            dataSource={users}
            renderItem={(item) => (
              <SearchListItem key={item.id} item={item} userId={props.match.params.userId} />
            )}
          />
        </div>
            <div className="usersIFollowTitle">
              <h1>Users I Follow:</h1>
            </div>
          <div className="usersListContainer">
            <List
                itemLayout="horizontal"
                className="usersList"
                dataSource={friends}
                renderItem={(item) => (
                  <FriendsListItem key={item.id} item={item} userId={props.match.params.userId} />
                )}
            />
          </div>
      </div>
    </React.Fragment>
  );
}
