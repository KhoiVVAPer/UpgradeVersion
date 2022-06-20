import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ProductGroupOverview from '../../../../../components/custom/layoutManager/productGroupOverview';

const setUp = (props) => {
  const component = shallow(<ProductGroupOverview {...props} />);
  return component;
};

describe('components > custom > layoutManager > ProductGroupOverview', () => {
  let component;
  const props = {
    layoutData: {
      productgroupId: '100',
      ribbon: true,
      ribbonButtonTarget: 100
    },
    getProductGroups: () => {}
  };
  beforeEach(() => {
    component = setUp(props);
    component.setState({
      loading: false,
      error: false,
      productGroups: [{
        id: '100',
        texts: [],
        name: ''
      }]
    });
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('Renders moveto top icon', () => {
  //   const input = component.find('FontIcon').length;
  //   const output = 1;
  //   expect(input).toEqual(output);
  // });

  it('Renders loader', () => {
    component.setState({
      loading: true
    });
    const input = component.find('Loading').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders error view', () => {
    component.setState({
      loading: false,
      error: true
    });
    const input = component.find('ErrorView').length;
    const output = 1;
    expect(input).toEqual(output);
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

  it('FlatList has data numColumns', () => {
    const input = component.find('FlatList').prop('numColumns');
    expect(input).toBeDefined();
  });

  it('Renders reloadPage function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.reloadPage;
    expect(input).toBeDefined();
  });

  it('Renders navigate function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.navigate;
    expect(input).toBeDefined();
  });
});
