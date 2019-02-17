import React from 'react';
import '@mindshaft/cute-components/build/main.css';
import './App.css';
import Notes from './Notes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = (props) => (
  <div>
    <span>Hello, {props.name}</span>
    <Link to="/notes">Notes</Link>
  </div>
);
const App = () => {
  return (
    <Router>
      <>
      <Route exact path="/" render={() => <Home name="emily" />} />
      <Route path="/notes" component={Notes} />
      </>
    </Router>
  );
};

export default App;