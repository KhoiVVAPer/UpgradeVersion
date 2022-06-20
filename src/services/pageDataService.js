import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { validationMsg, apiNames } = appConstants;
const { GET_CLIENT } = globals;

const getPageDataService = async (pageId) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  const query = gql`
    {
      getPageContent (
        pageId: ${pageId},
        languageCode: "${activeLanguageData.languageCode}",
        countryCode: "${activeLanguageData.countryCode}",
        year: ${globals.CURRENT_YEAR}
      ) {
        pageId
        style
        export
        year
        country
        language
        createdAt
        content {
          id
          type
          config
        }
      }
    }
  `;

  const isNetConnected = await helpers.isNetConnected();

  return new Promise(async (resolve, reject) => {
    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.PAGE_CONTENT_GET).query({ query }).then(({ data }) => {
        resolve(data.getPageContent);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export default getPageDataService;
