/*
 *
 * TopBar - represents the top bar
 *
 */
import React, { PropTypes } from 'react';
import Responsive from 'react-responsive';
import Logo from 'assets/images/apple-touch-icon.png';
import SearchBox from './SearchBox';


const Default = ({ children }) => <Responsive minWidth={768}>{children}</Responsive>;

const styles = {
  content: (style) => ({
    ...style,
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: '-2px 0px 7px -1px rgba(0,0,0,0.75)',
    zIndex: 1,
  }),
  link: {
    color: '#EF662F',
  },
  searchBar: {
    marginLeft: 10,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
};

const TopBar = ({ map, ...style }) => (
  <div style={styles.content(style)}>

    <div style={styles.searchBar} >
      <img style={{ display: 'inline-block' }} src={Logo} alt="logo" />
      <div style={{ display: 'inline-block' }}>
        <SearchBox map={map} />
      </div>
    </div>
    <Default>
          Explorez&nbsp;<a style={styles.link} href="http://www.entourage.social/">Entourage</a>, le réseau de ceux qui n&apos;ont plus de réseau
      </Default>
    <div>&nbsp;</div>
    <div>&nbsp;</div>

  </div>
  );

TopBar.propTypes = {
  map: PropTypes.object,
};

export default TopBar;
