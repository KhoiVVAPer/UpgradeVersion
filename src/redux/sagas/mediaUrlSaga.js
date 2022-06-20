import {
  put, takeEvery, call
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import {
  saveMediaUrlDb,
  getMediaUrlDb
} from '../../realm/queries';

const { reduxConst, catelogueTypes } = appConstants;
const {
  MEDIA_URL_SAVE_INIT,
  MEDIA_URL_GET_INIT,
  MEDIA_URL_GET,
  MEDIA_URL_LOADING
} = reduxConst;

/**
 * Get media url
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @return {Promise} Returns the promise resolve or reject
 */
function* getMediaUrlRedux({ promise }) {
  try {
    yield put({
      type: MEDIA_URL_LOADING
    });
    const mediaUrls = yield call(getMediaUrlDb);
    yield put({
      type: MEDIA_URL_GET,
      mediaUrls: mediaUrls[catelogueTypes.HOME_AND_GARDEN],
      mediaType: catelogueTypes.HOME_AND_GARDEN
    });
    yield put({
      type: MEDIA_URL_GET,
      mediaUrls: mediaUrls[catelogueTypes.PROFFESSIONAL],
      mediaType: catelogueTypes.PROFFESSIONAL
    });
    promise.resolve(mediaUrls);
  } catch (err) {
    console.log({ err });
  }
}

function* getMediaUrl() {
  yield takeEvery(MEDIA_URL_GET_INIT, getMediaUrlRedux);
}

/**
 * Save media url
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @param {Array} mediaUrls list of media urls to save in database
 * @return {Promise} Returns the promise resolve or reject
 */
function* saveMediaUrlRedux({ promise, mediaUrls, mediaType }) {
  try {
    yield put({
      type: MEDIA_URL_LOADING
    });
    yield call(saveMediaUrlDb, mediaUrls, mediaType);
    yield put({
      type: MEDIA_URL_GET,
      mediaUrls,
      mediaType
    });
    promise.resolve(mediaUrls);
  } catch (err) {
    console.log({ err });
  }
}

function* saveMediaUrl() {
  yield takeEvery(MEDIA_URL_SAVE_INIT, saveMediaUrlRedux);
}


export { getMediaUrl, saveMediaUrl };
