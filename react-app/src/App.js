import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactEventSource from 'react-eventsource'

const renderEvent = event => <div>{ event }</div>
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          <ReactEventSource url="https://stream.wikimedia.org/v2/stream/recentchange">
            { events => events.map(renderEvent) }
          </ReactEventSource>
        </div>
  
      </div>
    );
  }
}

export default App;
