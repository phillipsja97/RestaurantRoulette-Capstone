import React from 'react';
import {
  Button,
  Card,
  Input,
} from 'antd';
import { PhoneOutlined, ContactsOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import 'firebase/auth';
import userData from '../../../Helpers/Data/userData';
import authData from '../../../Helpers/Data/authData';
import 'antd/dist/antd.css';
import './MobileProfile.scss';

export default class MobileProfile extends React.Component {
  state = {
    user: {},
    editMode: false,
    editEmail: '',
    editPhoneNumber: '',
  }

  getUserByUID = () => {
    const { authed } = this.props;
    if (authed) {
      userData.getUserByFirebaseUID(authData.getUid())
        .then((response) => {
          this.setState({ user: response });
        })
        .catch((errorFromDrawerUser) => console.error(errorFromDrawerUser));
    }
  }

  setEditMode = (e) => {
    e.preventDefault();
    this.setState({ editMode: true });
  }

  cancelEditMode = (e) => {
    e.preventDefault();
    this.setState({ editMode: false });
  }

  emailChange = (e) => {
    e.preventDefault();
    this.setState({ editEmail: e.target.value });
  }

  phoneNumberChange = (e) => {
    e.preventDefault();
    this.setState({ editPhoneNumber: e.target.value });
  }

  componentDidMount() {
    const { authed } = this.props;
    if (authed) {
      this.getUserByUID();
    }
  }

  submitProfileUpdate = () => {
    const updatedProfile = {
      FullName: this.state.user.fullName,
      Email: this.state.editEmail,
      PhoneNumber: this.state.editPhoneNumber,
      FirebaseUID: authData.getUid(),
    };
    userData.UpdateProfile(this.state.user.id, updatedProfile)
      .then((result) => {
        this.setState({ user: result.data });
      })
      .then(() => {
        this.setState({ editMode: false });
      })
      .catch((errorFromDrawerComponent) => console.error(errorFromDrawerComponent));
  }

  render() {
    const { goToAddFriends } = this.props;
    const { user } = this.state;
    const photo = firebase.auth().currentUser.photoURL;
    const blankPhoto = 'https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg';
    return (
      <div className="profileCard">
      <div className="profileMobileCardContainer">
        <div className="avatarMobileImage">
          {(photo === null)
            ? <img alt="example" src={blankPhoto} className="profileMobilePhoto"/>
            : <img alt="example" src={photo} className="profileMobilePhoto"/>
          }
        </div>
        <div className="descriptionCard">
          <Card title={user.fullName}>
            {(this.state.editMode)
              ? <React.Fragment>
                <h4>Email</h4>
                  <Input placeholder="default size" prefix={<ContactsOutlined />} value={this.state.editEmail} onChange={this.emailChange} />
                <h4>Phone Number</h4>
                  <Input placeholder="default size" prefix={<PhoneOutlined />} value={this.state.editPhoneNumber} onChange={this.phoneNumberChange} />
                </React.Fragment>
              : <React.Fragment>
                  <h4>Email:</h4><p>{user.email}</p>
                  <h4>Phone Number:</h4><p>{user.phoneNumber}</p>
                </React.Fragment>}
          </Card>
        </div>
      </div>
      <div className="buttonContainer">
        <div className="editProfilebutton">
        {(this.state.editMode)
          ? <React.Fragment className="editingButtons">
              <Button className="editingButtons" type="ghost" block onClick={this.cancelEditMode}>
                Cancel
              </Button>
              <Button type="ghost" block onClick={this.submitProfileUpdate}>
                Submit Changes
              </Button>
            </React.Fragment>
          : <Button type="ghost" block onClick={this.setEditMode}>
              Edit Profile
            </Button>}
        </div>
      </div>
    </div>
    );
  }
}
