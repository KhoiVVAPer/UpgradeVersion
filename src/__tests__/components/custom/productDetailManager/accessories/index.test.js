import React from 'react';
import { shallow } from 'enzyme';
import Accessories from '../../../../../components/custom/productDetailManager/accessories';
import { accessoriesData } from '../../../../../assets/data/productDetails';
import { appConstants } from '../../../../../config';

jest.mock('../../../../../__mocks__/mainHocContextMock');
jest.mock('../../../../../__mocks__/pageContentContext');

const { accessories, productDetailsObj } = accessoriesData;
const { productDetailsDataSequence } = appConstants;

const setUp = (props) => {
  const component = shallow(<Accessories {...props} />);
  return component;
};


//  src/__tests__/components/custom/productDetailManager/accessories/index.test.js

describe('components > productDetailManager > accessories', () => {
  let component;
  beforeEach(() => {
    const props = {
      type: productDetailsDataSequence.ACCESSORIES,
      layoutData: accessories,
      productDetailsObj
    };
    component = setUp(props);
    return component;
  });

  // it('Check snapshot', () => {
  //   const tree = renderer.create(component).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('Renders header component', () => {
    const input = component.find('SectionHeader').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders dropdown component', () => {
    const input = component.find('Dropdown').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders show more button', () => {
    const buttonComponent = component.find({ dcaTest: 'showMore' });
    expect(buttonComponent).toBeDefined();
  });

  it('Renders flatlist component', () => {
    const input = component.find('FlatList').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check flatlist data prop', () => {
    const input = component.find('FlatList').prop('data');
    expect(input).toBeDefined();
  });

  it('Check flatlist is four columns', () => {
    const input = component.find('FlatList').prop('numColumns');
    const output = 4;
    expect(input).toEqual(output);
  });

  it('Check if flatlist is not scrollable', () => {
    const input = component.find('FlatList').prop('scrollEnabled');
    expect(input).toBeFalsy();
  });

  it('Check if flatlist contain key extractor', () => {
    const input = component.find('FlatList').prop('keyExtractor');
    expect(input).toBeDefined();
  });

  it('Check if flatlist contains renderItem prop', () => {
    const input = component.find('FlatList').prop('renderItem');
    expect(input).toBeDefined();
  });

  it('Check if component contains getProductDetailsData function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.getProductDetailsData;
    expect(input).toBeDefined();
  });

  it('Check if component contains renderProduct function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.renderProduct;
    expect(input).toBeDefined();
  });

  it('Check if component contains filterProduct function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.filterProduct;
    expect(input).toBeDefined();
  });

  it('Check if component contains renderDropdown function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.renderDropdown;
    expect(input).toBeDefined();
  });
  it('Check no of Item to load for accessories and cleaning products', () => {
    expect(component.state('numOfItemsToLoad')).toEqual(12);
  });
});
