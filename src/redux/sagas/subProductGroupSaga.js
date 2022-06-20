import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import { getSubProductGroup } from '../../services';
import {
  saveSubProductDataDb,
  getSubProductDataDb,
  deleteSubProductDataDb,
  saveDailyApiCheckDb,
  getDailyApiCheckDb
} from '../../realm/queries';

const { reduxConst, apiNames } = appConstants;
const {
  SUB_PRODUCT_GROUPS_GET,
  SUB_PRODUCT_GROUPS_GET_SUCCESS,
  SUB_PRODUCT_GROUPS_GET_ERROR,
  SUB_PRODUCT_GROUPS_GET_LOADING
} = reduxConst;

/**
 * Get/save sub product group data from api or database
 * @param {Object} promise tells calling function success or failure
 * @param {Int} productgroupId is unique key of product group
 * @return {Promise} prosmise resolve or reject with suv product group list
 */
function* getSubProductGroups({ promise, productgroupId }) {
  try {
    yield put({
      type: SUB_PRODUCT_GROUPS_GET_LOADING,
      productgroupId
    });

    let isDataUpdated = false;
    const isApiCalled = yield call(getDailyApiCheckDb, apiNames.SUB_PRODUCT_GROUP_GET, productgroupId);
    const subProductGroupData = yield call(getSubProductDataDb, productgroupId);

    let obj = {};
    if (!subProductGroupData || subProductGroupData.length === 0) {
      obj = yield call(getSubProductGroup, productgroupId);
    } else if (isApiCalled) {
      // eslint-disable-next-line prefer-destructuring
      obj = subProductGroupData[0];
    } else {
      const serviceData = yield call(getSubProductGroup, productgroupId);
      if (serviceData.createdAt === subProductGroupData[0].createdAt) {
        // eslint-disable-next-line prefer-destructuring
        obj = subProductGroupData[0];
      } else {
        isDataUpdated = true;
        obj = serviceData;
        yield call(deleteSubProductDataDb, productgroupId);
      }
    }

    yield put({
      type: SUB_PRODUCT_GROUPS_GET_SUCCESS,
      obj,
      productgroupId
    });
    yield call(promise.resolve, obj);
    if (!subProductGroupData || subProductGroupData.length === 0 || isDataUpdated) {
      yield call(saveSubProductDataDb, productgroupId, obj);
    }
    if (!isApiCalled) {
      yield call(saveDailyApiCheckDb, apiNames.SUB_PRODUCT_GROUP_GET, productgroupId);
    }
  } catch (err) {
    yield put({
      type: SUB_PRODUCT_GROUPS_GET_ERROR,
      productgroupId
    });
    yield call(promise.reject);
  }
}

function* getSubProductGroupSaga() {
  yield takeEvery(SUB_PRODUCT_GROUPS_GET, getSubProductGroups);
}

export default getSubProductGroupSaga;
