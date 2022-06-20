import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { GET_CLIENT } = globals;
const { apiNames } = appConstants;

const getCountries = async () => {
  try {
    const isNetConnected = await helpers.isNetConnected();
    if (!isNetConnected) return Promise.reject();

    const authorizer = await helpers.getCongnitoToken();
    const query = gql`
      {
        getCountryListByYear (year: ${globals.CURRENT_YEAR}) {
          export
          country
          year
          createdAt
          language
          data {
            name
            code
            languages {
              languageCode,
              languageName
            }
            from
          }
        }
      }
    `;

    return new Promise((resolve, reject) => {
      GET_CLIENT(authorizer, apiNames.COUNTRY_LANGUAGE_GET).query({ query }).then(({ data }) => {
        resolve(data.getCountryListByYear);
      }).catch((err) => {
        reject(err);
      });
    });
  } catch (err) {
    return Promise.reject();
  }
};

export default getCountries;
