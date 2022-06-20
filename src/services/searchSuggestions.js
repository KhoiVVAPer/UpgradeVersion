/**
 * @fileoverview This is api service to get media urls
 * @return {object} Url or images to be stored in local device
 */
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { validationMsg, apiNames } = appConstants;
const { GET_CLIENT } = globals;

const searchSuggestions = async (searchStr) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  const query = gql`
      {
        searchSuggestions(
          q: "${searchStr}",
          languageCode: "${activeLanguageData.languageCode}",
          countryCode: "${activeLanguageData.countryCode}",
          year:${globals.CURRENT_YEAR}
        ){
          data{
            _source{
              id,
              name,
              partnumber,
              partnumberFormatted,
            }
          }
        }
      }
    `;

  const authorizer = await helpers.getCongnitoToken();
  const isNetConnected = await helpers.isNetConnected();
  return new Promise((resolve, reject) => {
    if (isNetConnected) {
      GET_CLIENT(authorizer, apiNames.SEARCH).query({ query }).then(({ data }) => {
        resolve(data.searchSuggestions.data);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export default searchSuggestions;
