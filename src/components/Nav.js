import React from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';
import { Link } from 'react-router-dom';
import styles from '../scss/nav.module.scss';

const Nav = (props) => {
  return (
    <nav className={styles.nav}>
      <Link to="/cave"><i/></Link>
      <Link to="/">Home</Link>
      <Link to="/notes">Notes</Link>
      {props.children}
    </nav>
  );
};

Nav.propTypes = {
  children: PropTypes.node
};
export default withRouter(Nav);