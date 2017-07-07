/*
 *
 * Markers - represent all animated points on the map
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import { makeSelectMarkers } from '../selectors';
import Marker from './Marker';
import './markers-styles';

const Markers = ({ markers }) => (
  <MarkerClusterer
    averageCenter
    enableRetinaIcons
    gridSize={120}
    // maxZoom={10}
    minimumClusterSize={50}
  >
    {markers.map((marker) => (
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
  markers: makeSelectMarkers(state),
});

export default connect(
  mapStateToProps,
  { }
)(Markers);
