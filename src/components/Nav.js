import React from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';
import styles from '../scss/nav.module.scss';

const Nav = (props) => {
  return (
    <nav className={styles.nav}>
      {props.children}
    </nav>
  );
};

Nav.propTypes = {
  children: PropTypes.node
};
export default withRouter(Nav);