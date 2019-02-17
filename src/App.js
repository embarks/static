import React, { Component }  from 'react';
import { Button } from '@mindshaft/cute-components';
import '@mindshaft/cute-components/build/main.css';
import './App.css';



class App extends Component{
  render() {
    return(
      <div className="App">
        <>
          <h1>Relax</h1>
          <Button></Button>
        </>
      </div>
    );
  }
}

export default App;