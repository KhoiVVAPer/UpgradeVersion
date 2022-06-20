/**
 * @fileoverview This component renders design template
 * for image collection manual content.
 * @package
 */
import React, { Component } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import { Button, HtmlParser } from '../../generic';
import { rootNavigation } from '../../../../navigation';
import { appContexts, helpers, initAdobeSdk } from '../../../../config';
import styles from './styles';
import { ACPAnalytics } from '@adobe/react-native-acpanalytics';
import { ACPCore } from '@adobe/react-native-acpcore';
const { PageContentContext } = appContexts;

class ImageGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSmallTop: '',
      imageSmallMiddle: '',
      imageSmallBottom: '',
      imageBig: ''
    };
  }

  componentDidMount() {
    this.getImages();
    initAdobeSdk();
  }

  getImages = async () => {
    const { layoutData } = this.props;

    const imageColectionObj = layoutData.values[0];
    const imageSmallTop = await helpers.imageSavedCheck(imageColectionObj.imageSmallTop);
    const imageSmallMiddle = await helpers.imageSavedCheck(imageColectionObj.imageSmallMiddle);
    const imageSmallBottom = await helpers.imageSavedCheck(imageColectionObj.imageSmallBottom);
    const imageBig = await helpers.imageSavedCheck(imageColectionObj.imageBig);

    this.setState({
      imageSmallTop,
      imageSmallMiddle,
      imageSmallBottom,
      imageBig
    });
  }

  navigate = (pageId) => {
    const { componentId } = this.context;
    Navigation.push(
      componentId,
      rootNavigation.pageContent({
        passProps: { pageId }
        // passProps: { pageId: 20035386 }
      })
    );
  }

  renderImages = (headline, imgLink, link, pageId, offset) => (
    <TouchableOpacity
      onPress={() => this.navigate(link)}
      style={styles.imageCollectionRightItem}
    >
      <ImageBackground
        source={{ uri: imgLink }}
        style={styles.imageCollectionRightItemInner}
      >
        <HtmlParser
          html={headline}
          textKey={`imageCollection-${pageId}-${offset}`}
          style={styles.imageCollectionHeadingRightTxt}
          onPress={() => { this.navigate(link); }}
        />
      </ImageBackground>
    </TouchableOpacity>
  )

  render() {
    const { layoutData } = this.props;
    const {
      imageSmallTop,
      imageSmallMiddle,
      imageSmallBottom,
      imageBig
    } = this.state;
    const { pageId } = this.context;

    const imageColectionObj = layoutData.values[0];

    return (
      <View style={styles.imageCollection}>
        {
          imageBig ? (
            <ImageBackground
              source={{ uri: imageBig }}
              style={styles.imageCollectionLeft}
            >
              <TouchableOpacity
                onPress={() => { this.navigate(imageColectionObj.buttonlink_imageBig); }}
                style={styles.imageCollectionLeftInner}
              >
                <HtmlParser
                  html={imageColectionObj.headline_imageBig}
                  textKey={`imageCollection-${pageId}-0`}
                  style={styles.imageCollectionHeadingLeftTxt}
                  onPress={() => { this.navigate(imageColectionObj.buttonlink_imageBig); }}
                />
                <Button
                  onPress={() => { this.navigate(imageColectionObj.buttonlink_imageBig); }}
                  text={imageColectionObj.buttontext_imageBig}
                  theme="app"
                  style={styles.bannerBtn}
                  shadow
                />
              </TouchableOpacity>
            </ImageBackground>
          ) : null
        }

        <View style={styles.imageCollectionRight}>
          {
            imageSmallTop
              ? this.renderImages(
                imageColectionObj.headline_imageSmallTop,
                imageSmallTop,
                imageColectionObj.link_imageSmallTop,
                pageId,
                1
              ) : null
          }
          {
            imageSmallMiddle
              ? this.renderImages(
                imageColectionObj.headline_imageSmallMiddle,
                imageSmallMiddle,
                imageColectionObj.link_imageSmallMiddle,
                pageId,
                2
              ) : null
          }
          {
            imageSmallBottom
              ? this.renderImages(
                imageColectionObj.headline_imageSmallBottom,
                imageSmallBottom,
                imageColectionObj.link_imageSmallBottom,
                pageId,
                3
              ) : null
          }
        </View>
      </View>
    );
  }
}

ImageGroup.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};

ImageGroup.contextType = PageContentContext;
export default ImageGroup;
