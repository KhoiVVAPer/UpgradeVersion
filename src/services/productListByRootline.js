/**
 * @fileoverview This is api service to get product list.
 * @param {int} productGroupId An interger to get product list of that group
 * @return {object} List of products of provided id
 */
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { validationMsg, apiNames } = appConstants;
const { GET_CLIENT } = globals;

const getProductListByRootline = async (productGroupId) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

  const query = gql`
    {
        getProductListByRootline(
            productGroupId: ${productGroupId},
            languageCode: "${activeLanguageData.languageCode}",
            countryCode: "${activeLanguageData.countryCode}",
            year: ${globals.CURRENT_YEAR}
        ){
            export,
            year,
            country,
            language,
            createdAt,
            productGroupData,
            data {
                id,
                name,
                productType,
                businessUnit,
                images {
                    title,
                    type,
                    urls{
                        type,
                        url
                    }
                },
                texts{
                  value,
                  type
                }
            }
        }
    }
  `;

  const isNetConnected = await helpers.isNetConnected();

  return new Promise(async (resolve, reject) => {
    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.PRODUCT_LIST).query({ query }).then(({ data }) => {
        resolve(data.getProductListByRootline);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export default getProductListByRootline;
