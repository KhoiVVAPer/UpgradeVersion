import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ErrorView from '../../../../../components/custom/generic/errorView';

const setUp = (props) => {
  const component = shallow(<ErrorView {...props} />);
  return component;
};

describe('components > custom > elements > ErrorView', () => {
  let component;
  let props = {};
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders component', () => {
    const input = component.find('ScrollView').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check if component has refresh callback', () => {
    const input = component.find('ScrollView').prop('refreshControl');
    expect(input).toBeDefined();
  });

  it('Renders error image', () => {
    const input = component.find('FontIcon').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders error title component', () => {
    const input = component.find({ dcaTest: 'title' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders actual error component', () => {
    const input = component.find({ dcaTest: 'error' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders Settings button component when settings prop is true', () => {
    props = {
      settings: true
    };
    component = setUp(props);
    const input = component.find('Button').length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
