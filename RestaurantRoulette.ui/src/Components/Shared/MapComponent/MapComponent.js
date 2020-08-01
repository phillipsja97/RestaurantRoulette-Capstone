import React from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Overlay from 'pigeon-overlay';
import Key from '../../../Helpers/MapTilerAPIKey';

export default function MapComponent(props) {
  const mapTilerProvider = (x, y, z, dpr) => `https://api.maptiler.com/tiles/satellite/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.jpg?key=${Key}`;

  return (
      <Map center={[props.latitude, props.longitude]} zoom={12} width={600} height={400} provider={mapTilerProvider} dprs={[1, 2]}>
          <Marker anchor={[props.latitude, props.longitude]} payload={1} onClick={({ event, anchor, payload }) => {}} />

          <Overlay anchor={[props.latitude, props.longitude]} offset={[120, 79]}>
            <img src='pigeon.jpg' width={240} height={158} alt='' />
          </Overlay>
      </Map>
  );
}
