import { appConstants } from '../../../config';
import countriesReducer from '../../../redux/reducers/countriesReducer';

const { reduxConst } = appConstants;
const {
  COUNTRIES_GET_SUCCESS, COUNTRIES_GET_ERROR, COUNTRIES_GET_LOADING, RESET_APP
} = reduxConst;

describe('countries reducer', () => {
  it('Should return the initial state', () => {
    const input = {};
    const output = {
      loading: true,
      error: false,
      arr: []
    };
    expect(countriesReducer(undefined, input)).toEqual(output);
  });

  it('Should handle country, language api success i.e COUNTRIES_GET_SUCCESS', () => {
    const input = {
      type: COUNTRIES_GET_SUCCESS,
      arr: []
    };
    const output = {
      loading: false,
      error: false,
      arr: []
    };
    expect(countriesReducer(undefined, input)).toEqual(output);
  });

  it('Should handle country, language api error i.e COUNTRIES_GET_ERROR', () => {
    const input = {
      type: COUNTRIES_GET_ERROR
    };
    const output = {
      loading: false,
      error: false,
      arr: []
    };
    expect(countriesReducer(undefined, input)).toEqual(output);
  });

  it('Should handle country, language api loading i.e COUNTRIES_GET_LOADING', () => {
    const input = {
      type: COUNTRIES_GET_LOADING
    };
    const output = {
      loading: true,
      error: false,
      arr: []
    };
    expect(countriesReducer(undefined, input)).toEqual(output);
  });

  it('Should handle country, language redux store reset i.e RESET_APP', () => {
    const input = {
      type: RESET_APP
    };
    const output = {
      loading: true,
      error: false,
      arr: []
    };
    expect(countriesReducer(undefined, input)).toEqual(output);
  });
});
