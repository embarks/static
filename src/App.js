import React from 'react';
import { Home } from '@mindshaft/cute-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import machine from './appmachine';
import { wrap } from './appmachine/connect';
import Root from './appmachine/connect';
import { setName } from './appmachine/home';
import Notes from './Notes';
import Nav from './components/Nav';
import styles from './scss/app.module.scss';
import './lib/falib';

const mapNameToProps = (state) => {
  return { name: state.home.name };
};
const ConnectedHome = wrap(
  mapNameToProps, 
  { changeName: setName }
)(
  function HomeyHome(props) {
    return (<Home name={props.name} changeName={props.changeName}></Home>);
  }
);

const App = () => {
  return (
    <Router>
      <Root machine={machine}>
        <Nav></Nav>
        <div className={styles.app}>
          <Route exact path="/" component={ConnectedHome} />
          <Route path="/notes" component={Notes} />
        </div>
      </Root>
    </Router>
  );
};

export default App;