import React, { Component } from 'react';
import {
  View,
  Animated
} from 'react-native';
import { FontIcon, HtmlParser } from '../../generic';
import {
  icons,
  colors,
  appContexts,
  appConstants,
  tr,
  globals, helpers
} from '../../../../config';
import APP_STRINGS from '../../../../assets/data/appStrings';
import styles from './styles';

const { PageContentContext } = appContexts;
const { favouriteTypes, navDirection, PAST_PRODUCT } = appConstants;
const { LEFT_NAV, RIGHT_NAV } = navDirection;

const { product_warning_str } = APP_STRINGS;

class Ribbon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descAnimate: new Animated.Value(0)
    };
    this.activeAnchor = null;
  }

  componentDidMount() {
    const { setRibbonRef, productDetailsObj } = this.props;
    setRibbonRef(this);
    if (productDetailsObj.productType && productDetailsObj.productType === PAST_PRODUCT) {
      const breadCrumbRef = globals.GET_APP_DATA('breadCrumbRef');
      breadCrumbRef.setBackBtn();
    }
  }

  setActiveAnchor = (item) => {
    this.activeAnchor = item;
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

  renderNav = (direction) => {
    const { isFirstProduct, isLastProduct, onTabSwipe } = this.props;
    const iconStyle = (direction === LEFT_NAV && isFirstProduct)
      || (direction === RIGHT_NAV && isLastProduct)
      ? { display: 'none' } : {};
    return (
      <View style={[styles.navControl, styles[direction]]}>
        <FontIcon
          type={direction === LEFT_NAV ? icons.arrowBack[1] : icons.arrowForward[1]}
          icon={direction === LEFT_NAV ? icons.arrowBack[0] : icons.arrowForward[0]}
          color={colors.black}
          size={20}
          wrapStyle={[styles.navIcon, iconStyle]}
          onPress={() => onTabSwipe(direction)}
        />
      </View>
    );
  };

  toggleFavourite = () => { }

  addToFavourite = () => {
    const { productDetailsObj } = this.props;
    const { getFavouriteModalRef } = this.context;
    helpers.analyticsAction({ actionType: 'product_details', actionObj: { 'a.action': 'add_to_favorites' } });
    const favouriteModalRef = getFavouriteModalRef();
    const obj = {
      title: productDetailsObj.name,
      pageId: productDetailsObj.id,
      type: favouriteTypes.PRODUCT_DETAILS
    };
    favouriteModalRef.showFavouriteModal(obj, this.toggleFavourite);
  }

  deleteToFavourite = () => {
    const { productDetailsObj } = this.props;
    const { getFavouriteModalRef } = this.context;
    const favouriteModalRef = getFavouriteModalRef();
    favouriteModalRef.deleteFavouriteModal(productDetailsObj.id, this.toggleFavourite);
  }

  renderDescription = () => {
    const { descAnimate } = this.state;
    const { layoutData, productDetailsObj } = this.props;
    const { pageId, translations } = this.context;

    const translateAnim = descAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -150],
    });
    if (productDetailsObj.productType && productDetailsObj.productType === PAST_PRODUCT) {
      return (
        <View style={styles.descWarningWrap}>
          <FontIcon
            type={icons.exclamation_sign[1]}
            icon={icons.exclamation_sign[0]}
            color={colors.black}
            size={35}
          />
          <HtmlParser
            html={tr(translations, 'product_not_available_warning', product_warning_str)}
            textKey={`prodD-ribbon-description-${pageId}`}
            style={styles.descWarning}
          />
        </View>
      );
    }
    if (!layoutData.description) return null;
    return (
      <View style={styles.descriptionWrap}>
        <Animated.View style={[{ marginTop: translateAnim }]}>
          <HtmlParser
            html={layoutData.description}
            textKey={`prodD-ribbon-description-${pageId}`}
            style={styles.description}
          />
        </Animated.View>
      </View>
    );
  }

  render() {
    const { layoutData, productDetailsObj } = this.props;
    const { pageId } = this.context; // favourite

    // let isFavourite = false;
    // favourite.favouriteContent.map((item) => {
    //   if (item.pageId === productDetailsObj.id) {
    //     isFavourite = true;
    //   }
    //   return null;
    // });

    return (
      <View style={[styles.wrap]}>
        {this.renderNav(LEFT_NAV)}
        <View style={styles.contentWrap}>
          <View style={styles.headWrap}>
            <HtmlParser
              html={layoutData.name.toLocaleUpperCase()}
              textKey={`prodD-ribbon-head-${pageId}`}
              style={styles.heading}
            />
            {
              productDetailsObj.productType && productDetailsObj.productType === PAST_PRODUCT ? null : (
                <FontIcon
                  type={icons.feedback_line[1]} // isFavourite ? icons.feedback_filled[1] : icons.feedback_line[1]
                  icon={icons.feedback_line[0]}
                  color={colors.black}
                  size={16}
                  wrapStyle={styles.settingIco}
                  onPress={() => {
                    this.addToFavourite();
                  }}
                />
              )
            }
          </View>
          {this.renderDescription()}
        </View>
        {this.renderNav(RIGHT_NAV)}
      </View>
    );
  }
}

Ribbon.contextType = PageContentContext;
export default Ribbon;
