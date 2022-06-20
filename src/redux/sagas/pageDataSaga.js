import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import { getPageDataService } from '../../services';
import {
  savePageDataDb,
  getPageDataDb,
  deletePageDataDb,
  saveDailyApiCheckDb,
  getDailyApiCheckDb
} from '../../realm/queries';

const { reduxConst, apiNames } = appConstants;
const {
  PAGE_DATA_GET,
  PAGE_DATA_GET_SUCCESS,
  PAGE_DATA_GET_ERROR,
  PAGE_DATA_GET_LOADING
} = reduxConst;

/**
 * Get page meta data and page content data
 * @param {Object} promise tells calling function success or failure
 * @param {Int} pageId is unique key of page
 * @return {Promise} prosmise resolve or reject with page data
 */
function* getPageData({ promise, pageId }) {
  try {
    yield put({
      type: PAGE_DATA_GET_LOADING,
      pageId
    });

    let isDataUpdated = false;
    const isApiCalled = yield call(getDailyApiCheckDb, apiNames.PAGE_CONTENT_GET, pageId);
    const pageData = yield call(getPageDataDb, pageId);

    let obj = {};
    if (!pageData) {
      obj = yield call(getPageDataService, pageId);
    } else if (isApiCalled) {
      obj = pageData;
    } else {
      const serviceData = yield call(getPageDataService, pageId);
      if (serviceData.createdAt === pageData.createdAt) {
        obj = pageData;
      } else {
        isDataUpdated = true;
        obj = serviceData;
        yield call(deletePageDataDb, pageId);
      }
    }

    yield put({
      type: PAGE_DATA_GET_SUCCESS,
      pageId,
      obj
    });
    yield call(promise.resolve);

    if (!pageData || isDataUpdated) {
      yield call(savePageDataDb, pageId, obj);
    }
    if (!isApiCalled) {
      yield call(saveDailyApiCheckDb, apiNames.PAGE_CONTENT_GET, pageId);
    }
  } catch (err) {
    yield put({
      type: PAGE_DATA_GET_ERROR,
      pageId
    });
    yield call(promise.reject);
  }
}

function* getPageDataSaga() {
  yield takeEvery(PAGE_DATA_GET, getPageData);
}

export default getPageDataSaga;
