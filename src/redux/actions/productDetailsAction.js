import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { PRODUCT_DETAILS_GET } = reduxConst;

/**
 * Get/load product details data and save product details data into database
 * @param  {function} dispatch the action to redux-saga
 * @param  {int}      productId is unique key of product to be loaded
 * @return {object}   Object with promise and list of product details
 */
const getProductDetails = (dispatch, productId) => new Promise((resolve, reject) => {
  dispatch({
    type: PRODUCT_DETAILS_GET,
    promise: { resolve, reject },
    productId
  });
});

export default getProductDetails;
