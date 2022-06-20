/**
 * @fileoverview All the texts in application are translated
 * in appropriate format using this function.
 * @package
 */
import appConstants from './constants';
import translations from '../../assets/data/translation';

const { textCasing } = appConstants;
const translate = (store, key, originalText, textCase = textCasing.N) => {
  const translationObj = store && store[0] ? store[0] : translations[0];
  let value = '';

  if (translationObj[key]) {
    value = translationObj[key];
  } else if (translations[0][key]) {
    value = translations[0][key];
  } else {
    value = originalText;
  }

  if (textCase === textCasing.U) {
    value = value.toUpperCase();
  }
  if (textCase === textCasing.L) {
    value = value.toLocaleLowerCase();
  }
  if (textCase === textCasing.UF) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }

  return value;
};

export default translate;
