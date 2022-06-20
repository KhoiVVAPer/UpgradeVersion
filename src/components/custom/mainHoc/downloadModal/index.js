import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  // AppState,
  Platform
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import NetInfo from '@react-native-community/netinfo/lib/commonjs';
import {
  icons,
  colors,
  globals,
  downloadHandler,
  tr,
  appConstants,
  refHandler,
  helpers
} from '../../../../config';
import { FontIcon, Button } from '../../generic';
import {
  saveOfflineDownload,
  getOfflineDownload,
  saveMediaUrl as mediaUrlPersist
} from '../../../../redux/actions';
import styles from './styles';


const {
  textCasing,
  downloadingFlags,
  catelogueTypes,
} = appConstants;

class DownloadModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      progressPercent: 0,
      totalImages: 0,
      progressText: '0 / 0',
      isContentDownloaded: false,
      isMediaDownloaded: false,
      inLoadingState: false,
      isMounted: false,
      zipArr: []
    };
    this.imgRef = null;
    this.isComponentVisible = true;
  }

  componentDidMount() {
    const { setDowloadModalRef } = this.props;

    this.setState({
      isMounted: true
    }, () => {
      globals.SET_APP_DATA('dowloadModalRef', this);
      this.navigationEventListener = Navigation.events().bindComponent(this);
      setDowloadModalRef(this);

      this.handleConnectionChange();
    });
  }

  handleConnectionChange = () => {
    const resetDownload = async () => {
      const { mediaUrlArr } = this.props;
      const { mediaUrls } = mediaUrlArr;
      const { totalImages } = this.state;

      let downoadedImages = mediaUrls[catelogueTypes.HOME_AND_GARDEN].length + mediaUrls[catelogueTypes.PROFFESSIONAL].length;
      downoadedImages += downoadedImages < totalImages ? 1 : 0;
      this.setState({
        isVisible: false,
        progressPercent: 0,
        progressText: `${downoadedImages} / ${totalImages}`
      });
    };

    // Internet connection change listener
    NetInfo.addEventListener((state) => {
      if (this.isComponentVisible && !state.isConnected) resetDownload(state.isConnected);
    });

    // App state change listener
    // eslint-disable-next-line
    const handleAppStateChange = (nextAppState) => {
      if (
        this.isComponentVisible
        && nextAppState.match(/inactive|background/)
        && Platform.OS === 'ios') {
        resetDownload();
      }
    };
    // AppState.addEventListener('change', handleAppStateChange);
  }

  downloadInit = (props) => {
    const {
      universal,
      mediaUrlArr,
      saveMediaUrl
    } = this.props;
    downloadHandler({
      ...this.props,
      ...props,
      useMobiledata: universal.useMobiledata,
      mediaUrlArr: mediaUrlArr.mediaUrls,
      saveMediaUrl
    });
  }

  showDownloadModal = () => {
    this.setState({ isVisible: true });
  }

  hideModal = () => { this.setState({ isVisible: false }); }

  setLoadingState = (flag) => { this.setState({ inLoadingState: flag }); }

  setMediaUnzipState = (zipArr) => { this.setState({ zipArr }); }

  setTotalImages = (totalImages) => {
    this.setState({
      totalImages
    }, () => {
      this.setupModal(100);
    });
  }

  setupModal = (progressPercent) => {
    this.setState({
      progressPercent
    }, () => {
      this.configureDownloadModal();
    });
  }

  configureDownloadModal = () => {
    const { offlineDownload, mediaUrlArr } = this.props;
    const { mediaUrls } = mediaUrlArr;
    const { totalImages } = this.state;

    let isContentDownloaded = true;
    let totalDbDownloaded = 1;
    let totalDbDownloading = 0;

    const hgDbArr = offlineDownload.home_and_garden_db.split('|');
    const proDbArr = offlineDownload.proffesional_db.split('|');

    if (
      (
        offlineDownload.home_and_garden !== downloadingFlags.NONE
        && !hgDbArr.includes(Config.HOME_AND_GARDEN_DATABASE)
      ) || (
        offlineDownload.proffesional !== downloadingFlags.NONE
        && !proDbArr.includes(Config.PROFESSIONAL_DATABASE)
      ) || (
        !proDbArr.includes(Config.COMMON_DATABASE)
        && !hgDbArr.includes(Config.COMMON_DATABASE)
      )
    ) {
      isContentDownloaded = false;
    }

    totalDbDownloaded += proDbArr.includes(Config.COMMON_DATABASE) || hgDbArr.includes(Config.COMMON_DATABASE) ? 1 : 0;
    totalDbDownloaded += hgDbArr.includes(Config.HOME_AND_GARDEN_DATABASE) ? 1 : 0;
    totalDbDownloaded += proDbArr.includes(Config.PROFESSIONAL_DATABASE) ? 1 : 0;

    totalDbDownloading = offlineDownload.home_and_garden === downloadingFlags.NONE
      || offlineDownload.proffesional === downloadingFlags.NONE ? 2 : 3;

    totalDbDownloaded = totalDbDownloaded > totalDbDownloading ? totalDbDownloading : totalDbDownloaded;


    let downoadedImages = mediaUrls[catelogueTypes.HOME_AND_GARDEN].length + mediaUrls[catelogueTypes.PROFFESSIONAL].length;

    let isMediaDownloaded = true;
    if (
      (
        offlineDownload.home_and_garden_media_flag !== downloadingFlags.NONE
        && offlineDownload.home_and_garden_media_flag === downloadingFlags.DOWNLOADING
      ) || (
        offlineDownload.proffesional_media_flag !== downloadingFlags.NONE
        && offlineDownload.proffesional_media_flag === downloadingFlags.DOWNLOADING
      )
    ) {
      if (downoadedImages !== totalImages) {
        isMediaDownloaded = false;
      }
    }

    downoadedImages += downoadedImages < totalImages ? 1 : 0;

    this.setState({
      isContentDownloaded,
      isMediaDownloaded,
      progressText: !isContentDownloaded ? `${totalDbDownloaded} / ${totalDbDownloading}` : `${downoadedImages} / ${totalImages}`
    });
  }

  stopDownload = () => {
    this.setState({ isVisible: false });
    globals.SET_APP_DATA('killOfflineDownload', true);
    globals.SET_APP_DATA('isDownloadingCanceled', true);
    refHandler.toggleDownloadIco();
    refHandler.cancelDbDownload();
    refHandler.cancelMediaDownload();
  }

  componentDidAppear() {
    const { setDowloadModalRef } = this.props;
    setDowloadModalRef(this);
    globals.SET_APP_DATA('dowloadModalRef', this);
    const totalMediaCount = globals.GET_APP_DATA('totalMediaCount');
    this.setState({
      totalImages: totalMediaCount
    });
    this.isComponentVisible = true;
    refHandler.setUnziping();
  }

  componentDidDisappear() {
    this.isComponentVisible = false;
  }

  renderFooter = (translations) => (
    <View style={styles.footer}>
      <Button
        onPress={() => this.stopDownload()}
        text={tr(translations, 'stop', 'Stop', textCasing.U)}
        theme="gray"
      />
      <Button
        onPress={() => { this.hideModal(); }}
        text={tr(translations, 'ok', 'OK', textCasing.U)}
        theme="app"
        style={{ marginLeft: 20 }}
      />
    </View>
  );

  renderCloseIcon = () => (
    <View style={styles.closeWrap}>
      <FontIcon
        type={icons.closeIon[1]}
        icon={icons.closeIon[0]}
        color={colors.text}
        size={20}
        innerWrapStyle={{ padding: 8 }}
        onPress={() => this.hideModal()}
      />
    </View>
  );

  renderProgressBar = () => {
    const { progressPercent, progressText, inLoadingState } = this.state;

    return (
      <View style={{ width: '100%' }}>
        <View style={styles.progressBar}>
          <View style={[styles.progressBarActive, { width: `${progressPercent}%` || 0 }]} />
          {
            inLoadingState || Number.isNaN(progressPercent) || Number.isNaN(parseInt(progressPercent)) ? null : (
              <Text style={styles.progressPercentTxt}>
                {progressPercent ? `${parseInt(progressPercent)}%` : '0%'}
              </Text>
            )
          }
        </View>
        <Text style={styles.progressBarTxt}>{progressText}</Text>
      </View>
    );
  }

  renderDownloadProgressHandler = () => {
    const {
      isContentDownloaded,
      isMediaDownloaded,
      inLoadingState
    } = this.state;
    const { translations } = this.props;

    if (!isContentDownloaded) {
      return (
        <View style={styles.progressBarContent}>
          <View style={styles.progressCompleteWrap}>
            <ActivityIndicator size="small" color={colors.text} />
            <Text style={styles.downloadingLblTxt}>{tr(translations, 'content', 'Content')}</Text>
          </View>
          {this.renderProgressBar()}
        </View>
      );
    }

    if (!isMediaDownloaded) {
      return (
        <View style={styles.progressBarContent}>
          <View style={styles.progressCompleteWrap}>
            <FontIcon
              type={icons.checkcircle[1]}
              icon={icons.checkcircle[0]}
              color={colors.green}
              size={25}
            />
            <Text style={styles.downloadingLblTxt}>{tr(translations, 'content', 'Content')}</Text>
          </View>
          <View style={styles.progressCompleteWrap}>
            <ActivityIndicator size="small" color={colors.text} />
            <Text style={styles.downloadingLblTxt}>{tr(translations, 'media', 'Media')}</Text>
          </View>
          {inLoadingState ? null : this.renderProgressBar()}
          {this.renderMediaUnzipProgress()}
        </View>
      );
    }

    if (isMediaDownloaded) {
      return (
        <View style={styles.progressBarContent}>
          <View style={styles.progressCompleteWrap}>
            <FontIcon
              type={icons.checkcircle[1]}
              icon={icons.checkcircle[0]}
              color={colors.green}
              size={25}
            />
            <Text style={styles.downloadingLblTxt}>{tr(translations, 'content', 'Content')}</Text>
          </View>
          <View style={styles.progressCompleteWrap}>
            <FontIcon
              type={icons.checkcircle[1]}
              icon={icons.checkcircle[0]}
              color={colors.green}
              size={25}
            />
            <Text style={styles.downloadingLblTxt}>{tr(translations, 'media', 'Media')}</Text>
          </View>
          {this.renderMediaUnzipProgress()}
        </View>
      );
    }

    return <View />;
  }

  renderMediaUnzipProgress = () => {
    const { zipArr } = this.state;
    const { translations } = this.props;

    const arr = zipArr.map((item) => {
      const key = helpers.strToKey(item);
      return (
        <View
          style={styles.progressCompleteWrap}
          key={key}
        >
          <ActivityIndicator size="small" color={colors.text} />
          <Text style={styles.downloadingLblTxt}>
            {`${tr(translations, 'extracting', 'Extracting')} ${item}`}
          </Text>
        </View>
      );
    });

    return arr;
  }

  render() {
    const { isVisible, isMounted } = this.state;
    const { translations } = this.props;

    if (!isMounted) return null;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={() => { }}
      >
        <View style={styles.wrap}>
          <View style={styles.wrapInner}>
            {this.renderCloseIcon()}
            <Text style={styles.header}>{tr(translations, 'download_starts_now', 'DOWNLOAD STARTS NOW', textCasing.U)}</Text>
            <View style={styles.content}>
              {this.renderDownloadProgressHandler()}
            </View>
            {this.renderFooter(translations)}
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  offlineDownload: state.offlineDownload,
  universal: state.universal,
  translations: state.translations.arr,
  mediaUrlArr: state.mediaUrlArr
});

const mapDispatchToProps = (dispatch) => ({
  getOfflineDownload: () => getOfflineDownload(dispatch),
  saveOfflineDownload: (offlineObj) => saveOfflineDownload(dispatch, offlineObj),
  saveMediaUrl: (mediaUrls, type) => mediaUrlPersist(dispatch, mediaUrls, type)
});

const DownloadModalRedux = connect(mapStateToProps, mapDispatchToProps)(DownloadModal);
export default DownloadModalRedux;
