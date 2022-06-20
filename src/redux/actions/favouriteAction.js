/* eslint-disable object-curly-newline */
import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const {
  FAVOURITE_GET,
  FAVOURITE_CONTENT_SAVE,
  FAVOURITE_CONTENT_EDIT,
  FAVOURITE_FOLDER_EDIT,
  FAVOURITE_CONTENT_DELETE,
  FAVOURITE_FOLDER_DELETE,
  FAVOURITE_FOLDER_SAVE,
  FAVOURITE_FOLDER_DUPLICATE,
  RESET_APP_FAVOURITE,
  UPDATE_FAVOURITE_POSITION
} = reduxConst;

/**
 * Get list of favourite content and favourite folder
 * and save into database
 * @param  {function} dispatch the action to redux-saga
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const getFavourite = (dispatch) => new Promise((resolve, reject) => {
  dispatch({
    type: FAVOURITE_GET,
    promise: { resolve, reject }
  });
});

/**
 * Save favourite content into database
 * @param  {function} dispatch the action to redux-saga
 * @param  {object}   favouriteData is data of favourite content to be saved
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const saveFavouriteContent = (dispatch, favouriteData) => new Promise((resolve, reject) => {
  dispatch({
    type: FAVOURITE_CONTENT_SAVE,
    promise: { resolve, reject },
    favouriteData
  });
});

/**
 * Update favourite content from database
 * @param  {function} dispatch the action to redux-saga
 * @param  {object}   favouriteData is data of favourite content to be updated
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const editFavouriteContent = (dispatch, favouriteData) => new Promise((resolve, reject) => {
  dispatch({
    type: FAVOURITE_CONTENT_EDIT,
    promise: { resolve, reject },
    favouriteData
  });
});

/**
 * Update favourite content from database
 * @param  {function} dispatch the action to redux-saga
 * @param  {object}   favouriteData is data of favourite content to be updated
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const updateFavouritePosition = (dispatch, favouriteData) => new Promise((resolve, reject) => {
  dispatch({
    type: UPDATE_FAVOURITE_POSITION,
    promise: { resolve, reject },
    favouriteData
  });
});

/**
 * Update favourite folder name from database
 * @param  {function} dispatch the action to redux-saga
 * @param  {object}   folderData is id and folder name of favourite to be updated
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const editFavouriteFolder = (dispatch, folderData) => new Promise((resolve, reject) => {
  dispatch({
    type: FAVOURITE_FOLDER_EDIT,
    promise: { resolve, reject },
    folderData
  });
});

/**
 * Duplicate favourite folder name from database
 * @param  {function} dispatch the action to redux-saga
 * @param  {object}   folderData is data of favourite folder to be duplkicated
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const duplicateFavouriteFolder = (dispatch, folderData, folderName) => new Promise((resolve, reject) => {
  dispatch({
    type: FAVOURITE_FOLDER_DUPLICATE,
    promise: { resolve, reject },
    folderData,
    folderName
  });
});

/**
 * Delete favourite content from database
 * @param  {function} dispatch the action to redux-saga
 * @param  {int}      id is unique key of favourite content to be deleted
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const deleteFavouriteContent = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: FAVOURITE_CONTENT_DELETE,
    promise: { resolve, reject },
    id
  });
});

/**
 * Delete favourite folder and its content from database
 * @param  {function} dispatch the action to redux-saga
 * @param  {int}      id is unique key of favourite folder to be deleted
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const deleteFavouriteFolder = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: FAVOURITE_FOLDER_DELETE,
    promise: { resolve, reject },
    id
  });
});

/**
 * Save favourite folder into database
 * @param  {function} dispatch the action to redux-saga
 * @param  {object}   favouriteFolderData is data of favourite folder to be saved
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const saveFavouriteFolder = (dispatch, favouriteFolderData) => new Promise((resolve, reject) => {
  dispatch({
    type: FAVOURITE_FOLDER_SAVE,
    promise: { resolve, reject },
    favouriteFolderData
  });
});

/**
 * Save favourite folder into database
 * @param  {function} dispatch the action to redux-saga
 * @param  {object}   favouriteFolderData is data of favourite folder to be saved
 * @return {object}   Object with promise and list of favourite
 * content and favourite folder
 */
const resetFavouriteData = (dispatch) => {
  dispatch({
    type: RESET_APP_FAVOURITE
  });
};

export {
  getFavourite,
  saveFavouriteContent,
  editFavouriteContent,
  editFavouriteFolder,
  deleteFavouriteContent,
  deleteFavouriteFolder,
  saveFavouriteFolder,
  duplicateFavouriteFolder,
  resetFavouriteData,
  updateFavouritePosition
};
