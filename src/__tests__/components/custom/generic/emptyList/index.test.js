import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import EmptyList from '../../../../../components/custom/generic/emptyList';

const setUp = (props) => {
  const component = shallow(<EmptyList {...props} />);
  return component;
};


describe('components > custom > elements > EmptyList', () => {
  let component;
  const props = {
  };
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders component', () => {
    const input = component.find('View').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders Text component', () => {
    const input = component.find('Text').length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
