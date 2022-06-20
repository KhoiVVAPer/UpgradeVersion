import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Imageheadlinetext from '../../../../../components/custom/layoutManager/imageheadlinetext';
import { imageHeadlineText } from '../../../../../assets/data/pageContent';

const setUp = (props) => {
  const component = shallow(<Imageheadlinetext {...props} />);
  return component;
};

describe('components > custom > layoutManager > Imageheadlinetext', () => {
  let component;
  const props = {
    layoutData: JSON.parse(imageHeadlineText.config)
  };
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Check if renders FlatList', () => {
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
