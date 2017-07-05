/*
 *
 * InfoBox - represent window containing specific info on point
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setOveredPointId, setClickedPointId } from '../actions';
import { InfoWindow } from 'react-google-maps';

const styles = {
  main: (index, selected) => ({
    fontWeight: 200,
    padding: 10,
    // paddingTop: 20,
    // paddingBottom: 20,
    fontSize: 14,
    backgroundColor: selected ? '#CECECE' : index % 2 === 0 ? '#F3F3F3' : '#FFFFFF'
  }),
  title: {
    fontSize: 'medium',
    textAlign: 'center',
    margin: 0,
    fontWeight: 300,
    marginBottom: 20,
  },
  from: {
    textAlign: 'right',
  },
  name: {
    color: '#E26822',
  },

}

const formatDate = (date) => {
  var dateObj = new Date(date);
  return `${dateObj.getUTCDate()}/${dateObj.getUTCMonth() + 1}`; //months from 1-12
}

const InfoListItem = ({ marker, selected, index, ...props }) =>  (
    <div style={styles.main(index, selected)}
      onMouseOver={() => props.setOveredPointId(marker.id)}
      onClick={() => props.setClickedPointId(marker.id)}
    >
      <h2 style={styles.title}>{marker.title}</h2>

      <div style={styles.from}>
        Par <span style={styles.name}>{marker.first_name}</span>, le {formatDate(marker.created_at)}
      </div>
    </div>
);

export default connect(
  () => ({}),
  { setClickedPointId, setOveredPointId }
)(InfoListItem);
