import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import { getOfflineDownloadDb, saveOfflineDownloadDb } from '../../realm/queries';

const { reduxConst } = appConstants;
const {
  OFFLINE_DOWNLOAD_GET_INIT,
  OFFLINE_DOWNLOAD_SET,
  OFFLINE_DOWNLOAD_SAVE_INIT,
  OFFLINE_DOWNLOAD_RESET_INIT,
  OFFLINE_DOWNLOAD_RESET
} = reduxConst;

/**
 * Get offline download data
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* getOfflineDownloadRedux({ promise }) {
  try {
    const offlineObj = yield call(getOfflineDownloadDb);
    yield put({
      type: OFFLINE_DOWNLOAD_SET,
      offlineObj
    });
    promise.resolve(offlineObj);
  } catch (err) {
    console.log({ err });
  }
}

function* getOfflineDownload() {
  yield takeEvery(OFFLINE_DOWNLOAD_GET_INIT, getOfflineDownloadRedux);
}

/**
 * Save offline download data
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* saveOfflineDownloadRedux({ promise, offlineObj }) {
  try {
    yield call(saveOfflineDownloadDb, offlineObj);
    yield put({
      type: OFFLINE_DOWNLOAD_SET,
      offlineObj
    });
    promise.resolve(offlineObj);
  } catch (err) {
    console.log({ err });
  }
}

function* saveOfflineDownload() {
  yield takeEvery(OFFLINE_DOWNLOAD_SAVE_INIT, saveOfflineDownloadRedux);
}


/**
 * Reset offline download data
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* resetOfflineDownloadRedux({ promise }) {
  try {
    yield put({
      type: OFFLINE_DOWNLOAD_RESET
    });
    promise.resolve();
  } catch (err) {
    console.log({ err });
  }
}

function* resetOfflineDownload() {
  yield takeEvery(OFFLINE_DOWNLOAD_RESET_INIT, resetOfflineDownloadRedux);
}

export {
  getOfflineDownload,
  saveOfflineDownload,
  resetOfflineDownload
};
