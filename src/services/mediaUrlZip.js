/**
 * @fileoverview This is api service to get download export
 * of relam database
 * @return {object} Url or database to be dowmloaded
 */
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { validationMsg, apiNames, catelogueTypes } = appConstants;
const { GET_CLIENT } = globals;

const mediaUrlZipService = async (type) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  const query = gql`
    query{
        getAssetExport(
            languageCode: "${activeLanguageData.languageCode}",
            countryCode: "${activeLanguageData.countryCode}",
            year: ${globals.CURRENT_YEAR}
            type: "${type}"
        ){
          URL
        }
    }
  `;

  const isNetConnected = await helpers.isNetConnected();

  return new Promise(async (resolve, reject) => {
    if (catelogueTypes.HOME_AND_GARDEN === type) {
      const hgImgUrlsApi = globals.GET_APP_DATA('hgImgUrlsApi');
      if (hgImgUrlsApi) {
        resolve(hgImgUrlsApi);
        return;
      }
    }
    if (catelogueTypes.PROFFESSIONAL === type) {
      const proImgUrlsApi = globals.GET_APP_DATA('proImgUrlsApi');
      if (proImgUrlsApi) {
        resolve(proImgUrlsApi);
        return;
      }
    }

    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.STRUCTURE_GET).query({ query }).then(({ data }) => {
        if (catelogueTypes.HOME_AND_GARDEN === type) {
          globals.SET_APP_DATA('hgImgUrlsApi', data.getAssetExport.URL);
        }
        if (catelogueTypes.PROFFESSIONAL === type) {
          globals.SET_APP_DATA('proImgUrlsApi', data.getAssetExport.URL);
        }
        resolve([...data.getAssetExport.URL]);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export default mediaUrlZipService;
