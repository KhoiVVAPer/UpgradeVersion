import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { SUB_PRODUCT_GROUPS_GET, SUB_PRODUCT_GROUPS_ARR_GET } = reduxConst;

/**
 * Get/load sub-product list and save product list into database
 * @param  {function} dispatch the action to redux-saga
 * @param  {int}      productgroupId is unique key of sub-product group list to be loaded
 * @return {object}   Object with promise and list of sub-product list
 */
const getSubProductGroups = (dispatch, productgroupId) => new Promise((resolve, reject) => {
  dispatch({
    type: SUB_PRODUCT_GROUPS_GET,
    promise: { resolve, reject },
    productgroupId
  });
});

/**
 * Get/load multiple sub-product list and save product list into database
 * @param  {function} dispatch the action to redux-saga
 * @param  {int}      productgroupId is unique key of sub-product group list to be loaded
 * @return {object}   Object with promise and list of sub-product list
 */
const getSubProductGroupsArr = (dispatch, productgroupIdArr) => new Promise((resolve, reject) => {
  dispatch({
    type: SUB_PRODUCT_GROUPS_ARR_GET,
    promise: { resolve, reject },
    productgroupIdArr
  });
});

export { getSubProductGroups, getSubProductGroupsArr };
