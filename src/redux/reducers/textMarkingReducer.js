import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { MARKING_DATA_SET, RESET_APP } = reduxConst;

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MARKING_DATA_SET:
      return action.markingList;

    case RESET_APP:
      return INITIAL_STATE;

    default:
      return state || INITIAL_STATE;
  }
};
