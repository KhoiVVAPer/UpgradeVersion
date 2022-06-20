import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const {
  PRODUCT_DETAILS_GET_SUCCESS,
  PRODUCT_DETAILS_GET_ERROR,
  PRODUCT_DETAILS_GET_LOADING,
  RESET_APP
} = reduxConst;

export default (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_GET_SUCCESS: {
      const loadingState = {
        loading: false,
        error: false,
        obj: action.obj
      };
      return {
        ...state,
        [action.productId]: loadingState
      };
    }

    case PRODUCT_DETAILS_GET_ERROR: {
      const loadingState = {
        loading: false,
        error: true,
        obj: {}
      };
      return {
        ...state,
        [action.productId]: loadingState
      };
    }

    case PRODUCT_DETAILS_GET_LOADING: {
      const loadingState = {
        loading: true,
        error: false,
        obj: {}
      };
      return {
        ...state,
        [action.productId]: loadingState
      };
    }

    case RESET_APP:
      return {};

    default:
      return state;
  }
};
