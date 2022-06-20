import Config from 'react-native-config';
import { getDb } from '../../config/libs/helpers';
import { appConstants } from '../../config';

const { schemas, catelogueTypes } = appConstants;

/**
 * Save media urls in app
 * @return {Array} urls of media files
 */
const saveMediaUrlDb = (urlArr, type) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    const typeKey = type === catelogueTypes.HOME_AND_GARDEN ? 'hgMediaUrl' : 'profMediaUrl';
    realm.write(async () => {
      realm.create(schemas.MEDIA_URL, {
        id: 1,
        [typeKey]: JSON.stringify(urlArr)
      }, true);
      resolve(true);
    });
  });
});

/**
 * Get media urls in app
 * @return {Array} urls of media files
 */
const getMediaUrlDb = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(async () => {
      const mediaData = realm.objects(schemas.MEDIA_URL);
      const arr = Array.from(mediaData);

      let obj = {};
      if (arr.length === 0) {
        obj = {
          id: 1,
          hgMediaUrl: JSON.stringify([]),
          profMediaUrl: JSON.stringify([])
        };
        realm.create(schemas.MEDIA_URL, obj);
      } else {
        obj = { ...arr[0] };
      }
      resolve({
        [catelogueTypes.HOME_AND_GARDEN]: JSON.parse(obj.hgMediaUrl),
        [catelogueTypes.PROFFESSIONAL]: JSON.parse(obj.profMediaUrl)
      });
    });
  });
});

/**
 * Delete media url from database
 * @return {Boolean} if media url's is deleted
 */
const deleteMediaUrlDb = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      const mediaObj = realm.objects(schemas.MEDIA_URL);
      realm.delete(mediaObj);
      resolve(1);
    });
  });
});

export {
  saveMediaUrlDb,
  getMediaUrlDb,
  deleteMediaUrlDb
};
