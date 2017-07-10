/*
 *
 * SearchBar - represents the a search bar for finding places on the map
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import SearchIcon from 'react-icons/lib/fa/search';
import { setMapCenter } from '../actions';

const styles = {
  box: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    // width: 240,
    height: 32,
    paddingLeft: 10,
    marginLeft: 10,
    borderRadius: 3,
    boxShadow: '0 0px 4px rgba(0, 0, 0, 0.3)',
    fontSize: 14,
    outline: 'none',
    textOverflow: 'ellipses',
    backgroundColor: 'white',
  },
  input: {
    paddingTop: 6,
    paddingLeft: 4,
    border: 0,
    transition: '0.3s ease',
    '&:focus': {
      outline: 0,
    },
    '@media (min-width: 1024px)': {
      '&:focus': {
        minWidth: 280,
      },
    },
  },
  iconContainer: {
    marginRight: 3,
    marginTop: -4,
  },
};

const globalStyle = `
  .pac-container {
    box-shadow: none !important;
    border: 1px solid rgb(197, 197, 197) !important;
  }
`;

const handleRef = (c, props, map) => {
  if (!c || !map) {
    return;
  }
  const searchBox = new window.google.maps.places.SearchBox(c, {
    types: ['geocode'],
  });
  searchBox.bindTo('bounds', map);
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces();
    if (places.length > 0) {
      const position = places[0].geometry.location;
      props.setMapCenter({ lat: position.lat(), lng: position.lng() });
    }
  });
};

class SearchBox extends React.Component {

  state = {
    focus: false,
  }
  render() {
    const { classes, map, ...props } = this.props;
    const { focus } = this.state;
    return (
      <div className={classes.box}>
        <style>{globalStyle}</style>
        <SearchIcon className={classes.iconContainer} color="#c5c5c5" size={20} />
        <input
          ref={(c) => handleRef(c, props, map)}
          placeholder="Cherchez un lieu..."
          type="text"
          className={classes.input}
          onBlur={() => this.setState({ focus: false })}
          onFocus={() => this.setState({ focus: true })}
        />
      </div>
    );
  }
}
SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  map: PropTypes.object,
};

export default connect(
  () => ({}),
  { setMapCenter }
)(injectSheet(styles)(SearchBox));
