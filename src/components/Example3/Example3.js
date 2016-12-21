import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

class Example3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockStyle: {
        width: 0,
        x: 0
      },
      textStyle: {
        opacity: 0,
        scale: 0.5
      }
    };
  }

  reset = () => {
    console.log('Called');
    this.setState({
      blockStyle: {
        width: 0,
        x: 400
      },
      textStyle: {
        opacity: 1,
        scale: 1
      }
    });
  }

  runExample1 = () => {
    this.setState({
      blockStyle: {
        width: spring(400),
        x: 0
      },
      textStyle: {
        opacity: 0,
        scale: 0.5
      }
    });

    // Run this after 1 second
    setTimeout(() => {
      this.setState({
        blockStyle: {
          width: spring(0),
          x: spring(400)
        },
        textStyle: {
          opacity: 1,
          scale: spring(1)
        }
      });
    }, 500);
  }

  render() {
    const s = require('./Example3.scss');
    const { blockStyle, textStyle } = this.state;
    return (
      <div className={s.Example3}>
        <button className={s.button} onClick={this.runExample1}>Press to see magic happens</button>
        <div className={s.container}>
          <Motion style={blockStyle}>
            {({ width, x }) => <div className={s.block} style={{
              width,
              transform: `translateX(${x}px)`
            }}></div>}
          </Motion>
          <Motion style={textStyle}>
            {({ opacity, scale }) => <h1 style={{
              opacity,
              transform: `scale(${scale})`
            }}>Chu Hoang Son</h1>}
          </Motion>
        </div>
      </div>
    );
  }
}

export default Example3;
