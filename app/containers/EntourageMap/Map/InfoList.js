/*
 *
 * InfoList - represent a list of info
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getInBoundsMarkersWithSelectedState } from '../selectors';
import ReactList from 'react-list';
import InfoListItem from './InfoListItem';

const style = {
  position: 'absolute',
  right: 0,
  top: 0,
  backgroundColor: 'white',
  height: '100vh',
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: '-2px 0px 7px -1px rgba(0,0,0,0.75)'
}



const InfoList = ({markers, setOveredPointId, width}) => {
  const renderItem = (index, key) => (
    <InfoListItem key={key} marker={markers[index]} index={index} selected={markers[index].selected} />
  )

  markers.forEach( (marker,i) => {
    if (marker.selected) {
      setTimeout(() => this.list.scrollAround(i), 100);
    }
  });

  return (
    <div style={{...style, width}}>

        <ReactList
          itemRenderer={renderItem}
          length={markers.length}
          minSize={markers.length}
          type='variable'
          ref={c => this.list = c}
        />
    </div>
  );
}

InfoList.propTypes = {
};

const mapStateToProps = (state) => ({
  markers: getInBoundsMarkersWithSelectedState(state)
});

export default connect(
  mapStateToProps,
  {  }
)(InfoList);
