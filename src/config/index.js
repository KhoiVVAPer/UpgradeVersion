/**
 * @fileoverview All configuration file's in application are combined
 * in this file
 * @package
 */
import * as globals from './libs/globals';
import refHandler from './libs/refHandler';
import appConstants from './libs/constants';
import * as helpers from './libs/helpers';
import requestPermission from './libs/androidPermisions';
import validator from './libs/validators';
import awsconfig from './libs/aws-exports';
import * as appContexts from './libs/appContexts';
import versionDetails from './libs/versionDetails';
import tr from './libs/translator';
import setDefaultMarking from './libs/setDefaultMarking';
import appObjects from './libs/appObjects';
import * as colors from './utils/colors';
import * as fontsSizes from './utils/fontSizes';
import fonts from './utils/fonts';
import images from './utils/images';
import icons from './utils/icons';
import appStyles from './utils/appStyles';
import texts from './utils/texts';
import downloadHandler from './offlineDownload/downloadHandler';
import resumeDownload from './offlineDownload/resumeDownload';
import syncOfflineDownload from './offlineDownload/syncDownload';
import downloadHelpers from './offlineDownload/downloadHelpers';
import { exportFavourite, importFavourite } from './favourite';
import {
  productDetailsPdf,
  manualContentPdf,
  productComparePdf,
  productListPdf
} from './createPdf';
import dbMigration from './dbMigration';
import versionChecker from './dbMigration/versionChecker';
import initAdobeSdk from './adobeAnalytics';

export {
  globals,
  refHandler,
  appConstants,
  helpers,
  requestPermission,
  validator,
  awsconfig,
  appContexts,
  versionDetails,
  tr,
  setDefaultMarking,
  appObjects,
  colors,
  fontsSizes,
  fonts,
  images,
  icons,
  appStyles,
  texts,
  downloadHandler,
  resumeDownload,
  syncOfflineDownload,
  downloadHelpers,
  exportFavourite,
  importFavourite,
  productDetailsPdf,
  manualContentPdf,
  productComparePdf,
  productListPdf,
  dbMigration,
  versionChecker,
  initAdobeSdk
};
