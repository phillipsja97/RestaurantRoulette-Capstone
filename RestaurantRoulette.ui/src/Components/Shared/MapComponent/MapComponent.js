import React from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Overlay from 'pigeon-overlay';

export default function MapComponent(props) {
  return (
      <Map center={[props.latitude, props.longitude]} zoom={12} width={600} height={400}>
          <Marker anchor={[props.latitude, props.longitude]} payload={1} onClick={({ event, anchor, payload }) => {}} />

          <Overlay anchor={[props.latitude, props.longitude]} offset={[120, 79]}>
            <img src='pigeon.jpg' width={240} height={158} alt='' />
          </Overlay>
      </Map>
  );
}
