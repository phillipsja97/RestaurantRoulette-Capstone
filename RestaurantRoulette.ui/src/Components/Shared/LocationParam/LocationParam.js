import React, { useState } from 'react';
import { Input } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';
import './LocationParam.scss';

export default function LocationParam(props) {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="locationParam">
      <div className="locationParamTitle">
        <h1>Where are you?</h1>
      </div>
      <div className="locationFieldContainer">
        <Input
        size="large"
        placeholder="Location"
        className="locationField"
        prefix={<EnvironmentFilled />}
        // value={(newValue) => setValue(newValue)}
        onChange={onChange}
        />
      </div>
    </div>
  );
}
