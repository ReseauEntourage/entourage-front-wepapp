/*
 *
 * InfoList - represent a list of info
 *
 */
import React from 'react';
import { connect } from 'react-redux';
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

const InfoList = ({ style, markers }) => (
  <div style={{ ...baseStyle, ...style }}>
    <div style={filterBoxStyle}>
      <FilterBox />
    </div>
    {
        markers.map((marker) => (
          <InfoListItem
            key={marker.id}
            id={marker.id}
            position={marker.position}
            marker={marker}
          />
        ))}
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
)(InfoList);
