import React from 'react';
import {
  Drawer,
  Button,
  Card,
  Input,
} from 'antd';
import { PhoneOutlined, ContactsOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import userData from '../../../Helpers/Data/userData';
import authData from '../../../Helpers/Data/authData';
import 'antd/dist/antd.css';
import './Drawer.scss';

export default class DrawerOption extends React.Component {
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
      setTimeout(this.getUserByUID, 4000);
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
    const { onClose, visible, goToAddFriends } = this.props;
    const { user } = this.state;
    const photo = firebase.auth().currentUser.photoURL;
    const blankPhoto = 'https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg';
    return (
      <>
        <Drawer
          title="Profile"
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
            {(this.state.editMode)
              ? <React.Fragment>
                  <Button onClick={this.submitProfileUpdate} style={{ marginRight: 8 }} type="ghost">
                    Submit
                  </Button>
                  <Button onClick={onClose} style={{ marginRight: 8 }} type="ghost">
                    Cancel
                  </Button>
                </React.Fragment>
              : <Button onClick={onClose} style={{ marginRight: 8 }} type="ghost">
                  Cancel
                </Button>}
            </div>
          }
        >
        <div className="profileCard">
          <div className="profileCardContainer">
            <div className="avatarImage">
              {(photo === null)
                ? <img alt="example" src={blankPhoto} className="profilePhoto"/>
                : <img alt="example" src={photo} className="profilePhoto"/>
              }
            </div>
            <div className="descriptionCard">
              <Card title={user.fullName} style={{ width: 300, height: 250 }}>
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
            <div className="addFriendsContainer">
              <div className="addFriendsButton">
                <Link to={`${this.state.user.id}/addFriends`}>
                  <Button type="ghost" block onClick={goToAddFriends}>
                    Manage Friends
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </Drawer>
      </>
    );
  }
}
