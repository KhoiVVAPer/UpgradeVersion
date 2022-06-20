import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { COUNTRIES_GET } = reduxConst;

/**
 * Get list of countires and saved into database
 * @param  {function} dispatch the action to readux-saga
 * @return {object}   Object with promise and list of languages and countries
 */
const getContries = (dispatch) => new Promise((resolve, reject) => {
  dispatch({
    type: COUNTRIES_GET,
    promise: { resolve, reject }
  });
});

export default getContries;
