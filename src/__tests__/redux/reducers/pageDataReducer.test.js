import { appConstants } from '../../../config';
import pageDataReducer from '../../../redux/reducers/pageDataReducer';

const { reduxConst } = appConstants;
const {
  PAGE_DATA_GET_SUCCESS,
  PAGE_DATA_GET_ERROR,
  PAGE_DATA_GET_LOADING,
  RESET_APP
} = reduxConst;

describe('paage data reducer', () => {
  it('Should return the initial state', () => {
    const input = {};
    const output = {};
    expect(pageDataReducer(undefined, input)).toEqual(output);
  });

  it('Should handle page content api success i.e PAGE_DATA_GET_SUCCESS', () => {
    const input = {
      type: PAGE_DATA_GET_SUCCESS,
      pageId: 1000,
      obj: {}
    };
    const output = {
      1000: {
        loading: false,
        error: false,
        obj: {}
      }
    };
    expect(pageDataReducer(undefined, input)).toEqual(output);
  });

  it('Should handle page content api error i.e PAGE_DATA_GET_ERROR', () => {
    const input = {
      type: PAGE_DATA_GET_ERROR,
      pageId: 1000
    };
    const output = {
      1000: {
        loading: false,
        error: true,
        obj: {}
      }
    };
    expect(pageDataReducer(undefined, input)).toEqual(output);
  });

  it('Should handle page content api loading i.e PAGE_DATA_GET_LOADING', () => {
    const input = {
      type: PAGE_DATA_GET_LOADING,
      pageId: 1000
    };
    const output = {
      1000: {
        loading: true,
        error: false,
        obj: {}
      }
    };
    expect(pageDataReducer(undefined, input)).toEqual(output);
  });

  it('Should handle page content redux store reset i.e RESET_APP', () => {
    const input = {
      type: RESET_APP
    };
    const output = {};
    expect(pageDataReducer(undefined, input)).toEqual(output);
  });
});
