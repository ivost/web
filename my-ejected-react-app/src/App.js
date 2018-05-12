import React, { Component } from 'react';
import logo from './logo.svg'; 
import './App.css';
import Heading from './Heading';
import Button from './Button';
import Repeat from './Repeat'; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading>
          My App Heading
        </Heading>
        <Button />

        <p className="App-intro"> 
          <Repeat times="5" value="React!" /> 
        </p> 
      </div>
    );
  }
}

export default App;
