/**
 * @fileoverview This component renders design template
 * for headline text image manual content.
 * @package
 */
import React, { Component } from 'react';
import {
  View,
  FlatList,
  Animated,
  ActivityIndicator
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import Onboarding from '../../onBoarding';
import { rootNavigation } from '../../../../navigation';
import {
  icons,
  colors,
  appConstants,
  appContexts,
  tr,
  globals,
  appStyles,
  helpers,
  manualContentPdf,
  productListPdf
} from '../../../../config';
import { Button, FontIcon, HtmlParser } from '../../generic';
import styles from './styles';
import { productGroupListPdf } from '../../../../config/createPdf';

const { PageContentContext } = appContexts;
const {
  layouts,
  favouriteTypes,
  textCasing,
  onBoardingSteps
} = appConstants;

class HeadlineText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      descAnimate: new Animated.Value(0),
      exportLoading: false
    };
  }

  componentDidMount() {
    const { setRibbonRef } = this.props;

    if (setRibbonRef) setRibbonRef(this);
    const { componentId } = this.context || { componentId: '' };
    this.setState({
      isMounted: true
    });
    this.navigationEventListener = Navigation.events().bindComponent(this, componentId);
  }

  hideDesc = () => {
    const { descAnimate } = this.state;
    Animated.timing(descAnimate, {
      toValue: 1,
      duration: 400,
    }).start();
  }

  showDesc = () => {
    const { descAnimate } = this.state;
    Animated.timing(descAnimate, {
      toValue: 0,
      duration: 400,
    }).start();
  }

  navigate = (pageId) => {
    const { componentId } = this.context;
    Navigation.push(
      componentId,
      rootNavigation.pageContent({
        passProps: { pageId }
      })
    );
  }

  toggleFavourite = () => { }

  addToFavourite = (title) => {
    const { getFavouriteModalRef, pageId } = this.context;
    const { favType } = this.props;
    const favouriteModalRef = getFavouriteModalRef();
    const obj = {
      title,
      pageId: parseInt(pageId),
      type: favType || favouriteTypes.MANUAL_CONTENT
    };
    favouriteModalRef.showFavouriteModal(obj, this.toggleFavourite);
  }

  deleteToFavourite = () => {
    const { getFavouriteModalRef, pageId } = this.context;
    const favouriteModalRef = getFavouriteModalRef();
    favouriteModalRef.deleteFavouriteModal(parseInt(pageId), this.toggleFavourite);
  }

  exportPdf = (headline, description) => {
    const {
      pageId,
      pageData,
      structureData
    } = this.context;
    const {
      favType, productListArr, productGroupListArr, subProductGroupList
    } = this.props;

    this.setState({
      exportLoading: true
    }, async () => {
      if (favType === favouriteTypes.PRODUCT_LIST) {
        await productListPdf({
          productListArr,
          headline,
          description
        }, pageId, structureData);
      } else if (favType === favouriteTypes.PRODUCT_GROUP_LIST) {
        await productGroupListPdf({
          productGroupListArr,
          headline,
          description,
          subProductGroupList
        }, pageId, structureData);
      } else {
        await manualContentPdf(pageData[pageId].obj.content, structureData, pageId);
      }
      this.setState({ exportLoading: false });
    });
  };

  moreInfoButton = () => {
    const { translations, pageId, universal } = this.context;
    const { layoutData } = this.props;

    if (!layoutData.ribbonButtonTarget) return null;
    return (
      <View style={styles.btnWrap}>
        <View
          style={{ alignSelf: 'flex-end' }}
          ref={(ref) => { this.moreInfoBtnRef = ref; }}
          removeClippedSubviews={false}
        >
          <Button
            text={tr(translations, 'more_information', 'MORE INFORMATION', textCasing.U)}
            theme="dark"
            onPress={() => { this.navigate(layoutData.ribbonButtonTarget); }}
            transparent={
              universal.onboardingIds
              && universal.onboardingIds.productGroupId === pageId
              && universal.viewedOnboardingStep === 6
              && !universal.onboardingSkiped
            }
          />
        </View>
      </View>
    );
  }

  renderExportIco = (headline, description) => {
    const { exportLoading } = this.state;
    if (exportLoading) {
      return (
        <View style={styles.exportIco}>
          <ActivityIndicator size="small" color={colors.secondaryColor} />
        </View>
      );
    }
    return (
      <FontIcon
        type={icons.save_line[1]}
        icon={icons.save_line[0]}
        color={colors.black}
        size={16}
        wrapStyle={styles.exportIco}
        onPress={() => { this.exportPdf(headline, description); }}
      />
    );
  }

  renderItem = ({ item, index }) => {
    const { pageId } = this.context || { pageId: 100 };
    // let { favourite } = this.context || { favourite: { favouriteContent: [] } };
    const { descAnimate } = this.state;
    const { layoutData, isExport } = this.props;

    const headlineStyle = item.headlinetype ? { ...appStyles[item.headlinetype] } : {};

    // if (!favourite) favourite = { favouriteContent: [] };

    // let isFavourite = false;
    // favourite.favouriteContent.map((item) => {
    //   if (item.pageId === parseInt(pageId)) {
    //     isFavourite = true;
    //   }
    //   return null;
    // });

    const headingKey = helpers.strToKey(item.headline);
    const descKey = helpers.strToKey(item.text);

    const translateAnim = descAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -350],
    });
    return (
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <View style={{ flex: 1 }}>
            {
              item.headline ? (
                <HtmlParser
                  html={layoutData.layout !== layouts.HEADLINE_TEXT ? item.headline.toUpperCase() : item.headline}
                  textKey={`headlineText-heading-${pageId}-${index}-${headingKey}`}
                  style={[styles.heading, headlineStyle]}
                />
              ) : null
            }
          </View>
          <View style={styles.headRightContent}>
            {
              layoutData.layout === layouts.HEADLINE_TEXT ? null : (
                <FontIcon
                  type={icons.feedback_line[1]} // isFavourite ? icons.feedback_filled[1] : icons.feedback_line[1]
                  icon={icons.feedback_line[0]}
                  color={colors.black}
                  size={16}
                  wrapStyle={styles.favIco}
                  onPress={() => {
                    this.addToFavourite(item.headline);
                  }}
                />
              )
            }
            {!isExport ? null : this.renderExportIco(item.headline, item.text)}
          </View>
        </View>
        {
          item.text
            ? (
              <View style={styles.content}>
                <Animated.View style={[styles.descriptionWrap, { marginTop: translateAnim }]}>
                  <HtmlParser
                    html={item.text}
                    textKey={`headlineText-desc-${pageId}-${index}-${descKey}`}
                    style={styles.contentTxt}
                  />
                </Animated.View>
                {this.moreInfoButton()}
              </View>
            ) : null
        }
      </View>
    );
  }

  renderOnboarding = () => {
    const { isMounted } = this.state;
    const {
      universal,
      pageId,
      translations
    } = this.context || { universal: {}, pageId: null, translations: [] };

    if (!isMounted || !this.moreInfoBtnRef) return null;

    if (
      universal.onboardingIds
      && universal.onboardingIds.productGroupId === pageId
      && universal.viewedOnboardingStep === 6
      && !universal.onboardingSkiped
    ) {
      return (
        <Onboarding
          stepName={onBoardingSteps.MORE_INFORMATION_RIBBON}
          nextCb={() => { this.onboardingNextCb(7); }}
          backCb={() => { this.onboardingBackCb(5); }}
          skipCb={() => { this.onboardingSkipCb(7); }}
          step={6}
          fromRef={this.moreInfoBtnRef}
          translations={translations}
        />
      );
    }
    return null;
  }

  onboardingNextCb = (step) => {
    const { componentId, saveUniversalData, universal } = this.context;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingPlay: universal.onboardingPlay
    });
    if (step === 7) {
      const { onboardingIds } = universal;

      const highligherRef = globals.GET_APP_DATA('highligherRef');
      highligherRef.hide();

      Navigation.push(
        componentId,
        rootNavigation.pageContent({
          passProps: { pageId: onboardingIds.productId }
        })
      );
    }
  }

  onboardingBackCb = (step) => {
    const { saveUniversalData, universal, componentId } = this.context;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingPlay: universal.onboardingPlay
    });
    Navigation.pop(componentId);
  }

  onboardingSkipCb = (step) => {
    const { saveUniversalData } = this.context;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingSkiped: true
    });
  }

  componentDidAppear() {
    const { isMounted } = this.state;
    const {
      universal,
      pageId
    } = this.context || { universal: {}, pageId: null, translations: [] };

    if (!isMounted || !this.moreInfoBtnRef) return null;

    if (
      universal.onboardingIds
      && universal.onboardingIds.productGroupId === pageId
      && universal.viewedOnboardingStep === 6
      && !universal.onboardingSkiped
    ) {
      const highligherRef = globals.GET_APP_DATA('highligherRef');
      highligherRef.show(this.moreInfoBtnRef, onBoardingSteps.MORE_INFORMATION_RIBBON);
    }
    return null;
  }

  render() {
    const { layoutData } = this.props;
    const content = layoutData.values;

    const wrapStyle = layoutData.layout === layouts.HEADLINE_TEXT ? styles.headerTextWrap : styles.ribbonWrap;

    return (
      <View style={wrapStyle}>
        <FlatList
          extraData={this.state}
          data={content}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}_headlineText`}
          scrollEnabled={false}
        />
        {this.renderOnboarding()}
      </View>
    );
  }
}

HeadlineText.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired,
  favType: PropTypes.string,
  setRibbonRef: PropTypes.func,
  isExport: PropTypes.bool
};

HeadlineText.defaultProps = {
  favType: undefined,
  setRibbonRef: undefined,
  isExport: false
};

HeadlineText.contextType = PageContentContext;
export default HeadlineText;
