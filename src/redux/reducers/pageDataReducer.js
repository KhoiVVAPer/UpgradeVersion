import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const {
  PAGE_DATA_GET_SUCCESS,
  PAGE_DATA_GET_ERROR,
  PAGE_DATA_GET_LOADING,
  RESET_APP
} = reduxConst;

export default (state = {}, action) => {
  switch (action.type) {
    case PAGE_DATA_GET_SUCCESS: {
      const loadingState = {
        loading: false,
        error: false,
        obj: action.obj
      };
      return {
        ...state,
        [action.pageId]: loadingState
      };
    }

    case PAGE_DATA_GET_ERROR: {
      const loadingState = {
        loading: false,
        error: true,
        obj: {}
      };
      return {
        ...state,
        [action.pageId]: loadingState
      };
    }

    case PAGE_DATA_GET_LOADING: {
      const loadingState = {
        loading: true,
        error: false,
        obj: {}
      };
      return {
        ...state,
        [action.pageId]: loadingState
      };
    }

    case RESET_APP:
      return {};

    default:
      return state;
  }
};
