import {
  Alert
} from 'react-native';
import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import {
  getLandingPageData,
  saveLandingPageData,
  deleteCountryDataDb
} from '../../realm/queries';
import { getProductFinder } from '../../services';
import { saveDailyApiCheckDb, getDailyApiCheckDb } from '../../realm/queries/dailyApiCheck';
import { sortCountriesAndLanguage } from '../../config/libs/helpers';

const { reduxConst, apiNames } = appConstants;
const {
  PRODUCT_FINDER_GET,
  PRODUCT_FINDER_GET_SUCCESS,
  PRODUCT_FINDER_GET_ERROR,
  PRODUCT_FINDER_GET_LOADING,
} = reduxConst;

/**
 * Get language and countries and save in database and daily check for data sync
 * @param {Object} promise tells calling function success or failure
 * @return {Promise} Returns the prosmise resolve or reject
 */
export function* productFinder({ promise, selectedAnswer }) {
  try {
    yield put({
      type: PRODUCT_FINDER_GET_LOADING
    });

    //   let isDataUpdated = false;
    //   const isApiCalled = yield call(getDailyApiCheckDb, apiNames.COUNTRY_LANGUAGE_GET, 'country');
    //   const landingPageData = yield call(getLandingPageData);
    const serviceData = yield call(getProductFinder, selectedAnswer);
    //   let obj = {};
    //   if (!landingPageData) {
    //     obj = yield call(getProductFinder);
    //   } else if (isApiCalled) {
    //     obj = landingPageData;
    //   } else {
    //     const serviceData = yield call(getProductFinder);
    //     if (serviceData.createdAt === landingPageData.createdAt) {
    //       obj = landingPageData;
    //     } else {
    //       isDataUpdated = true;
    //       obj = serviceData;
    //       yield call(deleteCountryDataDb);
    //     }
    //   }
    //   let slectedCountry = null;
    //   let selectedLanguage = null;

    //   let countries = null;
    //   if (obj.data[0]) {
    //     const { data } = obj;
    //     // eslint-disable-next-line prefer-destructuring
    //     slectedCountry = data[0];
    //     // eslint-disable-next-line prefer-destructuring
    //     selectedLanguage = data[0].languages[0];
    //     countries = sortCountriesAndLanguage(obj.data);
    //   }

    yield put({
      type: PRODUCT_FINDER_GET_SUCCESS,
      arr: serviceData,
      // slectedCountry,
      // selectedLanguage
    });
    yield call(promise.resolve);

    //   if (!landingPageData || isDataUpdated) {
    //     yield call(saveLandingPageData, obj);
    //   }
    //   if (!isApiCalled) {
    //     yield call(saveDailyApiCheckDb, apiNames.COUNTRY_LANGUAGE_GET, 'country');
    //   }
  } catch (err) {
    yield put({
      type: PRODUCT_FINDER_GET_ERROR
    });
    yield call(promise.reject);
  }
}

function* getProductFinderSaga() {
  yield takeEvery(PRODUCT_FINDER_GET, productFinder);
}

export default getProductFinderSaga;
