import {
  put, takeEvery, call
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import {
  saveProductCompareDb,
  saveAllProductCompareDb,
  getProductCompareDb,
  deleteAllProductCompareDb
} from '../../realm/queries';

const { reduxConst } = appConstants;
const {
  PRODUCT_COMPARE_TOGGLE,
  PRODUCT_COMPARE_TOGGLE_INIT,
  REPLACE_PRODUCT_COMPARE_DATA,
} = reduxConst;

/**
 * Save/removed product for copare
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @param {!Object} productId is unique key of product
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* toggleProductCompareRedux({ promise, productId }) {
  try {
    if (productId) {
      yield call(saveProductCompareDb, productId);
    }
    const compareList = yield call(getProductCompareDb);
    yield put({
      type: PRODUCT_COMPARE_TOGGLE,
      compareList
    });
    promise.resolve(compareList);
  } catch (err) {
    console.log({ err });
  }
}

/**
 * Replaced the product compare data with the selected favourite product compare data
 * @param {Object} promise tells calling function success or
 * failure of the function
 * @param {Array} productList List of ProductIds to add to product compare
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* setFavouriteProductCompareRedux({ promise, productList }) {
  try {
    yield call(deleteAllProductCompareDb);
    yield call(saveAllProductCompareDb, productList);
    const compareList = yield call(getProductCompareDb);
    yield put({
      type: PRODUCT_COMPARE_TOGGLE,
      compareList
    });
    promise.resolve(compareList);
  } catch (err) {
    console.log({ err });
  }
}

function* toggleProductCompareSaga() {
  yield takeEvery(PRODUCT_COMPARE_TOGGLE_INIT, toggleProductCompareRedux);
}

function* setFavouriteProductCompareSaga() {
  yield takeEvery(REPLACE_PRODUCT_COMPARE_DATA, setFavouriteProductCompareRedux);
}

export { toggleProductCompareSaga, setFavouriteProductCompareSaga };
