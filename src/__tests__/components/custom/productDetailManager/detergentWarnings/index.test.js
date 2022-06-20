import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import DetergentWarnings from '../../../../../components/custom/productDetailManager/detergentWarnings';
import { detergentWarningsArr } from '../../../../../assets/data/productDetails';

const setUp = (props) => {
  const component = shallow(<DetergentWarnings {...props} />);
  return component;
};

describe('components > productDetailManager > detergentWarnings', () => {
  let component;
  beforeEach(() => {
    component = setUp({ layoutData: detergentWarningsArr });
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders header component', () => {
    const input = component.find('SectionHeader').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders flatlist component', () => {
    const input = component.find('FlatList').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check flatlist data prop', () => {
    const input = component.find('FlatList').prop('data');
    const output = detergentWarningsArr;
    expect(input).toEqual(output);
  });

  it('Check flatlist is two columns', () => {
    const input = component.find('FlatList').prop('numColumns');
    const output = 2;
    expect(input).toEqual(output);
  });

  it('Check if flatlist is not scrollable', () => {
    const input = component.find('FlatList').prop('scrollEnabled');
    expect(input).toBeFalsy();
  });

  it('Check if flatlist contains renderItem prop', () => {
    const input = component.find('FlatList').prop('renderItem');
    expect(input).toBeDefined();
  });

  it('Check if component contains renderItem function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.renderItem;
    expect(input).toBeDefined();
  });

  it('Check if component contains renderItem view is rendered', () => {
    const listWrapper = component.find({ dcaTest: 'listItem' });
    expect(listWrapper).toBeDefined();
  });
});
