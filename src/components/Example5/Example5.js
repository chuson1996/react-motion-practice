import React, { Component, PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion';
import update from 'react-addons-update';
import c from 'classnames';

const animate = (val) => spring(val, { ...presets, stiffness: 200 });

export default class Example5 extends Component {
  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      isImageZoomed: 0,
      cachePosition: {},
      imageStyle: {
        zIndex: 1
      },
      backdropStyle: {
        width: 0,
        height: 0,
      }
    };
  }

  imageRef = (image) => {
    this.image = image;
    image.addEventListener('load', () => {
      // const { width, height } = image.getBoundingClientRect();
      const width = image.width;
      const height = image.height;
      console.log(width, height);
      this.setState(update(this.state, {
        cachePosition: {
          $merge: { width, height }
        },
        imageStyle: {
          $merge: { width, height }
        }
      }));
    });
  }

  positionImageBackToPlace = () => {
    // console.log((Math.floor(this.state.cachePosition.top) === Math.floor(this.image.style.top + window.scrollY)));
    const originalTop = Math.floor(this.state.cachePosition.top);
    const currentTop = Math.floor(this.image.offsetTop + window.scrollY);

    const top = this.state.cachePosition.top - window.scrollY;
    if (Math.abs(originalTop - currentTop) <= 10) {
      this.onRest();
    } else {
      this.setState(update(this.state, {
        imageStyle: {
          top: {
            $set: animate(top)
          }
        }
      }));
    }
  }

  zoom = () => {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const { zooming, unzooming } = this.state;
    const { width, height } = this.state.cachePosition;

    window.removeEventListener('scroll', this.positionImageBackToPlace);

    if (!zooming && !unzooming) {
      const { top, left } = this.image.getBoundingClientRect();
      console.log(top, left);
      this.setState(update(this.state, {
        cachePosition: {
          $merge: { top: top + window.scrollY, left }
        },
        imageStyle: {
          $merge: { top, left, zIndex: 98 }
        }
      }));
    }

    const ratio = width / height;
    const newWidth = Math.min(window.innerWidth, 800);
    const newHeight = newWidth / ratio;
    const newTop = (screenHeight - newHeight) / 2;
    const newLeft = (screenWidth - newWidth) / 2;
    setTimeout(() => {
      this.setState(update(this.state, {
        zooming: { $set: true },
        unzooming: { $set: false },
        isImageZoomed: {
          $set: 1
        },
        imageStyle: {
          $merge: {
            width: animate(newWidth),
            height: animate(newHeight),
            top: animate(newTop),
            left: animate(newLeft),
            zIndex: 99
          }
        },
        backdropStyle: {
          $merge: {
            width: animate(window.innerWidth * 10),
            height: animate(window.innerHeight * 10)
          }
        }
      }));
    });
  }

  unzoom = () => {
    const { width, height } = this.state.cachePosition;
    window.addEventListener('scroll', this.positionImageBackToPlace);
    this.setState(update(this.state, {
      zooming: { $set: false },
      unzooming: { $set: true },
      imageStyle: {
        $merge: {
          width: animate(width),
          height: animate(height),
          top: animate(this.state.cachePosition.top - window.scrollY),
          left: animate(this.state.cachePosition.left),
          zIndex: 95
        }
      },
      backdropStyle: {
        $merge: {
          width: animate(0),
          height: animate(0),
        }
      }
    }));
  }

  onRest = () => {
    if (this.state.unzooming) {
      window.removeEventListener('scroll', this.positionImageBackToPlace);
      console.log('zIndex -> 0');
      this.setState(update(this.state, {
        unzooming: { $set: false },
        isImageZoomed: {
          $set: 0
        },
        imageStyle: {
          $merge: {
            zIndex: 0
          }
        }
      }));
    }
  }

  render() {
    const s = require('./Example5.scss');
    const { backdropStyle, imageStyle, isImageZoomed, zooming, cachePosition } = this.state;
    const { className, src, ...otherProps } = this.props;
    return (
      <div className={c(s.example5, className)} {...otherProps}>
        <Motion style={backdropStyle}>
          { (_style) => <div className={s.backdrop} style={_style}></div> }
        </Motion>
        <div
          className={s.container}
          style={{
            display: 'inline-block',
            width: cachePosition.width,
            height: cachePosition.height
          }}>
          <Motion style={imageStyle} onRest={this.onRest}>
            { (_style) =>
              <img
                ref={this.imageRef}
                onClick={() => zooming ? this.unzoom() : this.zoom() }
                style={{
                  ..._style,
                  position: isImageZoomed ? 'fixed' : 'initial',
                  zIndex: imageStyle.zIndex
                }}
                className={s.photo}
                src={src}
                alt="unsplash" />
            }
          </Motion>
        </div>
      </div>
    );
  }
}
