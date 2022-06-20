import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const {
  COUNTRIES_GET_SUCCESS,
  COUNTRIES_GET_ERROR,
  COUNTRIES_GET_LOADING,
  RESET_APP
} = reduxConst;

const INITIAL_STATE = {
  loading: true,
  error: false,
  arr: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTRIES_GET_SUCCESS:
      return {
        loading: false,
        error: false,
        arr: action.arr,
        slectedCountry: action.slectedCountry,
        selectedLanguage: action.selectedLanguage
      };

    case COUNTRIES_GET_ERROR:
      return {
        loading: false,
        error: false,
        arr: []
      };

    case COUNTRIES_GET_LOADING:
      return {
        loading: true,
        error: false,
        arr: []
      };

    case RESET_APP:
      return INITIAL_STATE;

    default:
      return state;
  }
};
