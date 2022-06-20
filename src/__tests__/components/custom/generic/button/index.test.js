import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from '../../../../../components/custom/generic/button';

const setUp = (props) => {
  const component = shallow(<Button {...props} />);
  return component;
};


describe('components > custom > elements > Button', () => {
  let component;
  let props = {
    text: 'Button',
  };
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders TouchableDebounce component', () => {
    const input = component.find('TouchableDebounce').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders Text component', () => {
    const input = component.find('Text').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders Loading image component when loading prop is true', () => {
    props = {
      ...props,
      loading: true
    };
    component = setUp(props);
    const input = component.find('Image').length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
