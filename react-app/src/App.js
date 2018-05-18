import React, { Component } from 'react';

//import logo from './logo.svg';

import './App.css';
import ReactEventSource from 'react-eventsource'

// const URL = "http://192.168.6.134:8000/events"
//           <ReactEventSource url="https://stream.wikimedia.org/v2/stream/recentchange">
//            { events => events.map(renderEvent) }
//           <ReactEventSource url="http://192.168.6.134:8000/events">

//const renderEvent = event => <div>{ event }</div>
class App extends Component {
  render() {
    return (
      <div className="App">

        <div>
          <ReactEventSource url="http://localhost:8000/events">
            { events => console.log(events) }
          </ReactEventSource>
        </div>
  
      </div>
    );
  }
}

export default App;
