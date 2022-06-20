import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import HeadlineText from '../../../../../components/custom/layoutManager/headlineText';
import { headlineText } from '../../../../../assets/data/pageContent';

const setUp = (props) => {
  const component = shallow(<HeadlineText {...props} />);
  return component;
};

describe('components > custom > layoutManager > HeadlineText', () => {
  let component;
  const props = {
    layoutData: JSON.parse(headlineText.config)
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

  it('Check if component contains navigate function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.navigate;
    expect(input).toBeDefined();
  });

  it('Check if component contains addToFavourite function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.addToFavourite;
    expect(input).toBeDefined();
  });

  it('Check if component contains deleteToFavourite function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.deleteToFavourite;
    expect(input).toBeDefined();
  });

  it('Check if component contains moreInfoButton function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.moreInfoButton;
    expect(input).toBeDefined();
  });
});
