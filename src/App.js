import React from 'react';
import { Home } from '@mindshaft/cute-components';
import machine from './appmachine';
import { wrap } from './appmachine/connect';
import Root from './appmachine/connect';
import '@mindshaft/cute-components/build/main.css';
import './App.css';
import Notes from './Notes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const mapNameToProps = ({ name }) => ({ name });
const ConnectedHome = wrap(mapNameToProps)(
  (props) => (<Home {...props}><Link to="/notes">Notes</Link></Home>)
);

const App = () => {
  return (
    <Router>
      <Root machine={machine}>
        <Route exact path="/" component={ConnectedHome} />
        <Route path="/notes" component={Notes} />
      </Root>
    </Router>
  );
};

export default App;