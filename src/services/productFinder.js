import {
  Alert
} from 'react-native';
import { Query } from '@apollo/react-components';
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { GET_CLIENT } = globals;
const { apiNames } = appConstants;

const getProductFinder = async (selectedAnswer) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  try {
    const isNetConnected = await helpers.isNetConnected();
    if (!isNetConnected) return Promise.reject();
    const authorizer = await helpers.getCongnitoToken();
    const query = selectedAnswer
      ? gql`
    {
        getProductFinderResult(
          questions: ${JSON.stringify(selectedAnswer).replace(/"(\w+)"\s*:/g, '$1:')},
          languageCode: "${activeLanguageData.languageCode}",
          countryCode: "${activeLanguageData.countryCode}",
          year:${globals.CURRENT_YEAR}
        
        ){
            year,
            country,
            language,
            questions {
              Unit {
                Name
                Translation_ID
              }
              Explanation {
                Name
                Translation_ID
              }
              Answer_Options {
                value
                entryPointPageId
                Translation_ID
                Active
              }
              Answer {
                value
                entryPointPageId
                Translation_ID
                Active
              }
              QuestionName
              QuestionNode
              Translation_ID
              Type
              Maximum
              Minimum
            },        
            products {partnumberFormatted,pageID,image,name,text}
        }
      }
    `
      : gql`
    {
        getProductFinderResult(
          languageCode: "${activeLanguageData.languageCode}",
          countryCode: "${activeLanguageData.countryCode}",
          year:${globals.CURRENT_YEAR}
        ){
            year,
            country,
            language,
            questions {
              Unit {
                Name
                Translation_ID
              }
              Explanation {
                Name
                Translation_ID
              }
              Answer_Options {
                value
                entryPointPageId
                Translation_ID
                Active
              }
              Answer {
                value
                entryPointPageId
                Translation_ID
                Active
              }
              QuestionName
              QuestionNode
              Translation_ID
              Type
              Maximum
              Minimum
            },
            products {partnumberFormatted,pageID,image,name,text}
        }
      }
    `;
    return new Promise((resolve, reject) => {
      GET_CLIENT(authorizer, apiNames.PRODUCT_FINDER_GET).query({ query }).then(({ data }) => {
        resolve(data.getProductFinderResult);
      }).catch((err) => {
        reject(err);
      });
    });
  } catch (err) {
    return Promise.reject();
  }
};

export default getProductFinder;
