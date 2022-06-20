import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { PAGE_DATA_GET } = reduxConst;

/**
 * Get/load page data and save page data into database
 * @param  {function} dispatch the action to redux-saga
 * @param  {id}       pageId is unique key of page to be loaded
 * @return {object}   Object with promise and list of page content
 */
const getPageData = (dispatch, pageId) => new Promise((resolve, reject) => {
  dispatch({
    type: PAGE_DATA_GET,
    promise: { resolve, reject },
    pageId
  });
});

export default getPageData;
