import { appConstants } from '../../config';

const { reduxConst, downloadingFlags } = appConstants;
const { OFFLINE_DOWNLOAD_SET, RESET_APP, OFFLINE_DOWNLOAD_RESET } = reduxConst;

const INITIAL_STATE = {
  proffesional: downloadingFlags.NONE,
  home_and_garden: downloadingFlags.NONE,
  lastDownload: downloadingFlags.NONE,
  proffesional_db: '',
  home_and_garden_db: '',
  proffesional_media_flag: downloadingFlags.NONE,
  home_and_garden_media_flag: downloadingFlags.NONE,
  mediaLastDownload: '',
  loaded: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OFFLINE_DOWNLOAD_SET:
      return {
        ...action.offlineObj,
        loaded: true
      };

    case OFFLINE_DOWNLOAD_RESET:
    case RESET_APP:
      return INITIAL_STATE;

    default:
      return state || INITIAL_STATE;
  }
};
