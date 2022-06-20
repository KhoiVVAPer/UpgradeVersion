/* eslint-disable object-curly-newline */
import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const {
  MEDIA_URL_GET_INIT,
  MEDIA_URL_SAVE_INIT
} = reduxConst;

/**
 * Get list of media url
 * @param  {function} dispatch the action to redux-saga
 * @return {object}   Object with promise and list of media
 */
const getMediaUrl = (dispatch) => new Promise((resolve, reject) => {
  dispatch({
    type: MEDIA_URL_GET_INIT,
    promise: { resolve, reject }
  });
});

/**
 * Save list of media url
 * @param  {function} dispatch the action to redux-saga
 * @return {object}   Object with promise and list of media
 */
const saveMediaUrl = (dispatch, mediaUrls, mediaType) => new Promise((resolve, reject) => {
  dispatch({
    type: MEDIA_URL_SAVE_INIT,
    promise: { resolve, reject },
    mediaUrls,
    mediaType
  });
});

export { getMediaUrl, saveMediaUrl };
