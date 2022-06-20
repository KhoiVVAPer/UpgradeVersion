import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants, globals, helpers } from '../../config';
import {
  saveProductDetailsDb,
  getProductDetailsDb,
  deleteProductDetailsDb,
  saveDailyApiCheckDb,
  getDailyApiCheckDb,
  getProductRecommendationsDb,
  deleteProductRecommendationDb,
  saveProductRecommendationsDb
} from '../../realm/queries';
import { getProductDetailsService } from '../../services';

const { reduxConst, apiNames } = appConstants;
const {
  PRODUCT_DETAILS_GET,
  PRODUCT_DETAILS_GET_SUCCESS,
  PRODUCT_DETAILS_GET_ERROR,
  PRODUCT_DETAILS_GET_LOADING
} = reduxConst;

/**
 * Get/save product details data from api or databse
 * @param {Object} promise tells calling function success or failure
 * @param {Int} productId is unique key of product
 * @return {Promise} prosmise resolve or reject with product details
 */
function* getProductDetails({ promise, productId }) {
  try {
    yield put({
      type: PRODUCT_DETAILS_GET_LOADING,
      productId
    });

    let isDataUpdated = false;
    let getUpdatedData = true;
    let saveRecommendations = false;
    const isApiCalled = yield call(getDailyApiCheckDb, apiNames.PRODUCT_DETAILS, productId);
    const productData = yield call(getProductDetailsDb, productId);
    const isNetConnected = yield helpers.isNetConnected();
    const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');
    // const productRecommendations = yield call(getProductDetailsDb, productId);
    let obj = {};
    let recommendationsData = null;
    if (!productData) {
      const response = yield call(getProductDetailsService, productId);
      // eslint-disable-next-line prefer-destructuring
      saveRecommendations = true;
      getUpdatedData = false;
      // eslint-disable-next-line prefer-destructuring
      obj = response.data[0];
      recommendationsData = response.recommendationsData;
    } else if (isApiCalled) {
      obj = productData;
      const { partnumber } = JSON.parse(productData.data);
      recommendationsData = yield call(getProductRecommendationsDb, `${activeLanguageData.countryCode}-${activeLanguageData.languageCode}-${partnumber}`);
      if (recommendationsData || !isNetConnected) getUpdatedData = false;
    }
    if (getUpdatedData) {
      const serviceData = yield call(getProductDetailsService, productId);
      if (productData && serviceData.createdAt === productData.createdAt) {
        obj = productData;
        const { partnumber } = JSON.parse(productData.data);
        recommendationsData = yield call(getProductRecommendationsDb, `${activeLanguageData.countryCode}-${activeLanguageData.languageCode}-${partnumber}`);
        if (!recommendationsData) {
          recommendationsData = serviceData.recommendationsData;
          saveRecommendations = true;
        }
      } else {
        isDataUpdated = true;
        // eslint-disable-next-line prefer-destructuring
        obj = serviceData.data[0];
        const { partnumber } = JSON.parse(obj.data);
        recommendationsData = serviceData.recommendationsData;
        saveRecommendations = true;
        yield call(deleteProductDetailsDb, productId);
        yield call(deleteProductRecommendationDb, `${activeLanguageData.countryCode}-${activeLanguageData.languageCode}-${partnumber}`);
      }
    }

    if (obj.data) {
      obj.recomendationsData = recommendationsData;
    }

    yield put({
      type: PRODUCT_DETAILS_GET_SUCCESS,
      obj,
      productId
    });

    yield call(promise.resolve, obj);
    if (!productData || isDataUpdated) {
      const { partnumber } = JSON.parse(obj.data);
      yield call(saveProductDetailsDb, productId, obj);
      if (saveRecommendations && obj.recomendationsData) {
        yield call(saveProductRecommendationsDb, `${activeLanguageData.countryCode}-${activeLanguageData.languageCode}-${partnumber}`, obj.recomendationsData, partnumber);
      }
    }
    if (!isApiCalled) {
      yield call(saveDailyApiCheckDb, apiNames.PRODUCT_DETAILS, productId);
    }
  } catch (err) {
    yield put({
      type: PRODUCT_DETAILS_GET_ERROR,
      productId
    });
    yield call(promise.reject);
  }
}

function* getProductDetailsSaga() {
  yield takeEvery(PRODUCT_DETAILS_GET, getProductDetails);
}

export default getProductDetailsSaga;
