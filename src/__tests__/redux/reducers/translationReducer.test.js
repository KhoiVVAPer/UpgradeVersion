import { appConstants } from '../../../config';
import translation from '../../../assets/data/translation';
import translationReducer from '../../../redux/reducers/translationReducer';

const { reduxConst } = appConstants;
const {
  TRANSLATION_DATA_SUCCESS, TRANSLATION_DATA_ERROR, TRANSLATION_DATA_LOADING
} = reduxConst;

describe('Translation reducer', () => {
  it('Should return the initial state', () => {
    const input = {};
    const output = {
      loading: true,
      error: false,
      arr: translation
    };
    expect(translationReducer(undefined, input)).toEqual(output);
  });

  it('Should handle translation api success i.e TRANSLATION_DATA_SUCCESS', () => {
    const input = {
      type: TRANSLATION_DATA_SUCCESS,
      arr: []
    };
    const output = {
      loading: false,
      error: false,
      arr: []
    };
    expect(translationReducer(translation, input)).toEqual(output);
  });

  it('Should handle translation api error i.e TRANSLATION_DATA_ERROR', () => {
    const input = {
      type: TRANSLATION_DATA_ERROR
    };
    const output = {
      loading: false,
      error: true,
      arr: translation
    };
    expect(translationReducer(undefined, input)).toEqual(output);
  });

  it('Should handle translation api loading i.e TRANSLATION_DATA_LOADING', () => {
    const input = {
      type: TRANSLATION_DATA_LOADING
    };
    const output = {
      loading: true,
      error: false,
      arr: translation
    };
    expect(translationReducer(undefined, input)).toEqual(output);
  });
});
