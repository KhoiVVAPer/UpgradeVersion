import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const {
  PRODUCT_FINDER_GET_SUCCESS,
  PRODUCT_FINDER_GET_ERROR,
  PRODUCT_FINDER_GET_LOADING,
  RESET_APP
} = reduxConst;

const INITIAL_STATE = {
  loading: true,
  error: false,
  arr: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_FINDER_GET_SUCCESS:
      return {
        loading: false,
        error: false,
        arr: action.arr,

      };

    case PRODUCT_FINDER_GET_ERROR:
      return {
        loading: false,
        error: true,
        arr: []
      };

    case PRODUCT_FINDER_GET_LOADING:
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
