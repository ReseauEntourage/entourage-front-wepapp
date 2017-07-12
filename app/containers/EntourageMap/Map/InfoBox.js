/*
 *
 * InfoBox - represent window containing specific info on point
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { InfoWindow } from 'react-google-maps';
import { setOveredPointId } from '../actions';

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
    textDecoration: 'none',
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
  },

};

const formatDate = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.getUTCDate()}/${dateObj.getUTCMonth() + 1}/${dateObj.getUTCFullYear()}`; // months from 1-12
};

const ClickedBox = ({ title, description, first_name, createDateJS }) => (
  <div>
    <h2 style={styles.title}>{title}</h2>
    <div style={styles.description}>{description}</div>

    <div style={styles.action}>
      <a style={styles.button} href="#">
        Rejoindre cette action !
      </a>
    </div>
    <div style={styles.from}>
      Par <span style={styles.name}>{first_name}</span>, le {formatDate(createDateJS)}
    </div>
  </div>
);
const OveredBox = ({ title }) => (
  <div>
    <div>{title}</div>
    <div style={styles.info}>
      clickez pour voir plus d&apos;infos
    </div>
  </div>
);

const InfoBox = ({ position, isClicked, ...props }) => (
  <InfoWindow
    position={position}
    options={{ disableAutoPan: false }}
    onCloseClick={() => props.setOveredPointId(null)}
  >
    <div style={{ maxWidth: 300 }}>
      {isClicked ? <ClickedBox {...props} /> : <OveredBox {...props} />}
    </div>
  </InfoWindow>
);

InfoBox.propTypes = {
  setOveredPointId: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  { setOveredPointId }
)(InfoBox);
