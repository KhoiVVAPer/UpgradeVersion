import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import { getSubProductGroupArr } from '../../services';
import {
  saveSubProductDataArrDb,
  getSubProductDataArrDb
} from '../../realm/queries';

const { reduxConst } = appConstants;
const {
  SUB_PRODUCT_GROUPS_ARR_GET,
  SUB_PRODUCT_GROUPS_GET_ARR_SUCCESS,
  SUB_PRODUCT_GROUPS_GET_ARR_ERROR,
  SUB_PRODUCT_GROUPS_GET_ARR_LOADING
} = reduxConst;

/**
 * Get/save sub product group data from api or database
 * @param {Object} promise tells calling function success or failure
 * @param {Int} productgroupId is unique key of product group
 * @return {Promise} prosmise resolve or reject with suv product group list
 */
function* getSubProductGroupsArr({ promise, productgroupIdArr }) {
  try {
    yield put({
      type: SUB_PRODUCT_GROUPS_GET_ARR_LOADING,
      productgroupIdArr
    });

    let subProductGroupDataArr = yield call(getSubProductDataArrDb, productgroupIdArr);

    let obj = {};
    if (!subProductGroupDataArr || subProductGroupDataArr.length === 0) {
      obj = yield call(getSubProductGroupArr, productgroupIdArr);
    }

    if (!subProductGroupDataArr || subProductGroupDataArr.length === 0) {
      yield call(saveSubProductDataArrDb, productgroupIdArr, obj);
      subProductGroupDataArr = [];

      const dataArr = [...obj.data];
      const metaObj = { ...obj, data: [] };
      productgroupIdArr.map((productgroupId) => {
        const filteredDataArr = dataArr.filter((item) => (item.parentId === parseInt(productgroupId)));
        subProductGroupDataArr.push({
          ...metaObj,
          productgroupId,
          data: filteredDataArr
        });
        return null;
      });
    }
    yield put({
      type: SUB_PRODUCT_GROUPS_GET_ARR_SUCCESS,
      subProductGroupDataArr
    });
    yield call(promise.resolve, subProductGroupDataArr);
  } catch (err) {
    yield put({
      type: SUB_PRODUCT_GROUPS_GET_ARR_ERROR,
      productgroupIdArr
    });
    yield call(promise.reject);
  }
}

function* getSubProductGroupArrSaga() {
  yield takeEvery(SUB_PRODUCT_GROUPS_ARR_GET, getSubProductGroupsArr);
}

export default getSubProductGroupArrSaga;
