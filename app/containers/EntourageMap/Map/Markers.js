/*
 *
 * Markers - represent all animated points on the map
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMarkers, getInBoundsMarkers } from '../selectors';
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import Marker from './Marker';


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
      opacity: 0.85;
  	}
  }

  @-webkit-keyframes pulse{
  	to {
  		transform: scale(0.7);
  		-webkit-transform: scale(0.7);
      opacity: 0.85;
  	}
  }
`;

const Markers = ({markers, setOveredPointId}) => (
  <MarkerClusterer
    averageCenter
    enableRetinaIcons
    gridSize={120}
    // maxZoom={10}
    minimumClusterSize={50}
  >
    <style>{css}</style>
    {markers.map(marker => (
      <Marker
        key={marker.id}
        {...marker}
      />
    ))}
  </MarkerClusterer>
);

Markers.propTypes = {
};

const mapStateToProps = (state) => ({
  markers: makeSelectMarkers(state)
});
// const mapStateToProps = (state) => ({
//   markers: getInBoundsMarkers(state)
// });

export default connect(
  mapStateToProps,
  {  }
)(Markers);
