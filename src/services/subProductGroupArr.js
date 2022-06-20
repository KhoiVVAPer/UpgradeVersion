/**
 * @fileoverview This is api service to get list of sub product groups
 * @return {object} Subproducts of respective productgroups
 */
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { validationMsg, apiNames } = appConstants;
const { GET_CLIENT } = globals;

const getSubProductGroupArr = async (dataArr) => {
  const productGroupArr = dataArr.map((item) => (parseInt(item)));
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  const query = gql`
    {
        getSubProductGroupByIds(
            productGroupId: ${JSON.stringify(productGroupArr)}
            languageCode: "${activeLanguageData.languageCode}",
            countryCode: "${activeLanguageData.countryCode}",
            year: ${globals.CURRENT_YEAR}
        ) {
            export,
            year,
            country,
            language,
            createdAt,
            data {
                id
                title
                parentId
                type
            }
        }
    }
  `;

  const isNetConnected = await helpers.isNetConnected();

  return new Promise(async (resolve, reject) => {
    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.STRUCTURE_GET).query({ query }).then(({ data }) => {
        resolve(data.getSubProductGroupByIds);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export default getSubProductGroupArr;
