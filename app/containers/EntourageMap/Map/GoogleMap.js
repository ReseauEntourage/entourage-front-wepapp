/*
 *
 * GoogleMap - show google map for entourage data
 *
 */
import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import {
  MAP,
} from 'react-google-maps/lib/constants';
import Responsive from 'react-responsive';
import Markers from './Markers';
import InfoList from './InfoList';
import TopBar from './TopBar';
import { setMapBounds, setClickedPointId, setOveredPointId, setMapZoom } from '../actions';
import { getMapCenter, getMapZoom } from '../selectors';

let AsyncGoogleMap = withScriptjs(
  withGoogleMap(
    ({ map, onMapLoaded, mapCenterPosition, mapZoom, ...props }) => (
      <GoogleMap
        ref={onMapLoaded}
        zoom={mapZoom}
        center={mapCenterPosition}
        gestureHandling="greedy"
        // Notify list to refresh its content based on current map bounds visible markers
        onBoundsChanged={debounce(() => props.setMapBounds(map.getBounds()), 100)}
        onClick={() => {
          props.setClickedPointId(null);
          props.setOveredPointId(null);
        }}
        onZoomChanged={(z) => props.setMapZoom(map.getZoom())}
        defaultOptions={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <Markers />
      </GoogleMap>
    )
  )
);

AsyncGoogleMap = connect(
  (state) => ({
    mapCenterPosition: getMapCenter(state),
    mapZoom: getMapZoom(state),
  }),
  { setMapBounds, setClickedPointId, setOveredPointId, setMapZoom }
)(AsyncGoogleMap);


export default class EntourageMap extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    map: null,
  };

  onMapLoaded = (map) => {
    if (map) {
      // Create a lawer and set it's id to enable animating marker css animations
      const markersOverlay = new window.google.maps.OverlayView();
      markersOverlay.draw = () => {
        markersOverlay.getPanes().markerLayer.id = 'markerLayer';
      };
      markersOverlay.setMap(map.context[MAP]);
      this.setState({ map });
    }
  }

  render() {
    const infoListWidth = '20%';
    const topBarHeight = '50px';
    const laodingComp = (
      <div style={{ height: '100%', width: '100vw' }}>
        Chargement...
      </div>
    );

    // Dynamic container depending on device
    const baseStyle = { height: `calc(${window.innerHeight}px - ${topBarHeight})`, userSelect: 'none' };
    const containerComp = (desktop) => (
      desktop ?
        <div style={{ ...baseStyle, width: `calc(100vw - ${infoListWidth})` }} />
      :
        <div style={{ ...baseStyle, width: '100vw' }} />
    );
    const mapComp = (<div style={{ height: '100%' }} />);

    return (
      <div>
        <TopBar height={topBarHeight} map={this.state.map} />
        <Responsive minDeviceWidth={768}>
          {(desktop) => (
            <div style={{ display: 'flex' }}>
              <AsyncGoogleMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyDfyjrkHc0y1l4OzqfFV2noO2906f1RNuY"
                loadingElement={laodingComp}
                containerElement={containerComp(desktop)}
                mapElement={mapComp}
                markers={this.props.dataPoints}
                map={this.state.map}
                onMapLoaded={this.onMapLoaded}
              />
              {desktop && <InfoList
                style={{
                  width: infoListWidth,
                  height: `calc(100vh - ${topBarHeight})`,
                }}
              />}
            </div>
          )}
        </Responsive>
      </div>
    );
  }
}
