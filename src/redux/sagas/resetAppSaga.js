import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import resetDB from '../../realm/queries/resetDb';

const { reduxConst } = appConstants;
const { RESET_APP_INIT, RESET_APP } = reduxConst;

/**
 * Delete app data from database
 * @param {Object} promise tells calling function success or failure
 * @param {Boolean} isCountryChanged is flag to prompt if country is changed
 * @return {Promise} prosmise resolve or reject
 */
function* resetApp({ promise, isCountryChanged }) {
  try {
    yield call(resetDB, isCountryChanged);

    yield put({
      type: RESET_APP
    });
    yield call(promise.resolve);
  } catch (err) {
    yield call(promise.reject);
  }
}

function* resetAppSaga() {
  yield takeEvery(RESET_APP_INIT, resetApp);
}

export default resetAppSaga;
