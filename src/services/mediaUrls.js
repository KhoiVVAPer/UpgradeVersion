/**
 * @fileoverview This is api service to get media urls
 * @return {object} Url or images to be stored in local device
 */
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { validationMsg, apiNames, catelogueTypes } = appConstants;
const { GET_CLIENT } = globals;

const getMediaUrls = async (type) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

  const query = gql`
    {
      getAssetsByBusinessUnit(
        languageCode: "${activeLanguageData.languageCode}",
        countryCode: "${activeLanguageData.countryCode}",
        year: ${globals.CURRENT_YEAR},
        businessUnit: "${type}"
      ){
        year,
        language,
        country,
        data{
          type,
          businessunit,
          file,
          id,
          url
        }
      }
  }
`;

  const authorizer = await helpers.getCongnitoToken();
  const isNetConnected = await helpers.isNetConnected();
  return new Promise((resolve, reject) => {
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
      GET_CLIENT(authorizer, apiNames.STRUCTURE_GET).query({ query }).then(({ data }) => {
        if (catelogueTypes.HOME_AND_GARDEN === type) {
          globals.SET_APP_DATA('hgImgUrlsApi', data.getAssetsByBusinessUnit.data);
        }
        if (catelogueTypes.PROFFESSIONAL === type) {
          globals.SET_APP_DATA('proImgUrlsApi', data.getAssetsByBusinessUnit.data);
        }
        resolve(data.getAssetsByBusinessUnit.data);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export default getMediaUrls;
