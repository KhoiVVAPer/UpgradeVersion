import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CompatibleMachines from '../../../../../components/custom/productDetailManager/compatibleMachines';

const setUp = (props) => {
  const component = shallow(<CompatibleMachines {...props} />);
  return component;
};

describe('components > custom > layoutManager > CompatibleMachines', () => {
  let component;
  const props = {
    layoutData: {
      current: [{ name: 'test' }],
      past: [{ name: 'test' }],
    }
  };
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders heading', () => {
    const input = component.find('SectionHeader').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders proper subheadings', () => {
    const input = component.find({ dcaTest: 'SectionSubHeader' }).length;
    const output = 2;
    expect(input).toEqual(output);
  });

  it('Check if renders two FlatList for current data', () => {
    const input = component.find({ dcaTest: 'currentFlatlist' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check if current FlatList has renderItem props', () => {
    const input = component.find({ dcaTest: 'currentFlatlist' }).prop('renderItem');
    expect(input).toBeDefined();
  });

  it('Check if current FlatList has scroll disabled', () => {
    const input = component.find({ dcaTest: 'currentFlatlist' }).prop('scrollEnabled');
    expect(input).toBeFalsy();
  });

  it('Check if current FlatList has data', () => {
    const input = component.find({ dcaTest: 'currentFlatlist' }).prop('data');
    expect(input).toBeDefined();
  });

  it('FlatList past has data numColumns', () => {
    const input = component.find({ dcaTest: 'currentFlatlist' }).prop('numColumns');
    expect(input).toBeDefined();
  });

  it('Check if renders two FlatList for past data', () => {
    const input = component.find({ dcaTest: 'pastFlatlist' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check if past FlatList has renderItem props', () => {
    const input = component.find({ dcaTest: 'pastFlatlist' }).prop('renderItem');
    expect(input).toBeDefined();
  });

  it('Check if past FlatList has scroll disabled', () => {
    const input = component.find({ dcaTest: 'pastFlatlist' }).prop('scrollEnabled');
    expect(input).toBeFalsy();
  });

  it('Check if past FlatList has data', () => {
    const input = component.find({ dcaTest: 'pastFlatlist' }).prop('data');
    expect(input).toBeDefined();
  });

  it('FlatList past has data numColumns', () => {
    const input = component.find({ dcaTest: 'pastFlatlist' }).prop('numColumns');
    expect(input).toBeDefined();
  });

  it('Renders navigateToProduct function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.navigateToProduct;
    expect(input).toBeDefined();
  });
});
