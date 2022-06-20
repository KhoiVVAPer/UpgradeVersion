import { appConstants } from '../../config';
import translation from '../../assets/data/translation';

const { reduxConst } = appConstants;
const {
  TRANSLATION_DATA_SUCCESS,
  TRANSLATION_DATA_ERROR,
  TRANSLATION_DATA_LOADING,
  RESET_APP
} = reduxConst;

const TRANSLATION_STATE = {
  loading: true,
  error: false,
  arr: translation
};

export default (state = TRANSLATION_STATE, action) => {
  switch (action.type) {
    case TRANSLATION_DATA_SUCCESS:
      return {
        loading: false,
        error: false,
        arr: action.arr
      };

    case TRANSLATION_DATA_ERROR:
      return {
        loading: false,
        error: true,
        arr: translation
      };

    case TRANSLATION_DATA_LOADING:
      return {
        loading: true,
        error: false,
        arr: translation
      };

    case RESET_APP:
      return { ...TRANSLATION_STATE };

    default:
      return state || translation;
  }
};
