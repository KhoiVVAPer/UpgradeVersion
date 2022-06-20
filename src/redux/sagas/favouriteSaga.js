import {
  put, takeEvery, call
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import {
  saveFavouriteContentDb,
  editFavouriteContentDb,
  editFavouriteFolderDb,
  deleteFolderContentDb,
  deleteFolderDb,
  saveFavouriteFolderDb,
  duplicateFolderDb,
  getFavouriteDb,
  updatePositionFavouriteContentDb
} from '../../realm/queries/favourite';

const { reduxConst } = appConstants;
const {
  FAVOURITE_CONTENT_SAVE,
  FAVOURITE_CONTENT_EDIT,
  FAVOURITE_FOLDER_EDIT,
  FAVOURITE_CONTENT_DELETE,
  FAVOURITE_FOLDER_DELETE,
  FAVOURITE_FOLDER_SAVE,
  FAVOURITE_FOLDER_DUPLICATE,
  FAVOURITE_SET,
  FAVOURITE_GET,
  FAVOURITE_LOADING,
  UPDATE_FAVOURITE_POSITION,
  FAVOURITE_LIST_SET
} = reduxConst;

/**
 * Save favourite page data
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @param {!Object} favouriteData is data of favourite page to be saved
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* saveFavouriteContentRedux({ promise, favouriteData }) {
  try {
    yield put({
      type: FAVOURITE_LOADING
    });
    yield call(saveFavouriteContentDb, favouriteData);
    const favouriteList = yield call(getFavouriteDb);
    yield put({
      type: FAVOURITE_SET,
      obj: favouriteList
    });
    promise.resolve(favouriteList);
  } catch (err) {
    console.log({ err });
  }
}

function* saveFavouriteContent() {
  yield takeEvery(FAVOURITE_CONTENT_SAVE, saveFavouriteContentRedux);
}


function* updateFavouritePositionRedux({ promise, favouriteData }) {
  try {
    yield call(updatePositionFavouriteContentDb, favouriteData);
    const { favouriteContent } = favouriteData;
    yield put({
      type: FAVOURITE_LIST_SET,
      favouriteContent
    });
    promise.resolve(favouriteContent);
  } catch (err) {
    console.log({ err });
  }
}

function* updateFavouritePositionSaga() {
  yield takeEvery(UPDATE_FAVOURITE_POSITION, updateFavouritePositionRedux);
}

/**
 * Edit favourite page data
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @param {!Object} favouriteData is data of favourite page to be saved
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* editFavouriteContentRedux({ promise, favouriteData }) {
  try {
    yield put({
      type: FAVOURITE_LOADING
    });
    yield call(editFavouriteContentDb, favouriteData);
    const favouriteList = yield call(getFavouriteDb);
    yield put({
      type: FAVOURITE_SET,
      obj: favouriteList
    });
    promise.resolve(favouriteList);
  } catch (err) {
    console.log({ err });
  }
}

function* editFavouriteContent() {
  yield takeEvery(FAVOURITE_CONTENT_EDIT, editFavouriteContentRedux);
}

/**
 * Edit favourite folder name
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @param {!Object} folderData is id and name of favourite folder to be updated
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* editFavouriteFolderRedux({ promise, folderData }) {
  try {
    yield put({
      type: FAVOURITE_LOADING
    });
    yield call(editFavouriteFolderDb, folderData);
    const favouriteList = yield call(getFavouriteDb);
    yield put({
      type: FAVOURITE_SET,
      obj: favouriteList
    });
    promise.resolve(favouriteList);
  } catch (err) {
    console.log({ err });
  }
}

function* editFavouriteFolder() {
  yield takeEvery(FAVOURITE_FOLDER_EDIT, editFavouriteFolderRedux);
}

/**
 * Save favourite folder data
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @param {!Object} favouriteFolderData is data of favourite folder to be saved
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* saveFavouriteFolderRedux({ promise, favouriteFolderData }) {
  try {
    yield put({
      type: FAVOURITE_LOADING
    });
    yield call(saveFavouriteFolderDb, favouriteFolderData);
    const favouriteList = yield call(getFavouriteDb);
    yield put({
      type: FAVOURITE_SET,
      obj: favouriteList
    });
    promise.resolve(favouriteList);
  } catch (err) {
    console.log({ err });
  }
}

function* saveFavouriteFolder() {
  yield takeEvery(FAVOURITE_FOLDER_SAVE, saveFavouriteFolderRedux);
}


/**
 * Get favourite page data
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* getFavouriteContentRedux({ promise }) {
  try {
    yield put({
      type: FAVOURITE_LOADING
    });
    const favouriteList = yield call(getFavouriteDb);
    yield put({
      type: FAVOURITE_SET,
      obj: favouriteList
    });
    promise.resolve(favouriteList);
  } catch (err) {
    console.log({ err });
  }
}

function* getFavouriteContent() {
  yield takeEvery(FAVOURITE_GET, getFavouriteContentRedux);
}

/**
 * Delete favurite page data
 * @param {Object} promise tells calling function success or
 * @param {Int} id is favourite page unique key
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* deleteFavouriteContentRedux({ promise, id }) {
  try {
    yield call(deleteFolderContentDb, id);
    const favouriteList = yield call(getFavouriteDb);
    yield put({
      type: FAVOURITE_SET,
      obj: favouriteList
    });
    promise.resolve(favouriteList.favouriteContent);
  } catch (err) {
    console.log({ err });
  }
}

function* deleteFavouriteContent() {
  yield takeEvery(FAVOURITE_CONTENT_DELETE, deleteFavouriteContentRedux);
}

/**
 * Delete favorite folder
 * @param {Object} promise tells calling function success or
 * @param {Int} id is favourite folder unique key
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* deleteFavouriteFoldertRedux({ promise, id }) {
  try {
    yield call(deleteFolderDb, id);
    const favouriteList = yield call(getFavouriteDb);
    yield put({
      type: FAVOURITE_SET,
      obj: favouriteList
    });
    promise.resolve(favouriteList);
  } catch (err) {
    console.log({ err });
  }
}

function* deleteFavouriteFolder() {
  yield takeEvery(FAVOURITE_FOLDER_DELETE, deleteFavouriteFoldertRedux);
}

/**
 * Duplicate favorite folder
 * @param {Object} promise tells calling function success or
 * @param {Int} id is favourite folder unique key
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* duplicateFavouriteFoldertRedux({ promise, folderData, folderName }) {
  try {
    yield call(duplicateFolderDb, folderData, folderName);
    const favouriteList = yield call(getFavouriteDb);
    yield put({
      type: FAVOURITE_SET,
      obj: favouriteList
    });
    promise.resolve(favouriteList);
  } catch (err) {
    console.log({ err });
  }
}

function* duplicateFavouriteFolder() {
  yield takeEvery(FAVOURITE_FOLDER_DUPLICATE, duplicateFavouriteFoldertRedux);
}

export {
  saveFavouriteContent,
  editFavouriteContent,
  editFavouriteFolder,
  saveFavouriteFolder,
  getFavouriteContent,
  deleteFavouriteContent,
  deleteFavouriteFolder,
  duplicateFavouriteFolder,
  updateFavouritePositionSaga
};
