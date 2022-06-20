import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import { getProductGroups } from '../../services';
import {
  saveProductGroupDb,
  getProductGroupDb,
  deleteProductGroupDb,
  saveDailyApiCheckDb,
  getDailyApiCheckDb
} from '../../realm/queries';

const { reduxConst, apiNames } = appConstants;
const {
  PRODUCT_GROUPS_GET,
  PRODUCT_GROUPS_GET_SUCCESS,
  PRODUCT_GROUPS_GET_ERROR,
  PRODUCT_GROUPS_GET_LOADING
} = reduxConst;

/**
 * Get/save product group data from api or databse
 * @param {Object} promise tells calling function success or failure
 * @param {Int} productgroupId is unique key of product group
 * @return {Promise} prosmise resolve or reject with product group
 */
function* getProducts({ promise, productgroupId }) {
  try {
    yield put({
      type: PRODUCT_GROUPS_GET_LOADING,
      productgroupId
    });

    let isDataUpdated = false;
    const isApiCalled = yield call(getDailyApiCheckDb, apiNames.PRODUCT_GROUP_GET, productgroupId);
    const productGroupData = yield call(getProductGroupDb, productgroupId);

    let forceCallApi = false;
    if (productGroupData && productGroupData[0] && productGroupData[0].isDropdownAvailable && !productGroupData[0].dropdown) {
      forceCallApi = true;
      yield call(deleteProductGroupDb, productgroupId);
    }

    let obj = {};
    if ((!productGroupData || productGroupData.length === 0) || forceCallApi) {
      obj = yield call(getProductGroups, productgroupId);
    } else if (isApiCalled) {
      // eslint-disable-next-line prefer-destructuring
      obj = productGroupData[0];
    } else {
      const serviceData = yield call(getProductGroupDb, productgroupId);
      if (serviceData.createdAt === productGroupData.createdAt) {
        // eslint-disable-next-line prefer-destructuring
        obj = productGroupData[0];
      } else {
        isDataUpdated = true;
        obj = serviceData;
        yield call(deleteProductGroupDb, productgroupId);
      }
    }

    yield put({
      type: PRODUCT_GROUPS_GET_SUCCESS,
      obj,
      productgroupId
    });
    yield call(promise.resolve, obj);
    if (!productGroupData || productGroupData.length === 0 || isDataUpdated || forceCallApi) {
      yield call(saveProductGroupDb, productgroupId, obj);
    }
    if (!isApiCalled) {
      yield call(saveDailyApiCheckDb, apiNames.PRODUCT_GROUP_GET, productgroupId);
    }
  } catch (err) {
    yield put({
      type: PRODUCT_GROUPS_GET_ERROR,
      productgroupId
    });
    yield call(promise.reject);
  }
}

function* getProductsSaga() {
  yield takeEvery(PRODUCT_GROUPS_GET, getProducts);
}

export default getProductsSaga;
