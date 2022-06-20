import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Document from '../../../../../components/custom/productDetailManager/document';

const setUp = (props) => {
  const component = shallow(<Document {...props} />);
  return component;
};

describe('components > custom > layoutManager > Document', () => {
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

  it('Check if renders FlatList for data', () => {
    const input = component.find('FlatList').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check if FlatList has renderItem props', () => {
    const input = component.find('FlatList').prop('renderItem');
    expect(input).toBeDefined();
  });

  it('Check if FlatList has scroll disabled', () => {
    const input = component.find('FlatList').prop('scrollEnabled');
    expect(input).toBeFalsy();
  });

  it('Check if FlatList has data', () => {
    const input = component.find('FlatList').prop('data');
    expect(input).toBeDefined();
  });
});
