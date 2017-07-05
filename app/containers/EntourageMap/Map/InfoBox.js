/*
 *
 * InfoBox - represent window containing specific info on point
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setOveredPointId } from '../actions';
import { InfoWindow } from 'react-google-maps';

const styles = {
  title: {
    fontSize: 'medium',
    textAlign: 'center',
    margin: 0,
    fontWeight: 300,
    marginBottom: 10,
  },
  description: {
    fontSize: 'small',
  },
  action: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    color: '#ffffff',
    background: '#EF662F',
    padding: '8px 10px',
    fontSize: 'small',
    textDecoration: 'none'
  },
  from: {
    textAlign: 'right',
  },
  name: {
    color: '#E26822',
  },

  // Overed box
  info: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#EF662F',
  }

}

const formatDate = (date) => {
  var dateObj = new Date(date);
  return `${dateObj.getUTCDate()}/${dateObj.getUTCMonth() + 1}`; //months from 1-12
}

const ClickedBox = ({ title, setOveredPointId, description, first_name, created_at }) =>  (
  <div>
    <h2 style={styles.title}>{title}</h2>
    <div style={styles.description}>{description}</div>

    <div style={styles.action}>
      <a style={styles.button} href="#">
        Rejoindre cette action !
      </a>
    </div>
    <div style={styles.from}>
      Par <span style={styles.name}>{first_name}</span>, le {formatDate(created_at)}
    </div>
  </div>
);
const OveredBox = ({ title }) =>  (
  <div>
    <div>{title}</div>
    <div style={styles.info}>
      clickez pour voir plus d'infos
    </div>
  </div>
);

const InfoBox = ({ position, setOveredPointId, isClicked, ...markerData }) =>  (
    <InfoWindow
      style={{backgroundColor:"blue"}}
      position={position}
      options={{ disableAutoPan: false }}
      onCloseClick={() => setOveredPointId(null)}
    >
      {isClicked ? <ClickedBox {...markerData} /> : <OveredBox {...markerData} />}
    </InfoWindow>
);

InfoBox.propTypes = {
  setOveredPointId: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  { setOveredPointId }
)(InfoBox);