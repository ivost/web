import React from 'react';
import * as d3 from "d3";

export default class ProgressArc extends React.Component {
  displayName: 'ProgressArc';
  propTypes: {
      id: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
      innerRadius: PropTypes.number,
      outerRadius: PropTypes.number,
      backgroundColor: PropTypes.string,
      foregroundColor: PropTypes.string,
      percentComplete: PropTypes.number
    };

    componentDidMount() {
        const context = this.setContext();
        this.setBackground(context);
        this.setForeground(context);      
    }
    
    setContext() {
      const { height, width, id} = this.props;
      return d3.select(this.refs.arc).append('svg')
        .attr('height', height)
        .attr('width', width)
        .attr('id', id)
        .append('g')
        .attr('transform', `translate(${height / 2}, ${width / 2})`);
    }
    
    setBackground(context) {
      return context.append('path')
      .datum({ endAngle: this.tau })
      .style('fill', this.props.backgroundColor)
      .attr('d', this.arc());
    }
    
    setForeground(context) {
      return context.append('path')
        .datum({ endAngle: this.tau * 0.3 })
        .style('fill', '#00ff00')
        .attr('d', this.arc());
    }

    tau = Math.PI * 2;;

    arc() {
      return d3.arc()
        .innerRadius(this.props.innerRadius)
        .outerRadius(this.props.outerRadius)
        .startAngle(0)
    }
 
  render() {
    return (
      <div ref="arc"></div>
    )
  }
}
