import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appObjects from '../../config/libs/appObjects';
import { getUniversalDb, saveUniversalDb } from './universal';

const schemasToExclude = {
  ROOT_PAGE_META: 'rootPageMeta',
  COUNTRY_SCHEMA: 'country',
  TEXT_MARKING: 'textMarking'
};

const PROFESSIONAL_SCHEMAS = {
  PRODUCT_DETAILS: 'productDetails',
};

const HOME_AND_GARDEN_SCHEMAS = {
  PRODUCT_DETAILS: 'productDetails',
};

const COMMON_SCHEMAS = {
  PRODUCT_GROUP: 'productGroup',
  PRODUCT_GROUP_LIST: 'productGroupList',
  PAGE_DATA: 'pageData',
  PAGE_CONTENT: 'pageContent',
  SUB_PRODUCT_GROUP_META: 'subProductGroupMeta',
  SUB_PRODUCT_GROUP_LIST: 'subProductGroupList',
  PRODUCT_LIST: 'productList',
  STRUCTURE: 'structure',
  TRANSLATION: 'translation',
  PRODUCT_RECOMMENDATIONS: 'productRecommendations',
  PRODUCT_RECOMMENDATIONS_LIST: 'productRecommendationsList',
};

const LOCAL_SCHEMAS = {
  ROOT_PAGE_META: 'rootPageMeta',
  COUNTRY_SCHEMA: 'country',
  ACTIVE_LANGUAGE: 'activeLanguage',
  DAILY_API_CHECK: 'dailyApiCheck',
  FAVOURITE_FOLDER: 'favouriteFolder',
  FAVOURITE_CONTENT: 'favouriteContent',
  PRODUCT_COMPARE: 'productCompare',
  TEXT_MARKING: 'textMarking',
  OFFLINE_DOWNLOAD: 'offlineDownload',
  MEDIA_URL: 'mediaUrl',
  UNIVERSAL: 'universal'
};

/**
 *
 * @param {boolean} isCountryChanged determines if country is also changed along
 * with language on settings page
 * @param {string} db name of database
 * @param {string} dbSchema list of table schema names which are to be cleared
 */
const resetDBExecute = (isCountryChanged, db, dbSchema, universalData) => {
  getDb(db).then((realm) => {
    realm.write(() => {
      // eslint-disable-next-line no-restricted-syntax, no-unused-vars
      for (const key in dbSchema) {
        // eslint-disable-next-line no-prototype-builtins
        if (dbSchema.hasOwnProperty(key)) {
          if (!schemasToExclude[key]) {
            if (
              isCountryChanged
              && (
                dbSchema[key] === dbSchema.FAVOURITE_CONTENT
                || dbSchema[key] === dbSchema.FAVOURITE_FOLDER
              )
            // eslint-disable-next-line no-empty
            ) { } else {
              // eslint-disable-next-line no-lonely-if
              if (dbSchema[key] === LOCAL_SCHEMAS.UNIVERSAL) {
                saveUniversalDb({
                  ...appObjects.universalData,
                  analyticsTracking: universalData.analyticsTracking
                });
              } else {
                const tableData = realm.objects(dbSchema[key]);
                realm.delete(tableData);
              }
            }
          }
        }
      }
    });
  });
};

/**
 * Delete all the entries from all the required tables from database
 * @param {Boolean} isCountryChanged decised if country is changed or not
 */
const resetDB = async (isCountryChanged) => {
  const universalData = await getUniversalDb();
  resetDBExecute(isCountryChanged, Config.PROFESSIONAL_DATABASE, PROFESSIONAL_SCHEMAS);
  resetDBExecute(isCountryChanged, Config.HOME_AND_GARDEN_DATABASE, HOME_AND_GARDEN_SCHEMAS);
  resetDBExecute(isCountryChanged, Config.COMMON_DATABASE, COMMON_SCHEMAS);
  resetDBExecute(isCountryChanged, Config.LOCAL_DATABASE, LOCAL_SCHEMAS, universalData);
};

export default resetDB;
