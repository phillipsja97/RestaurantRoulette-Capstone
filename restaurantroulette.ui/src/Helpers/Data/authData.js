/* eslint-disable arrow-body-style */
import firebase from 'firebase/app';
import axios from 'axios';
import 'firebase/auth';

const getUid = () => firebase.auth().currentUser.uid;

export default {
  getUid,
};
