import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';
import * as globals from '../../config/libs/globals';

const { schemas } = appConstants;

/**
 * Save text marking data
 * @param {Object} data is data of maked text
 */
const saveMarkingDb = (data) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      let markingData = realm.objects(schemas.TEXT_MARKING)
        .filtered(`languageCode="${activeLanguageData.languageCode}" AND countryCode="${activeLanguageData.countryCode}" AND text="${data.text}" AND key="${data.key}"`);
      markingData = Array.from(markingData);

      if (!markingData.length) {
        let id = realm.objects(schemas.TEXT_MARKING).max('id');
        id = id ? id + 1 : 1;
        realm.create(schemas.TEXT_MARKING, {
          id,
          languageCode: activeLanguageData.languageCode,
          countryCode: activeLanguageData.countryCode,
          key: data.key,
          text: data.text,
          startOffset: data.startOffset,
          endOffset: data.endOffset,
          comment: data.comment,
          highlightColor: data.highlightColor,
          commentDate: data.commentDate,
        });
      }
    });
  });
};

/**
 * List of text marking data
 * @return {Object} text marking list
 */
const getMarkingListDb = () => new Promise((resolve) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    let markingData = realm
      .objects(schemas.TEXT_MARKING)
      .filtered(`languageCode="${activeLanguageData.languageCode}" AND countryCode="${activeLanguageData.countryCode}"`);
    markingData = Array.from(markingData);

    markingData = markingData.map((item) => ({ ...item }));

    resolve(markingData);
  });
});

/**
 * Delete text marking data item of provided id
 * @param {Int} id is unique key of making data
 * @return {Object} if marking text is deleted
 */
const deleteMarkingListDb = (id) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const markingList = realm.objects(schemas.TEXT_MARKING).filtered(`id=${id}`);
      realm.delete(markingList);
      resolve(true);
    });
  });
});

export { saveMarkingDb, getMarkingListDb, deleteMarkingListDb };
