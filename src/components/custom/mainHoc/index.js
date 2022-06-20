/**
 * @fileoverview This is app's main higher order component.
 * All the screen components in app uses this component
 * @package
 */
import React from 'react';
import {
  View,
  Text,
  Modal,
  BackHandler,
  StatusBar,
  ScrollView,
  Animated
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { rootNavigation } from '../../../navigation';
import { TouchableDebounce } from '../elements';
import { FontIcon } from '../generic';
import styles from './styles';
import Header from './header';
import BreadCrumb from './breadcrumb';
import FavouriteModal from './favouriteModal';
import ProductCompareModal from './productCompareModal';
import MarkingModal from './markingModal';
import DownloadModal from './downloadModal';
import OnBoardingHighlighter from './onBoardingHighlighter';
import Loading from '../generic/loading';
import LoadingModal from '../generic/loadingModal';
import {
  colors,
  appContexts,
  appStyles,
  globals,
  helpers,
  icons,
  appConstants
} from '../../../config';
import ReactNativeZoomableView from '../generic/zoomableView/ReactNativeZoomableView';
import FullImageModal from './FullImageModal';

// const Analytics = firebase.analytics();

const { MainHocContext } = appContexts;
const { alertTypes } = appConstants;

const alertStyle = {
  [alertTypes.SUCCESS]: styles.successAlert,
  [alertTypes.WARNING]: styles.warningAlert,
  [alertTypes.ERROR]: styles.errorAlert,
};

export default (data) => (WrappedComponent) => {
  class MainLayoutHoc extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        screen: data.screen || false,
        pageLoading: data.pageLoading || false,
        pageRendered: false,
        showHeader: false,
        isLoadingModal: false,
        showTooltip: false,
        suggestionsArr: [],
        suggesstionY: 0,
        suggesstionX: 0,
        suggesstionWidth: 100,
        renderHeaderOverlay: false,
        alertData: {
          show: false,
          type: alertTypes.ERROR,
          heading: 'Error',
          msg: 'Sorry, Some error occured!'
        },

        scrollSearchIndicator: new Animated.Value(0),
        scrollWholeHeight: 1,
        scrollVisibleHeight: 0,
        showFullImage: false,
        fullImageuri: null
      };
      this.popStackOnUnmont = true;
      this.favouriteModalRef = null;
      this.compareModalRef = null;
      this.markingModalRef = null;
      this.dowloadModalRef = null;
      this.isResetSuggessions = false;
      this.resetInnerSearchFunc = () => { };

      const oldRender = Text.render;
      Text.render = (...args) => {
        const origin = oldRender.call(this, ...args);
        return React.cloneElement(origin, {
          style: [appStyles.defaultText, origin.props.style]
        });
      };
    }

    componentDidMount() {
      // const activeNavStack = globals.GET_APP_DATA('activeNavStack');
      // const activeComponent = activeNavStack[activeNavStack.length - 1];
      // Analytics.setAnalyticsCollectionEnabled(true);
      // Analytics.setUserProperty('Active Screen', activeComponent);
      // Analytics.setCurrentScreen(activeComponent, activeComponent);
      // Analytics.setCurrentScreen(data.screen);

      const { checkParent } = this.props;
      globals.SET_APP_DATA('checkParent', checkParent || false);
      globals.SET_APP_DATA('alertRef', this.setupAlert);
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      this.navigationEventListener = Navigation.events().bindComponent(this);

      this.setState({
        pageRendered: true,
        showHeader: true
      });
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => { }

    hidePageLoading = () => this.setState({ pageLoading: false });

    toggleLoader = (flag, cb) => {
      this.setState({
        isLoadingModal: flag
      }, () => {
        if (cb) {
          setTimeout(() => {
            cb();
          }, 250);
        }
      });
    }

    goBack = () => {
      const { componentId } = this.props;
      Navigation.pop(componentId);
    }

    goBackTo = (item) => {
      const { componentId } = this.props;
      Navigation.push(
        componentId,
        rootNavigation.pageContent({
          passProps: { pageId: item.id }
        })
      );
    }

    setFavouriteModalRef = (ref) => {
      this.favouriteModalRef = ref;
    }

    getFavouriteModalRef = () => this.favouriteModalRef;

    setCompareModalRef = (ref) => {
      this.compareModalRef = ref;
    }

    getCompareModalRef = () => this.compareModalRef;

    setMarkingModal = (ref) => {
      this.markingModalRef = ref;
    }

    getDowloadModalRef = () => this.dowloadModalRef;

    setDowloadModalRef = (ref) => {
      this.dowloadModalRef = ref;
    }

    getMarkingModalRef = () => this.markingModalRef;

    renderLoadingModal = () => {
      const { pageLoading } = this.state;
      return (
        <Modal
          transparent={false}
          visible={pageLoading}
          onRequestClose={() => { }}
        >
          <Loading />
        </Modal>
      );
    }

    renderHeader = () => {
      const { showHeader } = this.state;
      const { pageId, componentId, searchText } = this.props;

      if (!showHeader) return null;

      return (
        <Header
          screen={data.screen}
          pageId={pageId}
          setHeaderRef={this.setHeaderRef}
          getDowloadModalRef={this.getDowloadModalRef}
          componentId={componentId}
          searchText={searchText}
          toggleLoader={this.toggleLoader}
        />
      );
    }

    renderScreen = () => (
      <View style={styles.content}>
        <WrappedComponent
          {...this.props}
          hidePageLoading={this.hidePageLoading}
          getFavouriteModalRef={this.getFavouriteModalRef}
          getCompareModalRef={this.getCompareModalRef}
          getMarkingModalRef={this.getMarkingModalRef}
          getDowloadModalRef={this.getDowloadModalRef}
          toggleLoader={this.toggleLoader}
          setupAlert={this.setupAlert}
          showHeaderOverlay={this.showHeaderOverlay}
          resetHeaderOverlay={this.resetHeaderOverlay}
          setupInnerSearch={this.setupInnerSearch}
        />
      </View>
    );

    setupSuggesstions = (suggestionsArr, x, y, width, height) => {
      this.setState({
        suggestionsArr,
        showTooltip: true,
        suggesstionY: y + height + 2,
        suggesstionX: x,
        suggesstionWidth: width
      });
    }

    resetSuggessions = () => {
      this.isResetSuggessions = true;
      this.setState({
        suggestionsArr: [],
        showTooltip: false
      });
    }

    setupSuggessionsFlag = (flag) => {
      this.isResetSuggessions = flag;
    }

    toggleFullImageVisiblity = (showFullImage, fullImageuri = null) => {
      this.setState({ showFullImage, fullImageuri });
    }

    resetSuggessions = () => {
      this.setState({
        suggestionsArr: [],
        showTooltip: false
      });
    }

    renderSuggesstion = () => {
      const {
        showTooltip,
        suggestionsArr,
        suggesstionY,
        suggesstionX,
        suggesstionWidth,

        scrollVisibleHeight,
        scrollWholeHeight,
        scrollSearchIndicator
      } = this.state;
      const { componentId } = this.props;

      const indicatorSize = scrollWholeHeight > scrollVisibleHeight
      // eslint-disable-next-line
        ? scrollVisibleHeight * scrollVisibleHeight / scrollWholeHeight
        : scrollVisibleHeight;

      const difference = scrollVisibleHeight > indicatorSize ? scrollVisibleHeight - indicatorSize : 1;

      if (!showTooltip) return null;
      if (this.isResetSuggessions) return null;

      const arr = suggestionsArr.slice(0, 10);
      return (
        <TouchableDebounce
          style={[styles.suggesstionWrap]}
          onPress={() => { this.resetSuggessions(); }}
        >
          <View style={[
            styles.suggesstionWrapInner,
            {
              left: suggesstionX,
              width: suggesstionWidth,
              marginTop: suggesstionY
            }
          ]}
          >
            <ScrollView
              style={{}}
              contentContainerStyle={{}}

              showsVerticalScrollIndicator={false}
              onContentSizeChange={(width, height) => {
                this.setState({ scrollWholeHeight: height });
              }}
              onLayout={({
                nativeEvent: {
                  layout: {
                    height // x, y, width,
                  }
                }
              }) => this.setState({ scrollVisibleHeight: height })}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollSearchIndicator } } }]
              )}
            >
              {
                arr.map((item) => (
                  <TouchableDebounce
                    onPress={() => {
                      this.setState({
                        showTooltip: false,
                        suggestionsArr: []
                      }, () => {
                        // const headerRef = globals.GET_APP_DATA('headerRef');
                        // headerRef.setSearchText(item._source.name);
                        Navigation.push(
                          componentId,
                          rootNavigation.pageContent({
                            passProps: {
                              pageId: item._source.id,
                              checkParent: true
                            }
                          })
                        );
                      });
                    }}
                    style={styles.tooltipItem}
                    key={`suggessionTooltip-${item._source.id}`}
                  >
                    <Text style={styles.tooltipTxt}>{item._source.name}</Text>
                  </TouchableDebounce>
                ))
              }
            </ScrollView>
            <Animated.View
              style={[
                {
                  width: 4,
                  backgroundColor: '#61616182',
                  position: 'absolute',
                  right: 0,
                  top: 0
                }, {
                  height: indicatorSize,
                  transform: [{
                    translateY: Animated.multiply(scrollSearchIndicator, scrollVisibleHeight / scrollWholeHeight).interpolate({
                      inputRange: [0, difference],
                      outputRange: [0, difference],
                      extrapolate: 'clamp'
                    })
                  }]
                }]}
            />
          </View>

        </TouchableDebounce>
      );
    }

    resetHeaderOverlay = () => {
      this.setState({ renderHeaderOverlay: false }, () => {
        this.resetInnerSearchFunc();
      });
    }

    showHeaderOverlay = () => {
      this.setState({ renderHeaderOverlay: true });
    }

    setupInnerSearch = (func) => {
      this.resetInnerSearchFunc = func;
    }

    setupAlert = (Data) => {
      const { alertData } = this.state;
      this.setState({
        alertData: {
          ...alertData,
          ...Data,
          show: true
        }
      }, async () => {
        await helpers.manualDelay(5000);
        this.setState({
          alertData: {
            // eslint-disable-next-line react/destructuring-assignment, react/no-access-state-in-setstate
            ...this.state.alertData,
            show: false
          }
        });
      });
    }

    hideAlert = () => {
      const { alertData } = this.state;
      this.setState({
        alertData: {
          ...alertData,
          show: false
        }
      });
    }

    renderAlert = () => {
      const { alertData } = this.state;
      const {
        show,
        type,
        heading,
        msg
      } = alertData;

      if (!show) return null;

      return (
        <View style={alertStyle[type]}>
          <View style={styles.alertHeadWrap}>
            <Text style={styles.alertHeadText}>{heading}</Text>
            <FontIcon
              type={icons.closeIon[1]}
              icon={icons.closeIon[0]}
              size={22}
              color={colors.text}
              onPress={() => { this.hideAlert(); }}
            />
          </View>
          <Text style={styles.alertContentText}>{msg}</Text>
        </View>
      );
    }

    componentDidAppear() {
      const { componentId } = this.props;
      globals.SET_APP_DATA('pageLoaderRef', this.toggleLoader);
      globals.SET_APP_DATA('activeComponentId', componentId);
      globals.SET_APP_DATA('alertRef', this.setupAlert);
      const catalogueSwitch = globals.GET_APP_DATA('catalogueSwitch');
      if (!helpers.isEmptyObject(catalogueSwitch)) {
        globals.SET_APP_DATA('catalogueSwitch', {});
        Navigation.push(
          componentId,
          rootNavigation.pageContent(catalogueSwitch)
        );
      }
    }

    render() {
      const {
        pageRendered,
        screen,
        isLoadingModal,
        renderHeaderOverlay,
        showFullImage,
        fullImageuri
      } = this.state;
      const { componentId, pageId, startscreen } = this.props;
      return (
        <ReactNativeZoomableView
          zoomEnabled
          maxZoom={1.5}
          minZoom={1}
          zoomStep={0.25}
          initialZoom={1}
          bindToBorders
          onZoomAfter={() => {}}
        >
          <MainHocContext.Provider
            value={{
              componentId,
              goBack: this.goBack,
              goBackTo: this.goBackTo,
              pageId,
              screen,
              setupSuggesstions: this.setupSuggesstions,
              resetSuggessions: this.resetSuggessions,
              setupSuggessionsFlag: this.setupSuggessionsFlag,
              toggleFullImageVisiblity: this.toggleFullImageVisiblity,
              startscreen
            }}
          >
            <View style={styles.statusbar}>
              <StatusBar
                barStyle="light-content"
                backgroundColor={colors.black}
              />
            </View>
            <View style={styles.wrap}>
              <View>
                {this.renderHeader()}
                {
                  data.breadCrumb
                    ? <BreadCrumb />
                    : null
                }
                {renderHeaderOverlay ? (
                  <TouchableDebounce
                    onPress={() => { this.resetHeaderOverlay(); }}
                    style={styles.innerSearchOverlay}
                  />
                ) : null}
              </View>
              {pageRendered ? this.renderScreen() : null}
              {this.renderLoadingModal()}
            </View>
            {this.renderSuggesstion()}
            {this.renderAlert()}
            <FavouriteModal setFavouriteModalRef={this.setFavouriteModalRef} />
            <ProductCompareModal setCompareModalRef={this.setCompareModalRef} />
            <MarkingModal setMarkingModal={this.setMarkingModal} />
            <DownloadModal setDowloadModalRef={this.setDowloadModalRef} componentId={componentId} />
            <OnBoardingHighlighter componentId={componentId} />
            <LoadingModal visible={isLoadingModal} />
            <FullImageModal isVisible={showFullImage} toggleVisiblity={this.toggleFullImageVisiblity} imageUri={fullImageuri} />
          </MainHocContext.Provider>
        </ReactNativeZoomableView>
      );
    }
  }

  return MainLayoutHoc;
};
