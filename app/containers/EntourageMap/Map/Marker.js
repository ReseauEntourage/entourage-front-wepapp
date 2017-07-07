/*
 *
 * Marker - represent an animated points on the map
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Marker as GoogleMarker } from 'react-google-maps';
import { Animate } from 'react-move';
import { setOveredPointId, setClickedPointId } from '../actions';
import { makeSelectIsOvered, makeSelectIsClicked } from '../selectors';
import InfoBox from './InfoBox';

/* eslint no-plusplus: 0, no-mixed-operators: 0, no-param-reassign: 0 */
const easingFunc = (t, s = 5) => --t * t * ((s + 1) * t + s) + 1;

const Marker = ({ id, isOvered, isClicked, ...props }) => {
  const isFocus = isOvered || isClicked;

  return (
    <Animate
      data={{ iconSize: isFocus ? 50 : 30 }}
      duration={500}
      easing={easingFunc}
    >
      {(data) => (
        /* eslint jsx-a11y/mouse-events-have-key-events: 0 */
        <GoogleMarker
          position={props.position}
          icon={{
            anchor: new window.google.maps.Point(data.iconSize / 2, data.iconSize / 2),
            url: 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 29.6" >'
                    + '<path fill="#EF662F" d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0 '
                    + 'C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>'
                    + '</svg>',
              // url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_corazón.svg/169px-Heart_corazón.svg.png',
              // size: new google.maps.Size(30, 30),
            scaledSize: new window.google.maps.Size(data.iconSize, data.iconSize),
              // origin: new google.maps.Point(0,0)
          }}
          options={{ optimized: false }}
          key={id}
          onMouseOver={() => props.setOveredPointId(id)}
          onMouseOut={() => props.setOveredPointId(null)}
          onClick={() => props.setClickedPointId(id)}
        >
          {/* We show info box only if a point is overed by cursor */}
          {isOvered && !isClicked && <InfoBox {...props} />}
          {isClicked && <InfoBox {...props} isClicked />}
        </GoogleMarker>
        )}
    </Animate>
  );
};

Marker.propTypes = {
  setOveredPointId: PropTypes.func.isRequired,
};


const makeMapStateToProps = () => {
  const getSelectIsOvered = makeSelectIsOvered();
  const getSelectIsClicked = makeSelectIsClicked();
  const mapStateToProps = (state, props) => ({
    isOvered: getSelectIsOvered(state, props),
    isClicked: getSelectIsClicked(state, props),
  });
  return mapStateToProps;
};

export default connect(
  makeMapStateToProps,
  { setOveredPointId, setClickedPointId }
)(Marker);
