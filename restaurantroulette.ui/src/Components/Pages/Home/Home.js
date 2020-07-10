/* eslint-disable arrow-body-style */
import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button } from 'antd';
import { Context } from '../../../Helpers/Store/Store';
import 'antd/dist/antd.css';

export default function Home(props) {
  return (
    <div className="Homepage">
    {(props.authed) ? <h1>Authed</h1> : <h1>not authed</h1>}
    </div>
  );
}
