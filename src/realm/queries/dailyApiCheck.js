import Config from 'react-native-config';
import moment from 'moment';
import { getDb, isNetConnected } from '../../config/libs/helpers';
import appConstants from '../../config/libs/constants';

const { schemas } = appConstants;

/**
 * Save api name and id of page/product/group etc. once daily
 * @param {String} apiName is type of api
 * @param {Int} id is unique key of respective api
 * @return {object} Promise with 1 flag if data saved
 */
const saveDailyApiCheckDb = (apiName, id) => new Promise((resolve) => {
  const today = moment().format('l');
  getDb(Config.LOCAL_DATABASE).then((realm) => {
    realm.write(() => {
      realm.create(schemas.DAILY_API_CHECK, {
        apiName,
        id: String(id),
        apiCallDate: today
      });
      resolve(1);
    });
    // realm.close();
  });
});

/**
 * Check if this api is already called for this day
 * @param {String} apiName is type of api
 * @param {Int} id is unique key of respective api
 * @return {Boolean} if api is saved or not
 */
const getDailyApiCheckDb = (apiName, id) => new Promise(async (resolve) => {
  const isOnline = await isNetConnected();
  if (isOnline) {
    const today = moment().format('l');
    getDb(Config.LOCAL_DATABASE).then((realm) => {
      let apiCallData = realm.objects(schemas.DAILY_API_CHECK).filtered(`apiName="${apiName}" AND apiCallDate="${today}" AND id="${String(id)}"`);
      apiCallData = Array.from(apiCallData);
      // eslint-disable-next-line no-unneeded-ternary
      const checked = apiCallData && apiCallData.length === 1 ? true : false;
      resolve(checked);
    });
  } else {
    resolve(true);
  }
});

export { saveDailyApiCheckDb, getDailyApiCheckDb };
