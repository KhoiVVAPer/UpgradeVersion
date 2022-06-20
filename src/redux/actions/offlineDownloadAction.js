import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const {
  OFFLINE_DOWNLOAD_GET_INIT,
  OFFLINE_DOWNLOAD_SAVE_INIT,
  OFFLINE_DOWNLOAD_RESET_INIT
} = reduxConst;

/**
 * Get offline download data
 * @return {object} Object with promise and offline download
 */
const getOfflineDownload = (dispatch) => new Promise((resolve, reject) => {
  dispatch({
    type: OFFLINE_DOWNLOAD_GET_INIT,
    promise: { resolve, reject }
  });
});

/**
 * Save offline download data
 * @return {object} Object with promise and offline download
 */
const saveOfflineDownload = (dispatch, offlineObj) => new Promise((resolve, reject) => {
  dispatch({
    type: OFFLINE_DOWNLOAD_SAVE_INIT,
    promise: { resolve, reject },
    offlineObj
  });
});

/**
 * Reset offline download data
 * @return {object} Object with promise and offline download
 */
const resetOfflineDownload = (dispatch) => new Promise((resolve, reject) => {
  dispatch({
    type: OFFLINE_DOWNLOAD_RESET_INIT,
    promise: { resolve, reject }
  });
});

export {
  getOfflineDownload,
  saveOfflineDownload,
  resetOfflineDownload
};
