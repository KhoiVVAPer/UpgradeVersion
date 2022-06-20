import { gql } from 'apollo-boost/lib/index';
import * as globals from '../config/libs/globals';
import appConstants from '../config/libs/constants';

const { GET_CLIENT } = globals;
const { apiNames } = appConstants;

const getAppFonts = async (isNetConnected, getCongnitoToken) => {
  try {
    const isConnected = await isNetConnected();
    if (!isConnected) return Promise.resolve(false);

    const authorizer = await getCongnitoToken();
    const query = gql`
      {
        getFontUrl {
            CLANPRO_NARRBOOK,
            CLANPRO_NARRBOOK_BOLD,
            TICK_IMG_URL
        }
      }
    `;

    return new Promise((resolve, reject) => {
      GET_CLIENT(authorizer, apiNames.STRUCTURE_GET).query({ query }).then(({ data }) => {
        resolve(data.getFontUrl);
      }).catch((err) => {
        reject(err);
      });
    });
  } catch (err) {
    return Promise.reject();
  }
};

export default getAppFonts;
