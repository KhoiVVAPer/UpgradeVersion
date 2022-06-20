import { appConstants } from '../../../config';
import structureReducer from '../../../redux/reducers/structureReducer';

const { reduxConst } = appConstants;
const { STRUCTURE_LIST_SET, RESET_APP } = reduxConst;

describe('Structure data reducer', () => {
  it('Should return the initial state', () => {
    const input = [];
    const output = [];
    expect(structureReducer(undefined, input)).toEqual(output);
  });

  it('Should add provided product id i.e STRUCTURE_LIST_SET', () => {
    const input = {
      type: STRUCTURE_LIST_SET,
      structureData: [{ title: 'Page' }]
    };
    const output = [{ title: 'Page' }];
    expect(structureReducer(undefined, input)).toEqual(output);
  });

  it('Should handle Structure data redux store reset i.e RESET_APP', () => {
    const input = {
      type: RESET_APP
    };
    const output = [];
    expect(structureReducer(undefined, input)).toEqual(output);
  });
});
