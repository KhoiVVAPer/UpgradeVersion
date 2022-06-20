import { appConstants } from '../../config';

/**
 * Get/load structure list and save structure list into database
 * @param  {function} dispatch the action to redux-saga
 * @return {object}   Object with promise and list of structure
 */
const { reduxConst } = appConstants;
const { STRUCTURE_LIST_SET_INIT } = reduxConst;

const getStructureList = (dispatch) => new Promise((resolve, reject) => {
  dispatch({
    type: STRUCTURE_LIST_SET_INIT,
    promise: { resolve, reject }
  });
});

export default getStructureList;
