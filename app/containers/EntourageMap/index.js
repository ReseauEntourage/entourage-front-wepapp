/*
 *
 * EntourageMap
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import 'whatwg-fetch';
import csv from 'csv';
import { setDataAction, setMapCenter } from './actions';
import GoogleMap from './Map/GoogleMap';

const geolocation = (
  window && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure('Your browser doesn\'t support geolocation.');
    },
  })
);

export class EntourageMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    fetch('/entourages.csv')
    .then((response) => response.text())
    .then((text) => csv.parse(text, { columns: true }, (err, data) => {
      this.props.setDataAction(data);
    }));

    // geolocation
    geolocation.getCurrentPosition((position) => {
      this.props.setMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  render() {
    return (
      <div>
        <GoogleMap />
      </div>
    );
  }
}

EntourageMap.propTypes = {
  setDataAction: PropTypes.func.isRequired,
  setMapCenter: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  { setDataAction, setMapCenter }
)(EntourageMap);
