import React, { Component } from 'react';
import ProgressArc from './ProgressArc';

export default class App extends React.Component {

  render() {
    return (
      <ProgressArc
        height={300}
        width={300}
        innerRadius={100}
        outerRadius={110}
        id="d3-arc"
        backgroundColor="#e6e6e6"
        foregroundColor="#00ff00"
        percentComplete={0.3}
      />);
  }
}

