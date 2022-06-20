import {
  isEmptyObject,
  buildHeader,
  aspectRatio,
  getCongnitoToken
} from '../../../config/libs/helpers';

describe('isEmptyObject(helper)', () => {
  it('is a function', () => {
    const actual = typeof isEmptyObject;
    const expected = 'function';

    expect(actual).toEqual(expected);
  });

  it('returns boolean value', () => {
    const input = [undefined, null, '', {}];
    const output = [true, false];

    for (let i = 0; i < input.length; i += 1) {
      const result = isEmptyObject(input[i]);
      expect(output).toEqual(
        expect.arrayContaining([result])
      );
    }
  });

  it('returns true for empty object', () => {
    const input = isEmptyObject({});
    expect(input).toBeTruthy();
  });

  it('returns false for non empty', () => {
    const input = isEmptyObject({ data: 'test' });
    expect(input).toBeFalsy();
  });
});

describe('buildHeader(helper)', () => {
  it('is a function', () => {
    const actual = typeof buildHeader;
    const expected = 'function';

    expect(actual).toEqual(expected);
  });

  it('returns a object', () => {
    const actual = typeof buildHeader();
    const expected = 'object';

    expect(actual).toEqual(expected);
  });

  it('returns object with expected data', () => {
    const objectToAppend = {
      Authentication: 'testTokenData'
    };
    const actual = buildHeader(objectToAppend);
    const expected = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Authentication: 'testTokenData'
    };

    expect(actual).toMatchObject(expected);
  });
});

describe('aspectRatio(helper)', () => {
  it('is a function', () => {
    const actual = typeof aspectRatio;
    const expected = 'function';

    expect(actual).toEqual(expected);
  });

  it('returns a array', () => {
    const actual = typeof aspectRatio(5, 50);
    const expected = 'object';

    expect(actual).toEqual(expected);
  });

  it('returns array with expected data', () => {
    const actual = aspectRatio(10, 10);
    const expected = 2;
    expect(actual.length).toEqual(expected);
  });
});

describe('getCongnitoToken(helper)', () => {
  it('is a function', () => {
    const actual = typeof getCongnitoToken;
    const expected = 'function';

    expect(actual).toEqual(expected);
  });
});
