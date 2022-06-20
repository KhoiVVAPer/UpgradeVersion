import { appConstants } from '../../../config';
import subProductGroupListReducer from '../../../redux/reducers/subProductGroupListReducer';

const { reduxConst } = appConstants;
const {
  SUB_PRODUCT_GROUPS_GET_SUCCESS,
  SUB_PRODUCT_GROUPS_GET_ERROR,
  SUB_PRODUCT_GROUPS_GET_LOADING,
  RESET_APP
} = reduxConst;

describe('Sub product list reducer', () => {
  it('Should return the initial state', () => {
    const input = {};
    const output = {};
    expect(subProductGroupListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle Sub product list api success i.e SUB_PRODUCT_GROUPS_GET_SUCCESS', () => {
    const input = {
      type: SUB_PRODUCT_GROUPS_GET_SUCCESS,
      productgroupId: 1000,
      obj: {}
    };
    const output = {
      1000: {
        loading: false,
        error: false,
        obj: {}
      }
    };
    expect(subProductGroupListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle Sub product list api error i.e SUB_PRODUCT_GROUPS_GET_ERROR', () => {
    const input = {
      type: SUB_PRODUCT_GROUPS_GET_ERROR,
      productgroupId: 1000
    };
    const output = {
      1000: {
        loading: false,
        error: true,
        obj: {}
      }
    };
    expect(subProductGroupListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle Sub product list api loading i.e SUB_PRODUCT_GROUPS_GET_LOADING', () => {
    const input = {
      type: SUB_PRODUCT_GROUPS_GET_LOADING,
      productgroupId: 1000
    };
    const output = {
      1000: {
        loading: true,
        error: false,
        obj: {}
      }
    };
    expect(subProductGroupListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle Sub product list redux store reset i.e RESET_APP', () => {
    const input = {
      type: RESET_APP
    };
    const output = {};
    expect(subProductGroupListReducer(undefined, input)).toEqual(output);
  });
});
