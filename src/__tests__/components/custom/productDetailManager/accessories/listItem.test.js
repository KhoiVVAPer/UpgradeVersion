import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../../../../../components/custom/productDetailManager/accessories/listItem';
import { accessoriesData } from '../../../../../assets/data/productDetails';

jest.mock('../../../../../__mocks__/mainHocContextMock');
jest.mock('../../../../../__mocks__/pageContentContext');

const { accessories } = accessoriesData;

const setUp = (props) => {
  const component = shallow(<ListItem {...props} />);
  return component;
};


describe('components > productDetailManager > accessories > listItem', () => {
  let component;
  beforeEach(() => {
    const props = {
      productData: accessories[0]
    };
    component = setUp(props);
    return component;
  });

  // it('Check snapshot', () => {
  //   const tree = renderer.create(component).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('Renders TouchableDebounce i.e tap event on listItem and compare text', () => {
    const input = component.find('TouchableDebounce').length;
    const output = 2;
    expect(input).toEqual(output);
  });

  // it('Renders DcaImage component', () => {
  //   const input = component.find('DcaImage').length;
  //   const output = 1;
  //   expect(input).toEqual(output);
  // });

  it('Renders product name text', () => {
    const input = component.find({ dcaTest: 'productName' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders toggle compare wrap', () => {
    const input = component.find({ dcaTest: 'compareWrap' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders loading indicator', () => {
    component.setState({ compareLoading: true });
    const input = component.find({ dcaTest: 'loadingIndicator' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
