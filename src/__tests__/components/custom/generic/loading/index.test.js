import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Loading from '../../../../../components/custom/generic/loading';

const setUp = (props) => {
  const component = shallow(<Loading {...props} />);
  return component;
};

describe('components > custom > elements > Loading', () => {
  let component;
  const props = {};
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders loading image', () => {
    const input = component.find('Image').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders configuring text image', () => {
    const input = component.find('Text').length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
