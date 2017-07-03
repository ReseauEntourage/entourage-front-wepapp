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
import makeSelectEntourageMap from './selectors';
import GoogleMap from './Map/GoogleMap';


export class EntourageMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    dataPoints: [],
  }

  componentDidMount() {
    fetch('http://localhost:1337/entourage-landingpages-preprod.herokuapp.com/assets/downloads/entourages.csv')
    .then((response) => response.text())
    .then((text) => csv.parse(text, { columns: true }, (err, data) => {
      this.setState({ dataPoints: data });
    }));
  }

  render() {
    return (
      <div>
        <GoogleMap dataPoints={this.state.dataPoints} />
      </div>
    );
  }
}

EntourageMap.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EntourageMap: makeSelectEntourageMap(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

// export default connect((state, props) => ({
//   overed: state.overedMarkerId === props.id,
//   overedGroup: props.groupId && state.overedGroupId === props.groupId,
//   active: state.activeMarkerId === props.id || state.newMarkerId === props.id,
//   disableAutoPan: state.newMarkerId === props.id,
// }), {
//   setOverMarker,
//   setActiveMarker,
// })(EntourageMap);

export default connect(mapStateToProps, mapDispatchToProps)(EntourageMap);
