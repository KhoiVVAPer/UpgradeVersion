import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const {
  FAVOURITE_SET,
  FAVOURITE_LOADING,
  RESET_APP,
  RESET_APP_FAVOURITE,
  FAVOURITE_LIST_SET
} = reduxConst;

const INITIAL_STATE = {
  favouriteFolder: [],
  favouriteContent: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAVOURITE_LOADING:
      return {
        favouriteFolder: [],
        favouriteContent: [],
        loading: true
      };

    case FAVOURITE_SET:
      return {
        loading: false,
        favouriteFolder: action.obj.favouriteFolder,
        favouriteContent: action.obj.favouriteContent
      };
    case FAVOURITE_LIST_SET:
      return { ...state, favouriteContent: action.favouriteContent };

    case RESET_APP_FAVOURITE:
    case RESET_APP:
      return INITIAL_STATE;

    default:
      return state || INITIAL_STATE;
  }
};
