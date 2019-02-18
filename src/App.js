import React from 'react';
import { Home } from '@mindshaft/cute-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import machine from './appmachine';
import { wrap } from './appmachine/connect';
import Root from './appmachine/connect';

import Notes from './Notes';

const mapNameToProps = ({ name }) => ({ name });
const ConnectedHome = wrap(mapNameToProps)(
  (props) => (<Home {...props}><Link to="/notes">Notes</Link></Home>)
);

const App = () => {
  return (
    <div>
      <Router>
        <Root machine={machine}>
          <Route exact path="/" component={ConnectedHome} />
          <Route path="/notes" component={Notes} />
        </Root>
      </Router>
    </div>
  );
};

export default App;