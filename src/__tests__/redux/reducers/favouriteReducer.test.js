import { appConstants } from '../../../config';
import favouriteReducer from '../../../redux/reducers/favouriteReducer';

const { reduxConst } = appConstants;
const { FAVOURITE_SET, FAVOURITE_LOADING, RESET_APP } = reduxConst;

describe('favourite reducer', () => {
  it('Should return the initial state', () => {
    const input = {};
    const output = {
      favouriteFolder: [],
      favouriteContent: [],
      loading: true
    };
    expect(favouriteReducer(undefined, input)).toEqual(output);
  });

  it('Should handle favourite folder and content save success i.e FAVOURITE_SET', () => {
    const input = {
      type: FAVOURITE_SET,
      obj: {
        favouriteFolder: [],
        favouriteContent: [],
      }
    };
    const output = {
      favouriteFolder: [],
      favouriteContent: [],
      loading: false
    };
    expect(favouriteReducer(undefined, input)).toEqual(output);
  });

  it('Should handle favourite folder and content loading i.e FAVOURITE_LOADING', () => {
    const input = {
      type: FAVOURITE_LOADING
    };
    const output = {
      favouriteFolder: [],
      favouriteContent: [],
      loading: true
    };
    expect(favouriteReducer(undefined, input)).toEqual(output);
  });

  it('Should handle favourite redux store reset i.e RESET_APP', () => {
    const input = {
      type: RESET_APP
    };
    const output = {
      favouriteFolder: [],
      favouriteContent: [],
      loading: true
    };
    expect(favouriteReducer(output, input)).toEqual(output);
  });
});
