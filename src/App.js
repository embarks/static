import React from 'react';
import { Home } from '@mindshaft/cute-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';
import styles from './scss/app.module.scss';
import './lib/falib';


const App = () => {
  return (
    <Router>
      <>
        <Nav />
        <div className={styles.app}>
          <Route exact path="/" component={Home} />
        </div>
      </>
    </Router>
  );
};

export default App;