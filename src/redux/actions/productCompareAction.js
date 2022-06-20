import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { PRODUCT_COMPARE_TOGGLE_INIT, REPLACE_PRODUCT_COMPARE_DATA } = reduxConst;

/**
 * Add/remove product for comparison
 * @param  {function} dispatch the action to readux-saga
 * @param  {int}      prodictId is the unique key of product to be added for comparison
 * @return {object}   Object with promise and list of products added for comparison
 */
const toggleProductCompare = (dispatch, productId) => new Promise((resolve, reject) => {
  dispatch({
    type: PRODUCT_COMPARE_TOGGLE_INIT,
    promise: { resolve, reject },
    productId
  });
});

/**
 * Replaced the product compare data with the selected favourite product compare data
 * @param  {function} dispatch the action to readux-saga
 * @param {Array} productList List of ProductIds to add to product compare
 * @return {Promise} Object with promise and list of products added for comparison
 */
const setFavouriteProductCompare = (dispatch, productList) => new Promise((resolve, reject) => {
  dispatch({
    type: REPLACE_PRODUCT_COMPARE_DATA,
    promise: { resolve, reject },
    productList
  });
});

export { toggleProductCompare, setFavouriteProductCompare };
