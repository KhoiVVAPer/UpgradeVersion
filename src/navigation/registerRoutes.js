/**
 * @fileoverview Navigations in application are
 * registered in this file
 * @package
 */
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { store } from '../redux/configureStrore';
import { appConstants } from '../config';

import LandingPage from '../components/screens/landingPage';
import Home from '../components/screens/home';
import PageContent from '../components/screens/pageContent';
import Settings from '../components/screens/settings';
import Favourite from '../components/screens/favourite';
import ProductCompare from '../components/screens/productCompare';
import SearchPage from '../components/screens/searchPage';
import ProductFinder from '../components/screens/productFinder';

const { routes } = appConstants;

export default () => {
  Navigation.registerComponentWithRedux(routes.LANDING_PAGE, () => LandingPage, Provider, store);
  Navigation.registerComponentWithRedux(routes.HOME, () => Home, Provider, store);
  Navigation.registerComponentWithRedux(routes.PAGE_CONTENT, () => PageContent, Provider, store);
  Navigation.registerComponentWithRedux(routes.SETTINGS, () => Settings, Provider, store);
  Navigation.registerComponentWithRedux(routes.FAVOURITE, () => Favourite, Provider, store);
  Navigation.registerComponentWithRedux(routes.PRODUCT_COMPARE, () => ProductCompare, Provider, store);
  Navigation.registerComponentWithRedux(routes.SEARCH_PAGE, () => SearchPage, Provider, store);
  Navigation.registerComponentWithRedux(routes.PRODUCTFINDER, () => ProductFinder, Provider, store);
};
