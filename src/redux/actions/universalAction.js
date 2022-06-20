import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { UNIVERSAL_DATA_GET, UNIVERSAL_DATA_SAVE } = reduxConst;

/**
 * Get universal data
 * @return {object} Object with promise and universal
 */
const getUniversalData = (dispatch) => new Promise((resolve, reject) => {
  dispatch({
    type: UNIVERSAL_DATA_GET,
    promise: { resolve, reject }
  });
});

/**
 * Save universal data
 * @return {object} Object with promise and universal
 */
const saveUniversalData = (dispatch, dataObj, tempSkip) => new Promise((resolve, reject) => {
  dispatch({
    type: UNIVERSAL_DATA_SAVE,
    promise: { resolve, reject },
    dataObj,
    tempSkip
  });
});

export { getUniversalData, saveUniversalData };
