import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { PRODUCT_GROUPS_GET } = reduxConst;

/**
 * Get/load product group list and save product group list into database
 * @param  {function} dispatch the action to redux-saga
 * @param  {int}      productgroupId is unique key of product group to be loaded
 * @return {object}   Object with promise and list of product group list
 */
const getProductGroups = (dispatch, productgroupId) => new Promise((resolve, reject) => {
  dispatch({
    type: PRODUCT_GROUPS_GET,
    promise: { resolve, reject },
    productgroupId
  });
});

export default getProductGroups;
