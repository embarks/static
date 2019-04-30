import React from 'react';
// import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';
import Head from '../assets/head.svg';
import Neck from '../assets/neck.svg';
import BodyPart_0 from '../assets/body_0.svg';
import BodyPart_1 from '../assets/body_1.svg';
import BodyPart_2 from '../assets/body_2.svg';
import BodyPart_3 from '../assets/body_3.svg';
import BodyPart_4 from '../assets/body_4.svg';
import TailEnd from '../assets/tail_end.svg';
import styles from '../scss/nav.module.scss';

const Nav = () => {
  function openBrowserTab(url) {
    return ()=> window.open(url, '_blank');
  }
  return (
    <nav className={styles.nav}>
      <TailEnd onClick={openBrowserTab('https://github.com/embarks')} />
      <BodyPart_4 onClick={openBrowserTab('https://www.linkedin.com/in/thebartman/')} />
      <BodyPart_3 />
      <BodyPart_2 />
      <BodyPart_1 />
      <BodyPart_0 />
      <Neck />
      <Head />
      <u>embarks.solweb.org</u>
    </nav>
  );
};

export default withRouter(Nav);