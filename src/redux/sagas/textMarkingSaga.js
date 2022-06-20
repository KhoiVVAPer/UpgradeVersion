import {
  put, takeEvery, call
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import {
  getMarkingListDb,
  saveMarkingDb,
  deleteMarkingListDb
} from '../../realm/queries';

const { reduxConst } = appConstants;
const {
  MARKING_DATA_SET_INIT,
  MARKING_DATA_SET,
  MARKING_DATA_SAVE_INIT,
  MARKING_DATA_DELETE_INIT
} = reduxConst;

/**
 * Get marking list from database and set in redux
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* getMarkingDataRedux({ promise }) {
  try {
    const markingList = yield call(getMarkingListDb);
    yield put({
      type: MARKING_DATA_SET,
      markingList
    });
    promise.resolve(markingList);
  } catch (err) {
    console.log({ err });
  }
}

function* getMarkingDataSaga() {
  yield takeEvery(MARKING_DATA_SET_INIT, getMarkingDataRedux);
}

/**
 * Save marking data into database
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @param {Object} markingData data of merked text to be saved in database
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* saveMarkingDataRedux({ promise, markingData }) {
  try {
    yield call(saveMarkingDb, markingData);
    const markingList = yield call(getMarkingListDb);
    yield put({
      type: MARKING_DATA_SET,
      markingList
    });
    promise.resolve(markingList);
  } catch (err) {
    console.log({ err });
  }
}

function* saveMarkingDataSaga() {
  yield takeEvery(MARKING_DATA_SAVE_INIT, saveMarkingDataRedux);
}

/**
 * Delete marking data from database
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @param {int} id is unique key of marked text to be deleted from database
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* deleteMarkingDataRedux({ promise, markingId }) {
  try {
    yield call(deleteMarkingListDb, markingId);
    const markingList = yield call(getMarkingListDb);
    yield put({
      type: MARKING_DATA_SET,
      markingList
    });
    promise.resolve(markingList);
  } catch (err) {
    console.log({ err });
  }
}

function* deleteMarkingDataSaga() {
  yield takeEvery(MARKING_DATA_DELETE_INIT, deleteMarkingDataRedux);
}

export {
  getMarkingDataSaga,
  saveMarkingDataSaga,
  deleteMarkingDataSaga
};
