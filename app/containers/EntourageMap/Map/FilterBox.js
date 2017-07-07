/*
 *
 * SearchBar - represents the a search bar for finding places on the map
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Icon from 'react-icons/lib/fa/filter';
import { debounce } from 'lodash';
import { setFilter } from '../actions';

const styles = {
  box: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    height: 32,
    paddingLeft: 10,
    borderRadius: 3,
    boxShadow: '0 0px 4px rgba(0, 0, 0, 0.3)',
    fontSize: 14,
    outline: 'none',
    textOverflow: 'ellipses',
    backgroundColor: 'white',
  },
  input: {
    width: 140,
    paddingTop: 6,
    paddingLeft: 4,
    border: 0,
    '&:focus': {
      outline: 0,
    },
  },
  iconContainer: {
    marginRight: 3,
    marginTop: -4,
  },
};

const debouncer = debounce((value, callback) => {
  callback(value);
}, 500);

const handleInputChange = (e, callback) => {
  debouncer(e.target.value.trim(), callback);
};


const FilterBox = ({ classes, ...props }) => (
  <div className={classes.box}>
    <Icon className={classes.iconContainer} color="#c5c5c5" size={20} />
    <input
      placeholder="Filtrer..."
      type="text"
      className={classes.input}
      onChange={(e) => handleInputChange(e, props.setFilter)}
    />
  </div>
  );

FilterBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  () => ({}),
  { setFilter }
)(injectSheet(styles)(FilterBox));
