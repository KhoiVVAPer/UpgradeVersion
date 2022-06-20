import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { validationMsg, apiNames } = appConstants;
const { GET_CLIENT } = globals;

const getProductGroups = async (productGroupId) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

  const query = gql`
    {
      getProductGroupById(
        productGroupId: ${productGroupId},
        languageCode: "${activeLanguageData.languageCode}",
        countryCode: "${activeLanguageData.countryCode}",
        year:${globals.CURRENT_YEAR}
      ){
        export,
        year,
        country,
        language,
        createdAt,
        isDropdownAvailable,
        dropdown,
        data{
          id,
          parentId,
          name,
          texts{
            headline,
            type,
            text,
            images{
              type,
              url
            }
          }
        }
      }
    }
  `;

  const isNetConnected = await helpers.isNetConnected();

  return new Promise(async (resolve, reject) => {
    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.PRODUCT_GROUP_GET).query({ query }).then(({ data }) => {
        resolve(data.getProductGroupById);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

const getSubProductGroup = async (inputId) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

  const productGroupId = parseInt(inputId);

  const query = gql`
    {
      getSubProductGroup(
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
        data {
          id
          title
          parentId
          type
        }
      }
    }
  `;

  const authorizer = await helpers.getCongnitoToken();
  return new Promise((resolve, reject) => {
    const isNetConnected = globals.GET_APP_DATA('isNetConnected');
    if (isNetConnected) {
      GET_CLIENT(authorizer, apiNames.STRUCTURE_GET).query({ query }).then(({ data }) => {
        resolve(data.getSubProductGroup);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export { getProductGroups, getSubProductGroup };
