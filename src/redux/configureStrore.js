/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {
  createStore, applyMiddleware, combineReducers
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { LIVE } from '../config/libs/globals';
import translations from './reducers/translationReducer';
import structureData from './reducers/structureReducer';
import countries from './reducers/countriesReducer';
import productFinderReducer from './reducers/productFinderReducer';
import pageData from './reducers/pageDataReducer';
import productGroupList from './reducers/productGroupListReducer';
import subProductGroupList from './reducers/subProductGroupListReducer';
import productList from './reducers/productListReducer';
import productDetails from './reducers/productDetailsReducer';
import productCompare from './reducers/productCompareReducer';
import favourite from './reducers/favouriteReducer';
import textMarking from './reducers/textMarkingReducer';
import offlineDownload from './reducers/offlineDownloadReducer';
import mediaUrlArr from './reducers/mediaUrlReducer';
import universal from './reducers/universalReducer';

import rootSaga from './sagas';

export const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  // eslint-disable-next-line no-undef
  predicate: () => (!LIVE ? __DEV__ : false),
  collapsed: true
});

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
const configureStore = (initialState = {}) => (
  createStore(
    combineReducers({
      translations,
      countries,
      productFinderReducer,
      pageData,
      productGroupList,
      subProductGroupList,
      productList,
      structureData,
      productDetails,
      productCompare,
      favourite,
      textMarking,
      offlineDownload,
      mediaUrlArr,
      universal
    }),
    initialState,
    applyMiddleware(sagaMiddleware, logger)
  )
);

export const store = configureStore();
sagaMiddleware.run(rootSaga);
