import { appConstants, appObjects } from '../../config';

const { reduxConst } = appConstants;
const { UNIVERSAL_DATA_SET, RESET_APP } = reduxConst;

const INITIAL_STATE = {
  ...appObjects.universalData,
  onboardingPlay: false,
  loaded: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UNIVERSAL_DATA_SET:
      return {
        ...state,
        ...action.universalDataObj,
        loaded: true
      };

    case RESET_APP:
      return INITIAL_STATE;

    default:
      return state || INITIAL_STATE;
  }
};
