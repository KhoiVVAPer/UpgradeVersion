/**
 * @fileoverview This component renders design template
 * for Business Unit manual content.
 * @package
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import { Button, HtmlParser } from '../../generic';
import { TouchableDebounce, DcaImage } from '../../elements';
import { rootNavigation } from '../../../../navigation';
import { appContexts, globals, helpers } from '../../../../config';
import styles from './styles';
import { realDbDownloadComplete } from '../../../../config/offlineDownload/downloadHandler';
import constants from '../../../../config/libs/constants';

const { PageContentContext } = appContexts;

class BusinessUnitEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { layoutData } = this.props;

    const cataloguesObj = layoutData.values[0];
    const leftLink = cataloguesObj.button_link_left;
    const rightLink = cataloguesObj.button_link_right;
    const leftHeadline = cataloguesObj.headline_left;
    const rightHeadline = cataloguesObj.headline_right;

    globals.SET_APP_DATA('catalogueIds', {
      HOME_AND_GARDEN: String(leftLink),
      PROFESSIONAL: String(rightLink)
    });
    globals.SET_APP_DATA('catalogueNames', {
      HOME_AND_GARDEN: leftHeadline,
      PROFESSIONAL: rightHeadline
    });

    this.needsToUnzip();
  }

  needsToUnzip = async () => {
    const isNetConnected = await helpers.isNetConnected();
    if (!isNetConnected) {
      // we try and find if the left image is present. If not, we need to unzip the downloaded zip file again
      const { layoutData } = this.props;
      const cataloguesObj = layoutData.values[0];
      const leftImage = `${cataloguesObj.image_left}`;
      const imageUrl = await helpers.imageSavedCheck(leftImage);
      const filePresentOnDevice = await helpers.isFileExist(imageUrl);
      // console.warn('LEFT IMAGE', filePresentOnDevice);
      // DEBUG || true
      if (!filePresentOnDevice) {
        // we now trigger the zip extraction

        // Jonas & Pratham: I imagined it was only a matter of exporting and calling this
        // helper method to force the unzip, but it turns out it does not work, because it
        // misses a lot of props. I think I may have to trigger the render of the
        // download modal, but that has its own problems
        // update: With a refactor of the download method it now works
        // but we need to replicate the state because dbDownloadComplete depends on page props
        // and we are not on the usual page

        // this will allow us to simulate the state
        const offlineDownload = {};
        offlineDownload.proffesional_media_flag = constants.downloadingFlags.NONE;
        offlineDownload.home_and_garden_media_flag = constants.downloadingFlags.DOWNLOADED;

        realDbDownloadComplete(true, false, offlineDownload, null);
      }
    }
  }

  navigate = (pageId, title) => {
    const { componentId } = this.context;
    globals.SET_APP_DATA('rootNav', { componentId: String(pageId), title });
    helpers.analyticsAction({
      actionType: 'home',
      actionObj: { 'a.action': title === 'Professional' ? 'professional_learn_more' : 'home_garden_learn_more' }
    });
    Navigation.push(
      componentId,
      rootNavigation.pageContent({
        passProps: {
          pageId,
          startscreen: true
        },
        pageId: String(pageId)
      })
    );
  }

  renderCatalogue = (image, headline, link, btnTxt, offset) => {
    const { pageId } = this.context;
    const itemStyle = [styles.item1, styles.item2];
    const headingStyle = [styles.heading1, styles.heading2];
    const btnTheme = ['default', 'light'];

    return (
      <View style={[styles.catalogueItem, itemStyle[offset]]}>
        <TouchableDebounce
          onPress={() => this.navigate(link, headline)}
          style={styles.catalogueItemInner}
        >
          <View style={styles.catalogueImageWrap}>
            <DcaImage
              dcaTest="image"
              url={image}
              imageStyle={styles.catalogueImage}
              resizeMode="contain"
            />
          </View>
          <HtmlParser
            html={headline.toLocaleUpperCase()}
            textKey={`businessUnitEntry-${pageId}-${offset}`}
            style={[styles.heading, headingStyle[offset]]}
            onPress={() => this.navigate(link, headline)}
          />
          <Button
            onPress={() => this.navigate(link, headline)}
            text={btnTxt}
            theme={btnTheme[offset]}
            style={styles.btn}
            txtStyle={styles.btnTxt}
          />
        </TouchableDebounce>
      </View>
    );
  }

  render() {
    const { layoutData, translations } = this.props;
    const cataloguesObj = layoutData.values[0];
    // const leftImage = `${Config.WEBSITE_LINK}${cataloguesObj.image_left}`;
    const leftImage = `${cataloguesObj.image_left}`;
    const leftHeadline = translations.length > 0 ? translations[0].home_garden : cataloguesObj.headline_left;
    const leftLink = cataloguesObj.button_link_left;
    const leftButton = cataloguesObj.button_text_left;
    // const rightImage = `${Config.WEBSITE_LINK}${cataloguesObj.image_right}`;
    const rightImage = `${cataloguesObj.image_right}`;
    const rightHeadline = translations.length > 0 ? translations[0].professional : cataloguesObj.headline_right;
    const rightLink = cataloguesObj.button_link_right;
    const rightButton = cataloguesObj.button_text_right;

    return (
      <View style={styles.container}>
        {this.renderCatalogue(leftImage, leftHeadline, leftLink, leftButton, 0)}
        {this.renderCatalogue(rightImage, rightHeadline, rightLink, rightButton, 1)}
      </View>
    );
  }
}

BusinessUnitEntry.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};

BusinessUnitEntry.contextType = PageContentContext;
export default BusinessUnitEntry;
