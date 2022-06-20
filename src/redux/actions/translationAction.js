import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { TRANSLATION_DATA_GET_INIT } = reduxConst;

/**
 * Get/load translation list and save translation list into database
 * @param  {function} dispatch the action to redux-saga
 * @return {object}   Object with promise and list of translations
 */
const getTranslationData = (dispatch) => new Promise((resolve, reject) => {
  dispatch({
    type: TRANSLATION_DATA_GET_INIT,
    promise: { resolve, reject }
  });
});

export default getTranslationData;
