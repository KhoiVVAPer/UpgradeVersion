import { appConstants } from '../../../config';
import productGroupListReducer from '../../../redux/reducers/productGroupListReducer';

const { reduxConst } = appConstants;
const {
  PRODUCT_GROUPS_GET_SUCCESS,
  PRODUCT_GROUPS_GET_ERROR,
  PRODUCT_GROUPS_GET_LOADING,
  RESET_APP
} = reduxConst;

describe('Product group list reducer', () => {
  it('Should return the initial state', () => {
    const input = {};
    const output = {};
    expect(productGroupListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle product group list api success i.e PRODUCT_GROUPS_GET_SUCCESS', () => {
    const input = {
      type: PRODUCT_GROUPS_GET_SUCCESS,
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
    expect(productGroupListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle product group list api error i.e PRODUCT_GROUPS_GET_ERROR', () => {
    const input = {
      type: PRODUCT_GROUPS_GET_ERROR,
      productgroupId: 1000
    };
    const output = {
      1000: {
        loading: false,
        error: true,
        obj: {}
      }
    };
    expect(productGroupListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle product group list api loading i.e PRODUCT_GROUPS_GET_LOADING', () => {
    const input = {
      type: PRODUCT_GROUPS_GET_LOADING,
      productgroupId: 1000
    };
    const output = {
      1000: {
        loading: true,
        error: false,
        obj: {}
      }
    };
    expect(productGroupListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle product group list redux store reset i.e RESET_APP', () => {
    const input = {
      type: RESET_APP
    };
    const output = {};
    expect(productGroupListReducer(undefined, input)).toEqual(output);
  });
});
