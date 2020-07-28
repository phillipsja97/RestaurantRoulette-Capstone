/* eslint-disable no-new-object */
import React from 'react';
import { Select } from 'antd';
import UserFriendsData from '../../../Helpers/Data/userFriendsData';
import authData from '../../../Helpers/Data/authData';
import './AddFriendsParam.scss';

const { Option } = Select;

export default class AddFriendsParams extends React.Component {
  state = {
    friends: [],
  }

  // handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // }

  handleChange = (value) => {
    const { onChange } = this.props;
    onChange(value);
  };

  componentDidMount() {
    UserFriendsData.getMyFriends(authData.getUid())
      .then((result) => {
        this.setState({ friends: result });
      })
      .catch((errorFromAddFriends) => console.error(errorFromAddFriends));
  }

  render() {
    return (
      <div className="selectFriendsBar">
        <div className="selectTitle">
          <h1>Select Friends To Add</h1>
        </div>
        <div className="selectBar">
          <Select mode="tags" size="large" style={{ width: '50%' }} placeholder="Select Friends To Add" onChange={this.handleChange}>
            {this.state.friends.map((friend) => <Option key={friend.userId}>{friend.fullName}</Option>)}
          </Select>
        </div>
        </div>
    );
  }
}
