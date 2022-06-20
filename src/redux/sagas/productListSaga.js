import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import { getProductListService } from '../../services';
import {
  saveProductListDb,
  getProductListDb,
  deleteProductListDb,
  saveDailyApiCheckDb,
  getDailyApiCheckDb
} from '../../realm/queries';

const { reduxConst, apiNames } = appConstants;
const {
  PRODUCT_LIST_GET,
  PRODUCT_LIST_GET_SUCCESS,
  PRODUCT_LIST_GET_ERROR,
  PRODUCT_LIST_GET_LOADING
} = reduxConst;

/**
 * Get/save product list data from api or database
 * @param {Object} promise tells calling function success or failure
 * @param {Int} productgroupId is unique key of product group
 * @return {Promise} prosmise resolve or reject with product list
 */
function* getProductList({ promise, productgroupId }) {
  try {
    yield put({
      type: PRODUCT_LIST_GET_LOADING,
      productgroupId
    });

    let isDataUpdated = false;
    const isApiCalled = yield call(getDailyApiCheckDb, apiNames.PRODUCT_LIST, productgroupId);
    const productListData = yield call(getProductListDb, productgroupId);
    let obj = {};
    if (!productListData) {
      obj = yield call(getProductListService, productgroupId);
    } else if (isApiCalled) {
      obj = productListData;
    } else {
      const serviceData = yield call(getProductListService, productgroupId);
      if (serviceData.createdAt === productListData.createdAt) {
        obj = productListData;
      } else {
        isDataUpdated = true;
        obj = serviceData;
        yield call(deleteProductListDb, productgroupId);
      }
    }

    yield put({
      type: PRODUCT_LIST_GET_SUCCESS,
      obj,
      productgroupId
    });
    yield call(promise.resolve, obj);
    if (!productListData || isDataUpdated) {
      yield call(saveProductListDb, productgroupId, obj);
    }
    if (!isApiCalled) {
      yield call(saveDailyApiCheckDb, apiNames.PRODUCT_LIST, productgroupId);
    }
  } catch (err) {
    yield put({
      type: PRODUCT_LIST_GET_ERROR,
      productgroupId
    });
    yield call(promise.reject);
  }
}

function* getProductListSaga() {
  yield takeEvery(PRODUCT_LIST_GET, getProductList);
}

export default getProductListSaga;
