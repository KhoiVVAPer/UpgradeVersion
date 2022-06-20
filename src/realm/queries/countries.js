import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save countries list into database
 * @param {Object} realm is instance of root meta for which countries to be saved
 * @param {Object} rootPageMetaQuery object instance of root meta
 * @param {Array} countriesArr is list of countries
 */
const saveCountry = (realm, rootPageMetaQuery, countriesArr) => {
  countriesArr.map((countryObj) => {
    const countryQuery = realm.create(schemas.COUNTRY_SCHEMA, {
      code: countryObj.code,
      name: countryObj.name,
      languages: JSON.stringify(countryObj.languages),
    });
    rootPageMetaQuery.data.push(countryQuery);
    return null;
  });
};

/**
 * Save countries list into database
 * @param {Object} pageData is object containing data for root meta
 * and list of countries and languages
 */
const saveLandingPageData = (pageData) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const rootPageMetaQuery = realm.create(schemas.ROOT_PAGE_META, {
        country: pageData.country,
        createdAt: pageData.createdAt,
        export: pageData.export,
        language: pageData.language,
        year: pageData.year,
        data: [],
      });
      saveCountry(realm, rootPageMetaQuery, pageData.data);
    });
  });
};

/**
 * Get data of root meta and list of countries, languages
 * @return {object} Promise with data of list of countries, languages
 */
const getLandingPageData = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    const landingPageData = [];

    let rootPageMeta = realm.objects(schemas.ROOT_PAGE_META);
    rootPageMeta = Array.from(rootPageMeta);
    if (rootPageMeta.length === 0) {
      resolve(undefined);
      return;
    }
    rootPageMeta = { ...rootPageMeta[0] };

    let arr = Array.from(rootPageMeta.data);
    arr = Array.from(arr);
    arr.map((item) => {
      const country = { ...item };

      landingPageData.push({
        code: country.code,
        name: country.name,
        languages: JSON.parse(country.languages)
      });
      return null;
    });

    rootPageMeta.data = landingPageData;
    resolve(rootPageMeta);
  });
});

/**
 * Save selected country and language
 * @param {Object} data is object containing country and language
 * @return {object} Promise with 1 flag if data saved
 */
const saveActiveLanguage = (data) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      realm.create(schemas.ACTIVE_LANGUAGE, {
        id: 1,
        countryCode: data.countryCode,
        countryName: data.countryName,
        languageCode: data.languageCode,
        languageName: data.languageName,
      });
      resolve(1);
    });
  });
});


/**
 * Get data of active country and language
 * @return {object} Promise with active country and language
 */
const getActiveLanguage = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    const activeLanguageData = realm.objects(schemas.ACTIVE_LANGUAGE);
    resolve(Array.from(activeLanguageData));
  });
});

/**
 * Delete root meta, country list and language list from database
 * @return {object} Promise with true flag if data deleted
 */
const deleteCountryDataDb = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const rootPageMeta = realm.objects(schemas.ROOT_PAGE_META);
      realm.delete(rootPageMeta);

      const countryData = realm.objects(schemas.COUNTRY_SCHEMA);
      realm.delete(countryData);

      resolve(true);
    });
  });
});

export {
  saveLandingPageData,
  getLandingPageData,
  saveActiveLanguage,
  getActiveLanguage,
  deleteCountryDataDb
};
