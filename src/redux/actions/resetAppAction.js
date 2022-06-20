import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { RESET_APP_INIT } = reduxConst;

/**
 * Reset app redux store and database
 * @param  {function} dispatch the action to redux-saga
 * @param  {boolean}  isCountryChanged is decides where to delete favourite or not
 * @return {object}   Object with promise
 */
const resetApp = (dispatch, isCountryChanged) => new Promise((resolve, reject) => {
  dispatch({
    type: RESET_APP_INIT,
    promise: { resolve, reject },
    isCountryChanged
  });
});

export default resetApp;
