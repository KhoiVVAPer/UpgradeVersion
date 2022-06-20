import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { GET_CLIENT } = globals;
const { apiNames } = appConstants;

const getTranslations = async () => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  const query = gql`
    {
      getTranslations(year: ${globals.CURRENT_YEAR},
        countryCode: "${activeLanguageData.countryCode}",
        languageCode: "${activeLanguageData.languageCode}") {
        export,
        year,
        country,
        language,
        createdAt,
        data
      }
    }
  `;

  return new Promise(async (resolve, reject) => {
    const authorizer = await helpers.getCongnitoToken();
    GET_CLIENT(authorizer, apiNames.TRANSLATION_GET).query({ query }).then(({ data }) => {
      resolve(data.getTranslations);
    }).catch((err) => {
      reject(err);
    });
  });
};

export default getTranslations;
