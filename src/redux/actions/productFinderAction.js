import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { PRODUCT_FINDER_GET } = reduxConst;

/**
 * Get list of countires and saved into database
 * @param  {function} dispatch the action to readux-saga
 * @return {object}   Object with promise and list of languages and countries
 */
const productFinder = (dispatch, selectedAnswer) => new Promise((resolve, reject) => {
  dispatch({
    type: PRODUCT_FINDER_GET,
    promise: { resolve, reject },
    selectedAnswer
  });
});

export default productFinder;
