import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const { STRUCTURE_LIST_SET, RESET_APP } = reduxConst;

export default (state = [], action) => {
  switch (action.type) {
    case STRUCTURE_LIST_SET:
      return action.structureData;

    case RESET_APP:
      return [];

    default:
      return state || [];
  }
};
