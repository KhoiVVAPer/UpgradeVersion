import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  icons, colors, appContexts, tr, appConstants
} from '../../../../config';
import { FontIcon, HtmlParser } from '../../generic';
import OnBoarding from '../../onBoarding';
import styles from './styles';

const { onBoardingSteps, textCasing, PAST_PRODUCT } = appConstants;
const { PageContentContext } = appContexts;

class RightSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullDesc: false,
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    });
  }

  renderPricing = () => {
    const { productDetailsObj } = this.props;
    const { pageId, translations } = this.context;
    const { partnumberFormatted, priceFormatted } = productDetailsObj;

    const isPastProduct = productDetailsObj.productType && productDetailsObj.productType === PAST_PRODUCT;
    const priceRemark = tr(translations, 'price_remark', '*recommended retail price. Prices by the dealer may vary.');

    let preconfigurationValue = null;
    if (partnumberFormatted && partnumberFormatted.length > 11) {
      preconfigurationValue = partnumberFormatted.substring(0, 11);
    }

    return (
      <View>
        <View style={styles.orderNumberWrap}>
          <View
            style={styles.pricingItem}
            ref={(ref) => { this.orderNoRef = ref; }}
            removeClippedSubviews={false}
          >
            <HtmlParser
              html={`${tr(translations, 'order_number', 'Order number')}: ${preconfigurationValue || partnumberFormatted}`}
              textKey={`prodD-techdata-partnumberFormatted-${pageId}`}
              style={styles.pricingWrapTxt}
            />
          </View>
        </View>
        {/* {
          preconfigurationValue
            ? (
              <View style={styles.preconfigurationWrap}>
                <View
                  style={styles.pricingItem}
                  ref={(ref) => { this.orderNoRef = ref; }}
                  removeClippedSubviews={false}
                >
                  <HtmlParser
                    html={`${tr(translations, 'preconfiguration', 'Preconfiguration')}: ${partnumberFormatted}`}
                    textKey={`prodD-techdata-partnumberFormatted-${pageId}`}
                    style={[styles.pricingWrapTxt, { width: '100%' }]}
                  />
                </View>
              </View>
            ) : null
        } */}
        {
          !priceFormatted || isPastProduct
            ? null
            : (
              <View style={styles.pricingWrap}>
                <View style={[styles.pricingItem, { flex: 1 }]}>
                  <HtmlParser
                    html={`${tr(translations, 'price_in', 'Price in')}: ${priceFormatted}`}
                    textKey={`prodD-techdata-priceFormatted-${pageId}`}
                    style={[styles.pricingWrapTxt, { width: '100%' }]}
                    wrapStyle={{ width: '100%' }}
                  />
                  <HtmlParser
                    html={priceRemark}
                    textKey={`prodD-techdata-priceFormatted-remarker-${pageId}`}
                    style={[styles.priceRemarkTxt, { width: '100%' }]}
                    wrapStyle={{ width: '100%' }}
                  />
                </View>
              </View>
            )
        }
      </View>
    );
  }

  renderStatWrap = () => {
    const { productDetailsObj } = this.props;
    const { pageId, translations } = this.context;
    const { servicePricesFormatted } = productDetailsObj;

    if (!servicePricesFormatted) return <View />;

    if (!servicePricesFormatted.maintain || !servicePricesFormatted.inspect || !servicePricesFormatted.full) {
      return null;
    }

    return (
      <View style={styles.statWrap}>
        <View style={styles.statView}>
          <FontIcon
            type={icons.service_filled[1]}
            icon={icons.service_filled[0]}
            color={colors.text}
            size={12}
          />
          <HtmlParser
            html={`${tr(translations, 'services', 'Services')}: `}
            textKey={`prodD-techdata-services-${pageId}`}
            style={styles.statTxt}
          />
        </View>
        {
          servicePricesFormatted.inspect
            ? (
              <View style={styles.statView}>
                <HtmlParser
                  html={`${tr(translations, 'service_offer_1', 'Inspect')}: `}
                  textKey={`prodD-techdata-inspect-lbl-${pageId}`}
                  style={styles.statTxt}
                />
                <HtmlParser
                  html={servicePricesFormatted.inspect}
                  textKey={`prodD-techdata-inspect-val-${pageId}`}
                  style={styles.statTxtVal}
                />
              </View>
            )
            : null
        }
        {
          servicePricesFormatted.maintain
            ? (
              <View style={styles.statView}>
                <HtmlParser
                  html={`${tr(translations, 'service_offer_2', 'Maintain')}: `}
                  textKey={`prodD-techdata-maintain-lbl-${pageId}`}
                  style={styles.statTxt}
                />
                <HtmlParser
                  html={servicePricesFormatted.maintain}
                  textKey={`prodD-techdata-maintain-val-${pageId}`}
                  style={styles.statTxtVal}
                />
              </View>
            )
            : null
        }
        {
          servicePricesFormatted.full
            ? (
              <View style={styles.statView}>
                <HtmlParser
                  html={`${tr(translations, 'service_offer_3', 'Full Service')}: `}
                  textKey={`prodD-techdata-full-lbl-${pageId}`}
                  style={styles.statTxt}
                />
                <HtmlParser
                  html={servicePricesFormatted.full}
                  textKey={`prodD-techdata-full-val-${pageId}`}
                  style={styles.statTxtVal}
                />
              </View>
            )
            : null
        }
      </View>
    );
  }

  renderMoredescIcon = () => {
    const { showFullDesc } = this.state;
    return (
      <FontIcon
        type={showFullDesc ? icons.arrow_up[1] : icons.arrow_down[1]}
        icon={showFullDesc ? icons.arrow_up[0] : icons.arrow_down[0]}
        color={colors.text}
        size={10}
        wrapStyle={[styles.showMoreIco, { bottom: showFullDesc ? -30 : -20 }]}
        onPress={() => { this.setState({ showFullDesc: !showFullDesc }); }}
      />
    );
  }

  renderInstructionRequired = () => {
    const { productDetailsObj } = this.props;
    const { pageId, translations } = this.context;
    const { requiresInstruction } = productDetailsObj;
    if (requiresInstruction) {
      return (
        <View style={styles.instructionRequiredWrap}>
          <HtmlParser
            html={`${tr(translations, 'instruction_required', 'This device requires instruction.')}`}
            textKey={`prodD-instruction-required-${pageId}`}
            style={styles.instructionRequiredWrapTxt}
          />
        </View>
      );
    }
    return null;
  }

  renderDescription = () => {
    const { showFullDesc } = this.state;
    const { pageId } = this.context;
    const { productDetailsObj } = this.props;
    let decription = '';
    productDetailsObj.texts.map((item) => {
      if (item.type === 'long') {
        decription = item.value;
      }
      return null;
    });

    if (decription === '') return null;

    decription = showFullDesc ? decription : `${decription.substring(0, 348)} ...`;
    return (
      <View style={styles.descWrap}>
        <HtmlParser
          html={decription}
          textKey={`prodD-techdata-decription-${pageId}`}
          style={styles.descWrapTxt}
        />
        {this.renderMoredescIcon()}
      </View>
    );
  }

  renderTechDataItem = ({ item, index }) => {
    const { pageId } = this.context;
    const darkStyle = index % 2 === 0 ? styles.techItemDark : {};
    let { label } = item;
    if (item.unit) label += ` (${item.unit})`;
    return (
      <View style={[styles.techItem, darkStyle]}>
        <HtmlParser
          html={label}
          textKey={`prodD-techdata-list-label-left-${pageId}-${index}`}
          style={styles.techItemTxt}
        />
        <HtmlParser
          html={item.value}
          textKey={`prodD-techdata-list-label-right-${pageId}-${index}`}
          style={styles.techItemTxt}
        />
      </View>
    );
  }

  renderTechData = () => {
    const { layoutData } = this.props;
    const { pageId, translations } = this.context;

    if (!layoutData.length) return null;
    return (
      <View style={styles.techWrap}>
        <HtmlParser
          html={tr(translations, 'technical_data', 'Technical Data', textCasing.U)}
          textKey={`prodD-techdata-head-${pageId}`}
          style={styles.texhHeading}
        />
        <FlatList
          extraData={this.state}
          data={layoutData}
          renderItem={this.renderTechDataItem}
          keyExtractor={(item, index) => `techData_${index}`}
          scrollEnabled={false}
        />
      </View>
    );
  }

  renderOnboarding = () => {
    const { isMounted } = this.state;
    const { universal, translations } = this.context;
    if (!isMounted) return null;
    if (universal.viewedOnboardingStep === 7 && !universal.onboardingSkiped) {
      return (
        <OnBoarding
          stepName={onBoardingSteps.ORDER_NUMBER}
          nextCb={() => { this.onboardingNextCb(8); }}
          backCb={() => { this.onboardingBackCb(6); }}
          skipCb={() => { this.onboardingSkipCb(8); }}
          step={7}
          fromRef={this.orderNoRef}
          translations={translations}
        />
      );
    }
    return null;
  }

  onboardingNextCb = (step) => {
    const { saveUniversalData, universal } = this.context;
    saveUniversalData({
      viewedOnboardingStep: step,
      onboardingPlay: universal.onboardingPlay
    });
  }

  onboardingBackCb = async (currentStep) => {
    const { saveUniversalData, universal, componentId } = this.context;
    let step = currentStep;
    if (!universal.showMoreInformationStep && step === 6) step -= 1;
    await saveUniversalData({
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

  render() {
    const { productDetailsObj } = this.props;
    const isPastProduct = productDetailsObj.productType && productDetailsObj.productType === PAST_PRODUCT;
    return (
      <View style={styles.rightWrap}>
        {this.renderPricing()}
        {isPastProduct ? null : this.renderStatWrap()}
        {this.renderInstructionRequired()}
        {isPastProduct ? null : this.renderDescription()}
        {isPastProduct ? null : this.renderTechData()}
        {this.renderOnboarding()}
      </View>
    );
  }
}

RightSection.contextType = PageContentContext;
export default RightSection;
