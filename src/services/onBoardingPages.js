/**
 * @fileoverview This is api service to get onboarding ids
 * @return {object} Onboarding ids
 */
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { apiNames } = appConstants;
const { GET_CLIENT } = globals;

const getOnboardingPagesService = async () => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

  const query = gql`
    {
      getOnboarding(
        languageCode: "${activeLanguageData.languageCode}",
        countryCode: "${activeLanguageData.countryCode}",
        year: ${globals.CURRENT_YEAR}
      ){
        productGroupId,
        productId
      }
    }
  `;
  const isNetConnected = await helpers.isNetConnected();

  return new Promise(async (resolve, reject) => {
    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.STRUCTURE_GET)
        .query({ query })
        .then(({ data }) => {
          resolve(data.getOnboarding);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject();
    }
  });
};

export default getOnboardingPagesService;
