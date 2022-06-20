import { appConstants } from '../../../config';
import productListReducer from '../../../redux/reducers/productListReducer';

const { reduxConst } = appConstants;
const {
  PRODUCT_LIST_GET_SUCCESS,
  PRODUCT_LIST_GET_ERROR,
  PRODUCT_LIST_GET_LOADING,
  RESET_APP
} = reduxConst;

describe('Product list reducer', () => {
  it('Should return the initial state', () => {
    const input = {};
    const output = {};
    expect(productListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle Product list api success i.e PRODUCT_LIST_GET_SUCCESS', () => {
    const input = {
      type: PRODUCT_LIST_GET_SUCCESS,
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
    expect(productListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle Product list api error i.e PRODUCT_LIST_GET_ERROR', () => {
    const input = {
      type: PRODUCT_LIST_GET_ERROR,
      productgroupId: 1000
    };
    const output = {
      1000: {
        loading: false,
        error: true,
        obj: {}
      }
    };
    expect(productListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle Product list api loading i.e PRODUCT_LIST_GET_LOADING', () => {
    const input = {
      type: PRODUCT_LIST_GET_LOADING,
      productgroupId: 1000
    };
    const output = {
      1000: {
        loading: true,
        error: false,
        obj: {}
      }
    };
    expect(productListReducer(undefined, input)).toEqual(output);
  });

  it('Should handle Product list redux store reset i.e RESET_APP', () => {
    const input = {
      type: RESET_APP
    };
    const output = {};
    expect(productListReducer(undefined, input)).toEqual(output);
  });
});
