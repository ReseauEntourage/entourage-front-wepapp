/*
 *
 * Markers - represent all animated points on the map
 *
 */

import React, { PropTypes } from 'react';
import { Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";


const css = `
  #markerLayer img {
    animation: pulse 1s infinite alternate;
    -webkit-animation: pulse 1s infinite alternate;
    transform-origin: center;
    -webkit-transform-origin: center;
  }

  keyframes pulse{
  	to {
  		transform: scale(0.7);
  		-webkit-transform: scale(0.7);
      opacity: 0.75;
  	}
  }

  @-webkit-keyframes pulse{
  	to {
  		transform: scale(0.7);
  		-webkit-transform: scale(0.7);
      opacity: 0.75;
  	}
  }
`;

const Markers = ({markers}) => (
  <MarkerClusterer
    averageCenter
    enableRetinaIcons
    gridSize={120}
    maxZoom={10}
    minimumClusterSize={10}
  >
    <style>{css}</style>
    {markers.map(({id, Longitude, Latitude, ...marker}) => (
      <Marker
        position={{lat: Number(Latitude), lng:Number(Longitude)}}
        icon={{
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_corazón.svg/169px-Heart_corazón.svg.png',
          size: new google.maps.Size(30, 30),
          scaledSize: new google.maps.Size(30, 30),
          origin: new google.maps.Point(0,0)
        }}
        options={{optimized:false}}
        key={id}
        {...marker}
        onMouseOver={() => console.log("ok")}
      />
    ))}


  </MarkerClusterer>
);

export default Markers;
