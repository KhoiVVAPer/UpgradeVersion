import {
  call, put, takeEvery
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import {
  getDailyApiCheckDb,
  getPageDataDb,
  getUniversalDb,
  saveUniversalDb
} from '../../realm/queries';
import { getPageDataService } from '../../services';

const { reduxConst, apiNames } = appConstants;
const {
  UNIVERSAL_DATA_GET,
  UNIVERSAL_DATA_SAVE,
  UNIVERSAL_DATA_SET
} = reduxConst;

/**
 * Get universal data
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* getUniversalDataRedux({ promise }) {
  try {
    const universalDataObj = yield call(getUniversalDb);
    yield put({
      type: UNIVERSAL_DATA_SET,
      universalDataObj
    });
    promise.resolve(universalDataObj);
  } catch (err) {
    console.log({ err });
  }
}

function* getUniversalData() {
  yield takeEvery(UNIVERSAL_DATA_GET, getUniversalDataRedux);
}

/**
 * Save offline download data
 * @param {Object} promise tells calling function success or
 *     failure of the function
 * @return {Promise} Returns the prosmise resolve or reject
 */
function* saveUniversalDbRedux({ promise, dataObj, tempSkip }) {
  try {
    if (!tempSkip && !dataObj.onboardingPlay) yield call(saveUniversalDb, dataObj);

    const universalDataObj = yield call(getUniversalDb);
    let obj = {};
    let showMoreInformationStep = false;

    if (universalDataObj
      && universalDataObj.onboardingIds
      && universalDataObj.onboardingIds.productGroupId) {
      const pageId = universalDataObj.onboardingIds.productGroupId;
      const isApiCalled = yield call(getDailyApiCheckDb, apiNames.PAGE_CONTENT_GET, pageId);
      const pageData = yield call(getPageDataDb, pageId);

      if (!pageData) {
        obj = yield call(getPageDataService, pageId);
      } else if (isApiCalled) {
        obj = pageData;
      } else {
        const serviceData = yield call(getPageDataService, pageId);
        if (serviceData.createdAt === pageData.createdAt) {
          obj = pageData;
        } else {
          obj = serviceData;
        }
      }
    }

    if (obj && obj.content
      && Array.isArray(obj.content)
      && obj.content[0]
      && obj.content[0].config) {
      const configData = JSON.parse(obj.content[0].config);
      if (configData.ribbonButtonTarget) showMoreInformationStep = true;
    }

    if (tempSkip) {
      yield put({
        type: UNIVERSAL_DATA_SET,
        universalDataObj: {
          ...universalDataObj,
          onboardingSkiped: tempSkip,
          onboardingPageData: obj,
          showMoreInformationStep
        }
      });
    } else {
      yield put({
        type: UNIVERSAL_DATA_SET,
        universalDataObj: {
          ...universalDataObj,
          ...dataObj,
          onboardingPageData: obj,
          showMoreInformationStep,
          onboardingSkiped: dataObj.onboardingPlay ? false : universalDataObj.onboardingSkiped
        }
      });
    }

    const universalDataObjNew = yield call(getUniversalDb);

    promise.resolve(universalDataObjNew);
  } catch (err) {
    console.log({ err });
  }
}

function* saveUniversal() {
  yield takeEvery(UNIVERSAL_DATA_SAVE, saveUniversalDbRedux);
}

export { saveUniversal, getUniversalData };
