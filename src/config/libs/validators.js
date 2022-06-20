/**
 * @fileoverview All the application validation
 * are managed from this file
 * @package
 */
import { Alert } from 'react-native';
import appConstants from './constants';

const { validationMsg } = appConstants;
const { LANDING_PAGE } = appConstants.validationFor;

function landingPageValidate(data) {
  const { slectedCountry, selectedLanguage } = data;

  let flag = true;

  if (slectedCountry.code === '') {
    flag = false;
    Alert.alert(validationMsg.warning, validationMsg.selectCountry);
  } else if (selectedLanguage.languageCode === '') {
    flag = false;
    Alert.alert(validationMsg.warning, validationMsg.selectLanguage);
  }

  return flag;
}

export default (validationFor, data) => {
  let flag = false;
  switch (validationFor) {
    case LANDING_PAGE:
      flag = landingPageValidate(data);
      break;

    default:
      flag = true;
      break;
  }
  return flag;
};
