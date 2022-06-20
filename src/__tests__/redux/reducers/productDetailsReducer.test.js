import { appConstants } from '../../../config';
import productDetailsReducer from '../../../redux/reducers/productDetailsReducer';

const { reduxConst } = appConstants;
const {
  PRODUCT_DETAILS_GET_SUCCESS,
  PRODUCT_DETAILS_GET_ERROR,
  PRODUCT_DETAILS_GET_LOADING,
  RESET_APP
} = reduxConst;

describe('paage data reducer', () => {
  it('Should return the initial state', () => {
    const input = {};
    const output = {};
    expect(productDetailsReducer(undefined, input)).toEqual(output);
  });

  it('Should handle page content api success i.e PRODUCT_DETAILS_GET_SUCCESS', () => {
    const input = {
      type: PRODUCT_DETAILS_GET_SUCCESS,
      productId: 1000,
      obj: {}
    };
    const output = {
      1000: {
        loading: false,
        error: false,
        obj: {}
      }
    };
    expect(productDetailsReducer(undefined, input)).toEqual(output);
  });

  it('Should handle page content api error i.e PRODUCT_DETAILS_GET_ERROR', () => {
    const input = {
      type: PRODUCT_DETAILS_GET_ERROR,
      productId: 1000
    };
    const output = {
      1000: {
        loading: false,
        error: true,
        obj: {}
      }
    };
    expect(productDetailsReducer(undefined, input)).toEqual(output);
  });

  it('Should handle page content api loading i.e PRODUCT_DETAILS_GET_LOADING', () => {
    const input = {
      type: PRODUCT_DETAILS_GET_LOADING,
      productId: 1000
    };
    const output = {
      1000: {
        loading: true,
        error: false,
        obj: {}
      }
    };
    expect(productDetailsReducer(undefined, input)).toEqual(output);
  });

  it('Should handle page content redux store reset i.e RESET_APP', () => {
    const input = {
      type: RESET_APP
    };
    const output = {};
    expect(productDetailsReducer(undefined, input)).toEqual(output);
  });
});
