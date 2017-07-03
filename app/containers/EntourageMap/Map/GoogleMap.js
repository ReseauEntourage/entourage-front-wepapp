/*
 *
 * GoogleMap - show google map for entourage data
 *
 */
import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import Markers from './Markers';
import {
  MAP,
} from "react-google-maps/lib/constants";


const onMapLoaded = (map) => {
  if (map) {
    // Create a lawer and set it's id to enable animating marker css animations
    const markersOverlay = new google.maps.OverlayView();
    markersOverlay.draw = () => {
      markersOverlay.getPanes().markerLayer.id='markerLayer';
    };
    markersOverlay.setMap(map.context[MAP])
  }
}

const AsyncGoogleMap = withScriptjs(
  withGoogleMap(
    (props) => (
      <GoogleMap
        ref={onMapLoaded}
        defaultZoom={6}
        defaultCenter={{ lat: 47.43, lng: 2.43 }}
        onClick={props.onMapClick}
      >
        <Markers markers={props.markers} />
      </GoogleMap>
    )
  )
);

export default class EntourageMap extends React.Component { // eslint-disable-line react/prefer-stateless-function


  render() {

    const laodingComp = (
      <div style={{ height: '100%' }}>
        Chargement...
      </div>
    );
    const containerComp = (<div style={{ width: '100%', height: '100vh', userSelect: 'none' }} />);
    const mapComp = (<div style={{ height: '100%' }} />);

    return (
      <div>
        <AsyncGoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDfyjrkHc0y1l4OzqfFV2noO2906f1RNuY"
          loadingElement={laodingComp}
          containerElement={containerComp}
          mapElement={mapComp}
          markers={this.props.dataPoints}
        />
      </div>
    );
  }
}
