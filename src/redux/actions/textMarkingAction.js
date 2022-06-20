/* eslint-disable object-curly-newline */
import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { MARKING_DATA_SET_INIT, MARKING_DATA_SAVE_INIT, MARKING_DATA_DELETE_INIT } = reduxConst;

/**
 * Get list of marking text
 * @param  {function} dispatch the action to redux-saga
 * @return {object}   Object with promise and list of marking text
 */
const getMarkingText = (dispatch) => new Promise((resolve, reject) => {
  dispatch({
    type: MARKING_DATA_SET_INIT,
    promise: { resolve, reject }
  });
});

/**
 * Save marking text da
 * @param  {function} dispatch the action to redux-saga
 * @param  {Object} markingData is data of marked text
 * @return {object} Object with promise and list of marking text
 */
const saveMarkingText = (dispatch, markingData) => new Promise((resolve, reject) => {
  dispatch({
    type: MARKING_DATA_SAVE_INIT,
    promise: { resolve, reject },
    markingData
  });
});

/**
 * Delete marking text da
 * @param  {function} dispatch the action to redux-saga
 * @param  {int} markingId is unique key of marked text
 * @return {object} Object with promise and list of marking text
 */
const deleteMarkingText = (dispatch, markingId) => new Promise((resolve, reject) => {
  dispatch({
    type: MARKING_DATA_DELETE_INIT,
    promise: { resolve, reject },
    markingId
  });
});

export { getMarkingText, saveMarkingText, deleteMarkingText };
