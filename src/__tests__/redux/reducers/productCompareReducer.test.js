import { appConstants } from '../../../config';
import productCompareReducer from '../../../redux/reducers/productCompareReducer';

const { reduxConst } = appConstants;
const { PRODUCT_COMPARE_TOGGLE, RESET_APP } = reduxConst;

describe('Product compare reducer', () => {
  it('Should return the initial state', () => {
    const input = [];
    const output = [];
    expect(productCompareReducer(undefined, input)).toEqual(output);
  });

  it('Should add provided product id i.e PRODUCT_COMPARE_TOGGLE', () => {
    const input = {
      type: PRODUCT_COMPARE_TOGGLE,
      compareList: [1000]
    };
    const output = [1000];
    expect(productCompareReducer(undefined, input)).toEqual(output);
  });

  it('Should handle product compare redux store reset i.e RESET_APP', () => {
    const input = {
      type: RESET_APP
    };
    const output = [];
    expect(productCompareReducer(undefined, input)).toEqual(output);
  });
});
