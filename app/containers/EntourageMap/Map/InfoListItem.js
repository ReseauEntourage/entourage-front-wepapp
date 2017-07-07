/*
 *
 * InfoListItem - represent one row of the info list component
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { setOveredPointId, setClickedPointId } from '../actions';
import { makeSelectMarkerIsInBound, makeSelectIsOvered, makeSelectIsClicked } from '../selectors';

const styles = {
  main: (index, selected) => ({
    fontWeight: 200,
    padding: 10,
    fontSize: 14,
    backgroundColor: selected ? '#CECECE' : index % 2 === 0 ? '#F3F3F3' : '#FFFFFF',
  }),
  title: {
    fontSize: 'medium',
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

};

const formatDate = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getUTCDate()}/${dateObj.getUTCMonth() + 1}`; // months from 1-12
};

const InfoListItem = ({ marker, isClicked, isOvered, index, isInBound, ...props }) => {
  if (!isInBound) {
    return null;
  }
  const selected = isClicked || isOvered;
  return (
    /* eslint jsx-a11y/mouse-events-have-key-events: 0 */
    <div
      style={styles.main(index, selected)}
      onMouseOver={() => props.setOveredPointId(marker.id)}
      onClick={() => props.setClickedPointId(marker.id)}
      role="link"
    >
      <h2 style={styles.title}>{marker.title}</h2>

      <div style={styles.from}>
        Par <span style={styles.name}>{marker.first_name}</span>, le {formatDate(marker.created_at)}
      </div>
    </div>
  );
};

const makeMapStateToProps = () => {
  const getMarkerIsInBound = makeSelectMarkerIsInBound();
  const getSelectIsOvered = makeSelectIsOvered();
  const getSelectIsClicked = makeSelectIsClicked();
  const mapStateToProps = (state, props) => ({
    isInBound: getMarkerIsInBound(state, props),
    isOvered: getSelectIsOvered(state, props),
    isClicked: getSelectIsClicked(state, props),
  });
  return mapStateToProps;
};

export default connect(
  makeMapStateToProps,
  { setClickedPointId, setOveredPointId }
)(InfoListItem);
