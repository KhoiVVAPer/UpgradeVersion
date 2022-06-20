import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { PRODUCT_LIST_GET } = reduxConst;

/**
 * Get/load product list and save product list into database
 * @param  {function} dispatch the action to redux-saga
 * @param  {int}      productgroupId is unique key of product list to be loaded
 * @return {object}   Object with promise and list of product list
 */
const getProductList = (dispatch, productgroupId) => new Promise((resolve, reject) => {
  dispatch({
    type: PRODUCT_LIST_GET,
    promise: { resolve, reject },
    productgroupId
  });
});

export default getProductList;
