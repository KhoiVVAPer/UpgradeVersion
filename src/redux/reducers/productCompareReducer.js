import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { PRODUCT_COMPARE_TOGGLE, RESET_APP } = reduxConst;

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_COMPARE_TOGGLE:
      return action.compareList;

    case RESET_APP:
      return INITIAL_STATE;

    default:
      return state;
  }
};
