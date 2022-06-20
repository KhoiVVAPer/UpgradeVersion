/**
 * @fileoverview This is root most screen component.
 * If country and language is select once for application then
 * first dynamic page is rendered for application otherwise
 * country select screen will be rendered
 * @package
 */
import React, { Component } from 'react';
import { } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  appConstants,
  globals
} from '../../../config';
import { getActiveLanguage } from '../../../realm/queries';
import { Loading } from '../../custom';
import Home from '../home';
import PageContent from '../pageContent';
// eslint-disable-next-line no-unused-vars
import Favourite from '../favourite';
// eslint-disable-next-line no-unused-vars
import Settings from '../settings';
// eslint-disable-next-line no-unused-vars
import ProductCompare from '../productCompare';


const { routes } = appConstants;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      renderType: routes.HOME
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    this.getUserToken();
  }

  getUserToken = async () => {
    try {
      const activeLanguageData = await getActiveLanguage();
      if (activeLanguageData.length === 1) {
        globals.SET_APP_DATA('activeLanguageData', { ...activeLanguageData[0] });
      }
      this.setState({
        loading: false,
        renderType: activeLanguageData.length === 1 ? routes.PAGE_CONTENT : routes.HOME
      });
    } catch (err) {
      console.log({ err });
    }
  }

  renderContent = () => {
    const { renderType } = this.state;
    switch (renderType) {
      case routes.PAGE_CONTENT:
        if (globals.LIVE) {
          return <PageContent {...this.props} pageId={0} />;
        }
        // TODO: Delete next block later
        // return <PageContent {...this.props} pageId={10457263} />; //Product details
        // return <PageContent {...this.props} pageId={10471710} />; //Product details
        // return <PageContent {...this.props} pageId={10457242} />; //Product details
        // return <PageContent {...this.props} pageId={10457259} />; //Product details
        // return <PageContent {...this.props} pageId={20035431} />; //Product list
        // return <Favourite {...this.props} />; // Favourtie
        // return <Settings {...this.props} />; // Settings
        // return <ProductCompare {...this.props} />; // Product Compare
        // return <PageContent {...this.props} pageId={1000} />; // Page Content
        return <PageContent {...this.props} pageId={0} />;

      case routes.HOME:
      default:
        return <Home {...this.props} />;
    }
  }

  render() {
    const { loading } = this.state;

    if (loading) return <Loading theme="" />;

    return this.renderContent();
  }
}

export default LandingPage;
