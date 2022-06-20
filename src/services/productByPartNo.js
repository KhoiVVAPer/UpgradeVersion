/**
 * @fileoverview This is api service to get structure list
 * to construct breadcrumb in application
 * @return {object} Structure of heirarchy to represent parents and child
 * of respective screens
 */
import { gql } from 'apollo-boost/lib/index';
import { globals, helpers, appConstants } from '../config';

const { validationMsg, apiNames } = appConstants;
const { GET_CLIENT } = globals;

const getProductByPartNo = async (partNo) => {
  const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
  const query = gql`
    {
        getProductIdByPartnumber(
            partnumber: "${(partNo)}",
            languageCode: "${activeLanguageData.languageCode}",
            countryCode: "${activeLanguageData.countryCode}",
            year: ${globals.CURRENT_YEAR}
        ){
          id
        }
    }
  `;

  const isNetConnected = await helpers.isNetConnected();

  return new Promise(async (resolve, reject) => {
    if (isNetConnected) {
      const authorizer = await helpers.getCongnitoToken();
      GET_CLIENT(authorizer, apiNames.STRUCTURE_GET).query({ query }).then(({ data }) => {
        resolve(data.getProductIdByPartnumber.id);
      }).catch((err) => {
        reject(err);
      });
    } else {
      reject(validationMsg.offline);
    }
  });
};

export default getProductByPartNo;
