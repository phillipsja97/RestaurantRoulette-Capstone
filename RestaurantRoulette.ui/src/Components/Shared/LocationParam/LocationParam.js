/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
import React from 'react';
import Media from 'react-media';
import { Input, Button, Divider } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';
import MapComponent from '../MapComponent/MapComponent';
import './LocationParam.scss';

export default function LocationParam(props) {
  const onChange = (e) => {
    props.onChange(e.target.value);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitudeCoord = parseFloat(`${position.coords.latitude}`);
      const longitudeCoord = parseFloat(`${position.coords.longitude}`);
      props.setLatitude(latitudeCoord);
      props.setLongitude(longitudeCoord);
      props.setMapping(true);
    });
  };

  const desktopRender = () => {
    return (!props.mapping) ? <div className="locationParam">
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
        </div>;
  };

  const mobileRender = () => {
    return (!props.mapping) ? <div className="locationMobileParam">
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
        </div>;
  };

  return (
    <Media queries={{
      small: '(min-width: 320px) and (max-width: 767px)',
      medium: '(min-width: 768px) and (max-width: 1024px)',
      large: '(min-width: 1023px)',
    }}>
      {(matches) => (
        <React.Fragment>
                {matches.small && mobileRender()}
                {matches.medium && desktopRender()}
                {matches.large && desktopRender()}
        </React.Fragment>
      )}
    </Media>
  );
}
