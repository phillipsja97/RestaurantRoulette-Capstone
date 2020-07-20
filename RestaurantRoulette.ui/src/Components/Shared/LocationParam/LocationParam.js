/* eslint-disable prefer-template */
import React, { useState, useEffect } from 'react';
import { Input, Button, Divider } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';
import MapComponent from '../MapComponent/MapComponent';
import './LocationParam.scss';

export default function LocationParam(props) {
  const [value, setValue] = useState('');
  const [coordinates, setCoordinates] = useState();

  const onChange = (e) => {
    props.onChange(e.target.value);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
      const latitudeCoord = parseFloat(`${position.coords.latitude}`);
      const longitudeCoord = parseFloat(`${position.coords.longitude}`);
      props.setLatitude(latitudeCoord);
      props.setLongitude(longitudeCoord);
      props.setMapping(true);
    });
  };

  return (
    (!props.mapping) ? <div className="locationParam">
              <div className="locationParamTitle">
                <h1>Where are you?</h1>
              </div>
              <div className="locationFieldContainer">
                <Input
                size="large"
                placeholder="Location"
                className="locationField"
                prefix={<EnvironmentFilled />}
                onChange={onChange}
                />
              </div>
                <div className="dividerLocationContainer">
                  <div className="dividerLocation">
                    <Divider>Or</Divider>
                  </div>
                </div>
              <div className="locationFieldContainer">
              <Button type="ghost" icon={<EnvironmentFilled />} size='lg' onClick={getCurrentLocation}>
                  Get My Current Location
              </Button>
              </div>
            </div>
      : <div className="mappingComponent">
          <MapComponent latitude={props.latitude} longitude={props.longitude} />
        </div>
  );
}
