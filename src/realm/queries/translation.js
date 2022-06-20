import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save selected language translations into database
 * @param {Object} data is tranlation of active app language
 */
const saveTranslationDb = (data) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      let id = realm.objects(schemas.TRANSLATION).max('id');
      id = id ? id + 1 : 1;
      realm.create(schemas.TRANSLATION, {
        id,
        export: data.export,
        year: data.year,
        country: data.country,
        language: data.language,
        createdAt: data.createdAt,
        data: data.data
      });
    });
  });
};

/**
 * Get list of translations saved into database
 * @return {Object} list of translations
 */
const getTranslationDataDb = () => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    let translationArr = realm.objects(schemas.TRANSLATION);
    translationArr = Array.from(translationArr);

    if (!translationArr[0]) resolve(undefined);

    const translationObj = { ...translationArr[0] };
    resolve(translationObj);
  });
});

/**
 * Delete translations from database
 * @return {Object} id tranlsations are deleted
 */
const deleteTranslationDataDb = () => new Promise((resolve) => {
  getDb(Config.COMMON_DATABASE).then((realm) => {
    realm.write(() => {
      const translationData = realm.objects(schemas.TRANSLATION);
      realm.delete(translationData);

      resolve(true);
    });
  });
});

export {
  saveTranslationDb,
  getTranslationDataDb,
  deleteTranslationDataDb
};
