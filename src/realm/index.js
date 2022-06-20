/**
 * @fileoverview Realm storage configuration is combile in
 * this file
 * @package
 */
import Config from 'react-native-config';
import Realm from 'realm';
import { globals } from '../config';

import {
  rootPageMetaSchema,
  countrySchema,
  activeLanguageSchema
} from './schema/countries';
import { pageDataSchema, pageContentSchema } from './schema/pageData';
import { productGroupSchema, productGroupListSchema } from './schema/productGroup';
import { subProductGroupMetaSchema, subProductGroupListSchema } from './schema/subProductGroup';
import { productRecommendationListSchema, productRecommendationSchema } from './schema/productRecommendations';
import productListSchema from './schema/productList';
import productDetailsSchema from './schema/productDetails';
import dailyApiCheckSchema from './schema/dailyApiCheck';
import structureSchema from './schema/structure';
import { favouriteFolder, favouriteContent } from './schema/favourite';
import translationSchema from './schema/translation';
import productCompare from './schema/productCompare';
import textMarkingSchema from './schema/textMarking';
import offlineDownload from './schema/offlineDownload';
import universal from './schema/universal';
import mediaUrl from './schema/mediaUrl';

const schemas = [
  productDetailsSchema
];

//* * Realm storage configuration */
const PROFESSIONAL_DB_OPTIONS = {
  path: `${globals.DB_BASE_URL}${Config.PROFESSIONAL_DATABASE}.realm`,
  schema: [...schemas],
  schemaVersion: globals.DB_VERSION,
  // shouldCompactOnLaunch: () => true
};
const HOME_AND_GARDEN_DB_OPTIONS = {
  path: `${globals.DB_BASE_URL}${Config.HOME_AND_GARDEN_DATABASE}.realm`,
  schema: [...schemas],
  schemaVersion: globals.DB_VERSION,
  // shouldCompactOnLaunch: () => true
};
const COMMON_DB_OPTIONS = {
  path: `${globals.DB_BASE_URL}${Config.COMMON_DATABASE}.realm`,
  schema: [
    pageDataSchema,
    pageContentSchema,
    productGroupSchema,
    productGroupListSchema,
    subProductGroupMetaSchema,
    subProductGroupListSchema,
    productListSchema,
    translationSchema,
    structureSchema,
    productRecommendationSchema,
    productRecommendationListSchema
  ],
  schemaVersion: globals.DB_VERSION,
  // shouldCompactOnLaunch: () => true
};

const LOCAL_DB_OPTIONS = {
  path: `${globals.DB_BASE_URL}${Config.LOCAL_DATABASE}.realm`,
  schema: [
    rootPageMetaSchema,
    countrySchema,
    activeLanguageSchema,
    favouriteFolder,
    favouriteContent,
    productCompare,
    textMarkingSchema,
    dailyApiCheckSchema,
    offlineDownload,
    universal,
    mediaUrl
  ],
  schemaVersion: globals.DB_VERSION,
  // shouldCompactOnLaunch: () => true
};

const PROFESSIONAL_DATABASE = new Realm(PROFESSIONAL_DB_OPTIONS);
const HOME_AND_GARDEN_DATABASE = new Realm(HOME_AND_GARDEN_DB_OPTIONS);
const COMMON_DATABASE = new Realm(COMMON_DB_OPTIONS);
const LOCAL_DATABASE = new Realm(LOCAL_DB_OPTIONS);

// Realm.deleteFile(PROFESSIONAL_DATABASE_OPTIONS);
// Realm.deleteFile(HOME_AND_GARDEN_DATABASE_OPTIONS);
// Realm.deleteFile(COMMON_DATABASE_OPTIONS);
// Realm.deleteFile(LOCAL_DATABASE_OPTIONS);

// REALM.write(() => {
//   PROFESSIONAL_DATABASE.deleteAll();
//   HOME_AND_GARDEN_DATABASE.deleteAll();
//   COMMON_DATABASE.deleteAll();
//   LOCAL_DATABASE.deleteAll();
// });
// REALM.compact();
if (!globals.LIVE) {
  console.log(`PROFESSIONAL_DATABASE: ${PROFESSIONAL_DATABASE.path}`);
  console.log(`HOME_AND_GARDEN_DATABASE: ${HOME_AND_GARDEN_DATABASE.path}`);
  console.log(`COMMON_DATABASE: ${COMMON_DATABASE.path}`);
  console.log(`COMMON_DATABASE: ${LOCAL_DATABASE.path}`);
}

let dbPathArr = PROFESSIONAL_DATABASE.path.split('/');
dbPathArr = dbPathArr.slice(0, dbPathArr.length - 1);
const dbBaseUrl = dbPathArr.join('/');

globals.SET_APP_DATA('dbBaseUrl', `${dbBaseUrl}/`);

export {
  PROFESSIONAL_DB_OPTIONS,
  HOME_AND_GARDEN_DB_OPTIONS,
  COMMON_DB_OPTIONS,
  LOCAL_DB_OPTIONS
};
