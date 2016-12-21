import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

class Example1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockStyle: {
        height: 0,
        y: 53
      },
      textStyle: {
        opacity: 0
      }
    };
  }

  reset = () => {
    console.log('Called');
    this.setState({
      blockStyle: {
        height: 0,
        y: 53
      },
      textStyle: {
        opacity: 1,
        y: 0
      }
    });
  }

  runExample1 = () => {
    this.setState({
      blockStyle: {
        height: spring(53),
        y: spring(0)
      },
      textStyle: {
        opacity: 0,
        y: 53
      }
    });

    // Run this after 1 second
    setTimeout(() => {
      this.setState({
        blockStyle: {
          height: spring(0),
          y: 0
        },
        textStyle: {
          opacity: spring(1),
          y: spring(0)
        }
      });
    }, 500);
  }

  render() {
    const s = require('./Example2.scss');
    const { blockStyle, textStyle } = this.state;
    return (
      <div className={s.Example2}>
        <button className={s.button} onClick={this.runExample1}>Press to see magic happens</button>
        <div className={s.container}>
          <Motion style={blockStyle} onRest={this.reset}>
            {({ height, y }) => <div className={s.block} style={{
              height,
              transform: `translateY(${y}px)`
            }}></div>}
          </Motion>
          <Motion style={textStyle}>
            {({ opacity, y}) => <h1 style={{
              opacity,
              transform: `translateY(${y}px)`
            }}>Chu Hoang Son</h1>}
          </Motion>
        </div>
      </div>
    );
  }
}

export default Example1;
