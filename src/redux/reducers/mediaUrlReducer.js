import { appConstants } from '../../config';

const { reduxConst, catelogueTypes } = appConstants;
const {
  MEDIA_URL_GET,
  MEDIA_URL_LOADING,
  RESET_APP
} = reduxConst;

const INITIAL_STATE = {
  mediaUrls: {
    [catelogueTypes.HOME_AND_GARDEN]: [],
    [catelogueTypes.PROFFESSIONAL]: []
  },
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MEDIA_URL_GET:
      return {
        mediaUrls: {
          ...state.mediaUrls,
          [action.mediaType]: action.mediaUrls
        },
        loading: false
      };

    case MEDIA_URL_LOADING:
      return {
        ...state,
        loading: true
      };

    case RESET_APP:
      return INITIAL_STATE;

    default:
      return state || INITIAL_STATE;
  }
};
