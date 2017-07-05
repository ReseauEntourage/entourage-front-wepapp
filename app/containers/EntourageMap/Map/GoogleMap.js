/*
 *
 * GoogleMap - show google map for entourage data
 *
 */
import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { connect } from 'react-redux';
import Markers from './Markers';
import InfoList from './InfoList';
import { setMapBounds, setClickedPointId } from '../actions';
import { getMapCenter } from '../selectors';
import {
  MAP,
} from "react-google-maps/lib/constants";
import Responsive from 'react-responsive';
import _ from 'lodash';

const Default = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;

let AsyncGoogleMap = withScriptjs(
  withGoogleMap(
    ({ markers, map, onMapLoaded, mapCenterPosition, ...props }) => (
      <GoogleMap
        ref={onMapLoaded}
        defaultZoom={14}
        center={mapCenterPosition}
        // Notify list to refresh its content based on current map bounds visible markers
        onBoundsChanged={_.debounce( () => props.setMapBounds(map.getBounds()), 1000)}
        onClick={() => props.setClickedPointId(null)}
      >
        <Markers />
      </GoogleMap>
    )
  )
);

AsyncGoogleMap = connect(
  (state) => ({
    mapCenterPosition: getMapCenter(state)
  }),
  { setMapBounds, setClickedPointId }
)(AsyncGoogleMap);


export default class EntourageMap extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    map: null
  };

  onMapLoaded = (map) => {
    if (map) {
      // Create a lawer and set it's id to enable animating marker css animations
      const markersOverlay = new google.maps.OverlayView();
      markersOverlay.draw = () => {
        markersOverlay.getPanes().markerLayer.id='markerLayer';
      };
      markersOverlay.setMap(map.context[MAP]);
      this.setState({map});
    }
  }

  render() {
    const infoListWidth = '20%';
    const laodingComp = (
      <div style={{ height: '100%' }}>
        Chargement...
      </div>
    );

    // Dynamic container depending on device
    const containerComp = desktop => (
      desktop ?
        <div style={{ width: `calc(100vw - ${infoListWidth})`, height: '100vh', userSelect: 'none' }} />
      :
        <div style={{ width: '100vw', height: '100vh', userSelect: 'none' }} />
    );
    const mapComp = (<div style={{ height: '100%' }} />);

    return (
      <Responsive minDeviceWidth={768}>
        {desktop => (
          <div>
            <AsyncGoogleMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDfyjrkHc0y1l4OzqfFV2noO2906f1RNuY"
              loadingElement={laodingComp}
              containerElement={containerComp(desktop)}
              mapElement={mapComp}
              markers={this.props.dataPoints}
              map={this.state.map}
              onMapLoaded={this.onMapLoaded}
            />
            {desktop && <InfoList width={infoListWidth} />}
          </div>
        )}
      </Responsive>
    );
  }
}
