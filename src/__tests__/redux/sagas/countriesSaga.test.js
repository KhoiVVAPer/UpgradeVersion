import { put, takeEvery } from 'redux-saga/effects';
import { appConstants } from '../../../config';
import getCountriesSaga, { getCountry } from '../../../redux/sagas/countriesSaga';

const { reduxConst } = appConstants;
const {
  COUNTRIES_GET, COUNTRIES_GET_LOADING
} = reduxConst;

describe('countries saga', () => {
  it('Should dipatch action "COUNTRIES_GET"', () => {
    const generator = getCountriesSaga();
    expect(generator.next().value).toEqual(takeEvery(COUNTRIES_GET, getCountry));
    expect(generator.next().done).toBeTruthy();
  });

  it('Should dipatch action "COUNTRIES_GET_LOADING"', () => {
    const generator = getCountry({ resolve: Promise.resolve, reject: Promise.reject });
    expect(generator.next().value).toEqual(put({ type: COUNTRIES_GET_LOADING }));
  });
});
