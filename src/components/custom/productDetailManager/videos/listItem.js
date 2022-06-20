/**
 * @fileoverview This component renders design template
 * for image product group list item manual content.
 * @package
 */
import React, { Component } from 'react';
import {
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import {
  appContexts,
  icons,
  colors
} from '../../../../config';
import { DcaImage, TouchableDebounce } from '../../elements';
import { FontIcon } from '../../generic';
import styles from './styles';
import WebView from 'react-native-webview';

const { PageContentContext } = appContexts;

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playVideo: false,
      isPaused: true
    };
    this.player = null;
  }


  playVideo = () => {
    this.setState({
      playVideo: true,
      isPaused: false
    });
  }

  getVideoData = (item) => {
    const { urls } = item;
    const temp = {};
    urls.forEach(({ type, url }) => {
      if (type === 'thumbnail') {
        temp.thumbnail = url;
      }
      if (type === 'video') {
        temp.videoUrl = url;
      }
    });
    return temp;
  }

  renderVideo = (video) => {
    const { isPaused, playVideo } = this.state;
    let { videoUrl } = video;
    const { thumbnail } = video;
    videoUrl = videoUrl.split('.');
    videoUrl.pop();
    videoUrl.push('mp4');
    videoUrl = videoUrl.join('.');
    const displayStyle = playVideo ? {} : { display: 'none' };
    return (
      <View style={{
        width: 100,
        height: 100,

      }}>
        <WebView
          scalesPageToFit={true}
          startInLoadingState={true}
          source={{ uri: 'https://www.google.co.in/' }}
        />
      </ View>
      // <Video
      //   paused={isPaused}
      //   source={{ uri: videoUrl }}
      //   ref={(ref) => {
      //     this.player = ref;
      //   }}
      //   controls
      //   resizeMode="contain"
      //   poster={thumbnail}
      //   onLoad={() => {
      //     // console.log('onLoad', this.player);
      //     // this.setState({ isPaused: true });
      //   }}
      //   onBuffer={() => console.log('Buffering')}
      //   onError={(e) => console.log('Error-> ', e)}
      //   // onFullscreenPlayerDidDismiss={() => {
      //   //   console.log('fullscreen exit');
      //   //   this.setState({ playVideo: false });
      //   // }}
      //   style={{ ...styles.backgroundVideo, ...displayStyle }}
      // />
    );
  }

  render() {
    const { playVideo } = this.state;
    const { productData } = this.props;
    const video = this.getVideoData(productData);
    const videoId = productData.id;
    return (
      <View style={styles.listItem}>

        <View style={{
          width: 300,
          height: 200,
          backgroundColor: 'green'
        }}>
          <WebView
            //  scalesPageToFit={true}
            source={{ uri: 'https://mycliplister.com/static/html/kaercherAppLandingPage.html?keytype=500&rk=' + videoId + '&lang=fr' }}
            // source={{ uri: 'https://demo.cliplister.com/kaercher/viewer/landingpage/video.html?keytype=500&rk=' + videoId + '&lang=fr' }}
            allowsFullscreenVideo={true}
            allowsInlineMediaPlayback={true}
          />
        </ View>
        {/* <TouchableDebounce onPress={() => this.playVideo()}>
          <DcaImage
            url={video.thumbnail}
            imageStyle={styles.listItemImg}
            wrapStyle={styles.listItemImgWrap}
          />
          <FontIcon
            type={icons.play[1]}
            icon={icons.play[0]}
            color={colors.white}
            size={75}
            wrapStyle={styles.playIcon}
          // onPress={() => { }}
          />
        </TouchableDebounce>
        { playVideo && this.renderVideo(video) } */}
      </View>
    );
  }
}

ListItem.propTypes = {
  productData: PropTypes.objectOf(PropTypes.any).isRequired,
};
ListItem.contextType = PageContentContext;
export default ListItem;
