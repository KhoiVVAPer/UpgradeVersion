/**
 * @fileoverview This wrapper component for images.
 * All images are stored in local device and then show
 * @package
 */

import React, { Component } from 'react';
import { Image, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { helpers, appContexts } from '../../../../config';
import styles from './styles';
import { TouchableDebounce } from '..';

const { MainHocContext } = appContexts;


class DCAImage extends Component {
  constructor(props) {
    super(props);
    const { useApectRatio, url, height } = this.props;
    const isAspectRatio = useApectRatio !== undefined ? useApectRatio : false;
    this.state = {
      loading: true,
      error: false,
      aspectRatio: [2, 2],
      imageUrl: '',
      originalUrl: url,
      isAspectRatio,
      height: new Animated.Value(height),
    };
  }

  componentDidMount() {
    this.configureImage();
  }

  /**
   * configure image for store localy
   */
  configureImage = async () => {
    const { originalUrl, isAspectRatio } = this.state;
    const imageUrl = await helpers.imageSavedCheck(originalUrl);

    this.setState({
      imageUrl,
      loading: false
    });
    if (isAspectRatio) {
      Image.getSize(imageUrl, (width, height) => {
        if (width && height) {
          this.setState({
            aspectRatio: helpers.aspectRatio(width / height, 50)
          });
        }
      }, (err) => {
        console.log({ err });
      });
    }
  }

  /**
   * Change image from reference dynamically
   * @param {String} url of image
   */
  changeImage = (url) => {
    this.setState({
      loading: true,
      originalUrl: url
    }, () => {
      this.configureImage();
    });
  }

  /**
   * Animate image height
   * @param {Int} height of image
   */
  animateImageHeight = (imgHeight, duration = 200) => {
    const { height } = this.state;

    Animated.timing(height, {
      toValue: imgHeight,
      duration,
    }).start();
  }

  /**
   * Renders image with apect ratio of image
   * @return {Component} Image with specified url
   */
  imageWithAspectRatio = () => {
    const {
      loading,
      imageUrl,
      originalUrl,
      aspectRatio,
      error,
      isAspectRatio,
      height
    } = this.state;
    const {
      imageStyle,
      resizeMode,
      animated,
      isGrayScale
    } = this.props;
    if (loading || !isAspectRatio) return null;

    const animationStyle = animated ? { height } : {};
    const opacityStyle = isGrayScale ? { opacity: 0.4 } : {};
    return (
      <Animated.Image
        dcaTest="imageWithAspectRatio"
        source={{ uri: !error ? imageUrl : originalUrl }}
        style={[
          styles.image,
          styles.imageWithAspectRatio,
          imageStyle || {},
          { aspectRatio: aspectRatio[0] / aspectRatio[1] },
          animationStyle,
          opacityStyle
        ]}
        resizeMode={resizeMode}
        onLoad={() => { }}
        onError={() => { this.setState({ error: true }); }}
      />
    );
  }

  /**
   * Renders image with stylesheet height and width
   * @return {Component} Image with specified url
   */
  imageWithoutAspectRatio = () => {
    const {
      loading,
      imageUrl,
      originalUrl,
      error,
      isAspectRatio,
      height
    } = this.state;
    const {
      imageStyle,
      resizeMode,
      animated,
      isGrayScale
    } = this.props;

    if (loading || isAspectRatio) return null;

    const animationStyle = animated ? { height } : {};
    const opacityStyle = isGrayScale ? { opacity: 0.4 } : {};
    return (
      <Animated.Image
        dcaTest="dcaImageWithoutAspectRatio"
        source={{ uri: !error ? imageUrl : originalUrl }}
        style={[styles.image, imageStyle || {}, animationStyle, opacityStyle]}
        resizeMode={resizeMode}
        onLoad={() => { }}
        onError={() => { this.setState({ error: true }); }}
      />
    );
  }

  renderImages = () => {
    const { height } = this.state;
    const { wrapStyle, animated } = this.props;

    const animationStyle = animated ? { height } : {};
    return (
      <Animated.View
        style={[styles.wrapStyle, wrapStyle || {}, animationStyle]}
        dcaTest="dcaImage"
      >
        {this.imageWithAspectRatio()}
        {this.imageWithoutAspectRatio()}
      </Animated.View>
    );
  }

  render() {
    const { error, imageUrl, originalUrl } = this.state;
    const { showEnlargedImage } = this.props;
    const { toggleFullImageVisiblity } = this.context;
    if (showEnlargedImage) {
      return (
        <TouchableDebounce style={{ flex: 1 }} onPress={() => toggleFullImageVisiblity(true, !error ? imageUrl : originalUrl)}>
          {this.renderImages()}
        </TouchableDebounce>
      );
    }
    return this.renderImages();
  }
}

DCAImage.propTypes = {
  url: PropTypes.string.isRequired,
  useApectRatio: PropTypes.bool,
  wrapStyle: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ]),
  imageStyle: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  ]),
  resizeMode: PropTypes.string,
  animated: PropTypes.bool,
  height: PropTypes.number,
  isGrayScale: PropTypes.bool,
  showEnlargedImage: PropTypes.bool
};

DCAImage.defaultProps = {
  useApectRatio: false,
  wrapStyle: {},
  imageStyle: {},
  resizeMode: 'contain',
  animated: false,
  height: 50,
  isGrayScale: false,
  showEnlargedImage: false
};

DCAImage.contextType = MainHocContext;
export default DCAImage;
