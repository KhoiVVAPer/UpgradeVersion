import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ConfigurableComponents from '../../../../../components/custom/productDetailManager/configurableComponents';

const setUp = (props) => {
  const component = shallow(<ConfigurableComponents {...props} />);
  return component;
};

describe('components > custom > layoutManager > ConfigurableComponents', () => {
  let component;
  const props = {
    layoutData: []
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

  it('Check if renders FlatList for column1 data', () => {
    const input = component.find({ dcaTest: 'column1Flatlist' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check if column1 FlatList has renderItem props', () => {
    const input = component.find({ dcaTest: 'column1Flatlist' }).prop('renderItem');
    expect(input).toBeDefined();
  });

  it('Check if column1 FlatList has scroll disabled', () => {
    const input = component.find({ dcaTest: 'column1Flatlist' }).prop('scrollEnabled');
    expect(input).toBeFalsy();
  });

  it('Check if column1 FlatList has data', () => {
    const input = component.find({ dcaTest: 'column1Flatlist' }).prop('data');
    expect(input).toBeDefined();
  });

  it('Check if renders FlatList for column2 data', () => {
    const input = component.find({ dcaTest: 'column2Flatlist' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check if column2 FlatList has renderItem props', () => {
    const input = component.find({ dcaTest: 'column2Flatlist' }).prop('renderItem');
    expect(input).toBeDefined();
  });

  it('Check if column2 FlatList has scroll disabled', () => {
    const input = component.find({ dcaTest: 'column2Flatlist' }).prop('scrollEnabled');
    expect(input).toBeFalsy();
  });

  it('Check if column2 FlatList has data', () => {
    const input = component.find({ dcaTest: 'column2Flatlist' }).prop('data');
    expect(input).toBeDefined();
  });
});
