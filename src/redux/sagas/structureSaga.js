/**
 * @fileoverview Redux saga middle to set structure data
 * and call api service if data not stored in realm
 * @package
 */
import {
  put, takeEvery, call
} from 'redux-saga/effects';
import { appConstants } from '../../config';
import { getStructureService } from '../../services';
import {
  saveStructureDataDb,
  getStructureDataDb,
  deleteStructureDataDb,
  saveDailyApiCheckDb,
  getDailyApiCheckDb
} from '../../realm/queries';

const { reduxConst, apiNames } = appConstants;
const {
  STRUCTURE_LIST_SET_INIT, STRUCTURE_LIST_SET
} = reduxConst;

/**
 * Get/save app structure data from api or database
 * @param {Object} promise tells calling function success or failure
 * @return {Promise} prosmise resolve or reject with structure data
 */
function* getStructureRedux({ promise }) {
  try {
    let isDataUpdated = false;
    const isApiCalled = yield call(getDailyApiCheckDb, apiNames.STRUCTURE_GET, 0);
    const structureData = yield call(getStructureDataDb);
    let obj = {};
    if (!structureData) {
      obj = yield call(getStructureService);
    } else if (isApiCalled) {
      obj = {
        ...structureData,
        data: JSON.parse(structureData.data)
      };
    } else {
      const serviceData = yield call(getStructureService);
      if (serviceData.createdAt === structureData.createdAt) {
        obj = {
          ...structureData,
          structureData: JSON.parse(structureData.data)
        };
      } else {
        isDataUpdated = true;
        obj = serviceData;
        yield call(deleteStructureDataDb);
      }
    }
    yield put({
      type: STRUCTURE_LIST_SET,
      structureData: obj.data
    });
    yield call(promise.resolve, obj.data);

    if (!structureData || isDataUpdated) {
      yield call(saveStructureDataDb, obj);
    }
    if (!isApiCalled) {
      yield call(saveDailyApiCheckDb, apiNames.STRUCTURE_GET, 0);
    }
  } catch (err) {
    console.log({ err });
  }
}

function* getStructure() {
  yield takeEvery(STRUCTURE_LIST_SET_INIT, getStructureRedux);
}

export default getStructure;
