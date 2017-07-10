/*
 *
 * InfoList - represent a list of info
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { makeSelectMarkers } from '../selectors';
import InfoListItem from './InfoListItem';
import FilterBox from './FilterBox';

const baseStyle = {
  backgroundColor: 'white',
  overflow: 'auto',
};

const filterBoxStyle = {
  padding: 5,
};

const styles = {
  rows: {
    '& tr:nth-child(even)': {
      backgroundColor: '#F3F3F3',
    },
  },
};

const InfoList = ({ style, markers, classes }) => (
  <div style={{ ...baseStyle, ...style }}>
    <div style={filterBoxStyle}>
      <FilterBox />
    </div>
    <table className={classes.rows}>
      <tbody>
        {
        markers.map((marker) => (
          <InfoListItem
            key={marker.id}
            id={marker.id}
            position={marker.position}
            marker={marker}
          />
        ))}
      </tbody>
    </table>
  </div>
  );

InfoList.propTypes = {
};

const mapStateToProps = (state) => ({
  markers: makeSelectMarkers(state),
});

export default connect(
  mapStateToProps,
  { }
)(injectSheet(styles)(InfoList));
