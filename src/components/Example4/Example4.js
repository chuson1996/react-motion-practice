import React, { Component } from 'react';
import { Motion, spring, presets } from 'react-motion';

const wobbly = (val) => spring(val, presets.wobbly)
// const gentle = (val) => spring(val, presets.gentle)
// const stiff = (val) => spring(val, presets.stiff)

class Example4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockStyle: {
        height: 0,
        y: 0
      },
      textStyle: {
        opacity: 0,
        y: -53,
        display: 0
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
        y: 0,
        display: 1
      }
    });
  }

  runExample1 = () => {
    this.setState({
      blockStyle: {
        height: wobbly(53),
        y: 0
      },
      textStyle: {
        opacity: 0,
        y: -53,
        display: 1
      }
    });

    // Run this after 1 second
    setTimeout(() => {
      this.setState({
        blockStyle: {
          height: wobbly(0),
          y: wobbly(53)
        },
        textStyle: {
          opacity: 1,
          y: wobbly(0),
          display: 1
        }
      });
    }, 500);
  }

  render() {
    const s = require('./Example4.scss');
    const { blockStyle, textStyle } = this.state;
    return (
      <div className={s.Example2}>
        <button className={s.button} onClick={this.runExample1}>Press to see magic happens</button>
        <div className={s.container}>
          <Motion style={blockStyle} onRest={this.reset}>
            {({ height, y }) => <div className={s.block} style={{
              height: height > 53 ? 53 - (height - 53): height,
              transform: `translateY(${y}px)`
              // transform: `translateY(${y > 53 ? 53 - (y - 53): y}px)`
            }}></div>}
          </Motion>
          <Motion style={textStyle}>
            {({ opacity, y, display }) => <h1 style={{
              opacity,
              display: display ? 'inline-block' : 'none',
              transform: `translateY(${-Math.abs(y)}px)`
            }}>Chu Hoang Son</h1>}
          </Motion>
        </div>
      </div>
    );
  }
}

export default Example4;
