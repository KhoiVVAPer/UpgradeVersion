import {
  put, takeEvery, call
} from 'redux-saga/effects';
import { appConstants, globals } from '../../config';
import { getTranslations } from '../../services';
import {
  saveTranslationDb,
  getTranslationDataDb,
  deleteTranslationDataDb,
  saveDailyApiCheckDb,
  getDailyApiCheckDb
} from '../../realm/queries';

const { reduxConst, apiNames } = appConstants;
const {
  TRANSLATION_DATA_GET_INIT,
  TRANSLATION_DATA_SUCCESS,
  TRANSLATION_DATA_ERROR,
  TRANSLATION_DATA_LOADING
} = reduxConst;

/**
 * Get/save sub translation from api or database
 * @param {Object} promise tells calling function success or failure
 * @return {Promise} prosmise resolve or reject with translation data
 */
function* getTranslationRedux({ promise }) {
  try {
    yield put({
      type: TRANSLATION_DATA_LOADING
    });

    let isDataUpdated = false;
    const isApiCalled = yield call(getDailyApiCheckDb, apiNames.TRANSLATION_GET, 1);
    const translationData = yield call(getTranslationDataDb);
    let obj = [];
    if (!translationData) {
      obj = yield call(getTranslations);
    } else if (isApiCalled) {
      obj = translationData;
    } else {
      const serviceData = yield call(getTranslations);
      if (serviceData.createdAt === translationData.createdAt) {
        obj = translationData;
      } else {
        isDataUpdated = true;
        obj = serviceData;
        yield call(deleteTranslationDataDb);
      }
    }

    yield put({
      type: TRANSLATION_DATA_SUCCESS,
      arr: JSON.parse(obj.data)
    });

    globals.SET_APP_DATA('translationsArr', JSON.parse(obj.data));
    yield call(promise.resolve);
    if (!translationData || isDataUpdated) {
      yield call(saveTranslationDb, obj);
    }
    if (!isApiCalled) {
      yield call(saveDailyApiCheckDb, apiNames.TRANSLATION_GET, 1);
    }
  } catch (err) {
    yield put({
      type: TRANSLATION_DATA_ERROR
    });
  }
}

function* getTranslation() {
  yield takeEvery(TRANSLATION_DATA_GET_INIT, getTranslationRedux);
}

export default getTranslation;
