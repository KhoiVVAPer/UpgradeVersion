import Config from 'react-native-config';
import appObjects from '../../config/libs/appObjects';
import { getDb } from '../../config/libs/helpers';
import { appConstants } from '../../config';

const { schemas } = appConstants;

/**
 * Save universal storage data
 * @param {Object} dataObj is data of Save universal storage data
 * @return {Boolean} data is saved
 */
const saveUniversalDb = (dataObj) => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      realm.create(schemas.UNIVERSAL, {
        id: 1,
        ...dataObj
      }, true);
      resolve(true);
    });
  });
});

/**
 * Get offline download data flag
 * @return {Object} data of offline data flag
 */
const getUniversalDb = () => new Promise((resolve) => {
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(async () => {
      const universalData = realm.objects(schemas.UNIVERSAL);
      const arr = Array.from(universalData);
      let obj = {};
      if (arr.length === 0) {
        obj = { ...appObjects };
        await saveUniversalDb({ obj });
      } else {
        const tempObj = { ...arr[0] };
        obj = {
          ...tempObj,
          onboardingIds: tempObj.onboardingIds ? JSON.parse(tempObj.onboardingIds) : null
        };
      }
      resolve(obj || false);
    });
  });
});

export { saveUniversalDb, getUniversalDb };
