/**
 * @fileoverview This is api service to get download export
 * of relam database
 * @return {object} Url or database to be dowmloaded
 */
import { gql } from 'apollo-boost/lib/index';
import Config from 'react-native-config';
import { globals, helpers, appConstants } from '../config';

const { validationMsg, apiNames } = appConstants;
const { GET_CLIENT } = globals;

const getDownloadExport = async () => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  const query = gql`
    {
      getDownloadExport(
        isMobile:true,
        languageCode: "${activeLanguageData.languageCode}",
        countryCode: "${activeLanguageData.countryCode}",
        year: ${globals.CURRENT_YEAR}
      ){
        ${Config.PROFESSIONAL_DATABASE},
        ${Config.HOME_AND_GARDEN_DATABASE},
        ${Config.COMMON_DATABASE},
      }
    }
  `;

  const isNetConnected = await helpers.isNetConnected();

  return new Promise(async (resolve, reject) => {
    const offlineDbApi = globals.GET_APP_DATA('offlineDbApi');
    if (offlineDbApi) {
      resolve({ ...offlineDbApi });
      return;
    }

    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.STRUCTURE_GET).query({ query }).then(({ data }) => {
        globals.SET_APP_DATA('offlineDbApi', { ...data.getDownloadExport });
        resolve({ ...data.getDownloadExport });
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export default getDownloadExport;
