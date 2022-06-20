import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import {
  getLandingPageData,
  saveLandingPageData,
  deleteCountryDataDb
} from '../../realm/queries';
import { getCountries } from '../../services';
import { saveDailyApiCheckDb, getDailyApiCheckDb } from '../../realm/queries/dailyApiCheck';
import { sortCountriesAndLanguage } from '../../config/libs/helpers';

const { reduxConst, apiNames } = appConstants;
const {
  COUNTRIES_GET,
  COUNTRIES_GET_SUCCESS,
  COUNTRIES_GET_ERROR,
  COUNTRIES_GET_LOADING
} = reduxConst;

/**
 * Get language and countries and save in database and daily check for data sync
 * @param {Object} promise tells calling function success or failure
 * @return {Promise} Returns the prosmise resolve or reject
 */
export function* getCountry({ promise }) {
  try {
    yield put({
      type: COUNTRIES_GET_LOADING
    });

    let isDataUpdated = false;
    const isApiCalled = yield call(getDailyApiCheckDb, apiNames.COUNTRY_LANGUAGE_GET, 'country');
    const landingPageData = yield call(getLandingPageData);

    let obj = {};
    if (!landingPageData) {
      obj = yield call(getCountries);
    } else if (isApiCalled) {
      obj = landingPageData;
    } else {
      const serviceData = yield call(getCountries);
      if (serviceData.createdAt === landingPageData.createdAt) {
        obj = landingPageData;
      } else {
        isDataUpdated = true;
        obj = serviceData;
        yield call(deleteCountryDataDb);
      }
    }
    let slectedCountry = null;
    let selectedLanguage = null;

    let countries = null;
    if (obj.data[0]) {
      const { data } = obj;
      // eslint-disable-next-line prefer-destructuring
      slectedCountry = data[0];
      // eslint-disable-next-line prefer-destructuring
      selectedLanguage = data[0].languages[0];
      countries = sortCountriesAndLanguage(obj.data);
    }

    yield put({
      type: COUNTRIES_GET_SUCCESS,
      arr: countries,
      slectedCountry,
      selectedLanguage
    });
    yield call(promise.resolve);

    if (!landingPageData || isDataUpdated) {
      yield call(saveLandingPageData, obj);
    }
    if (!isApiCalled) {
      yield call(saveDailyApiCheckDb, apiNames.COUNTRY_LANGUAGE_GET, 'country');
    }
  } catch (err) {
    yield put({
      type: COUNTRIES_GET_ERROR
    });
    yield call(promise.reject);
  }
}

function* getCountriesSaga() {
  yield takeEvery(COUNTRIES_GET, getCountry);
}

export default getCountriesSaga;
