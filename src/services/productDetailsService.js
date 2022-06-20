/**
 * @fileoverview This is api service to get product list.
 * @param {int} productId An interger to get product list of that group
 * @return {object} List of products of provided id
 */
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';


const { validationMsg, apiNames } = appConstants;
const { GET_CLIENT } = globals;

const getProductDetailsService = async (productId) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

  const query = gql`
  {
    getProductById(
      productId: [${productId}],
      languageCode: "${activeLanguageData.languageCode}",
      countryCode: "${activeLanguageData.countryCode}",
      year:${globals.CURRENT_YEAR}
    ){
        export,
        year,
        country,
        language,
        createdAt,
        data,
        recommendedProducts
    }
  }
  `;

  const isNetConnected = await helpers.isNetConnected();

  return new Promise(async (resolve, reject) => {
    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.PRODUCT_LIST).query({ query }).then(({ data }) => {
        let { recommendedProducts } = data.getProductById[0];
        const { partNumber, partnumberFormatted } = JSON.parse(data.getProductById[0].data);
        let recommendationsData = {};
        if (recommendedProducts) {
          recommendedProducts = JSON.parse(recommendedProducts);
          recommendationsData = {
            country: data.getProductById[0].country,
            language: data.getProductById[0].language,
            partNumber,
            partnumberFormatted,
            data: recommendedProducts.data[partnumberFormatted]
          };
        }

        resolve({ data: data.getProductById, recommendationsData });
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export default getProductDetailsService;
