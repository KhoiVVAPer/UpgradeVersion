import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TouchableDebounce from '../../../../../components/custom/elements/touchableDebounce';

const setUp = (props) => {
  const component = shallow(<TouchableDebounce {...props} />);
  return component;
};


describe('components > custom > elements > touchableDebounce', () => {
  let component;
  beforeEach(() => {
    const props = {
    };
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders Text component', () => {
    const input = component.find('TouchableOpacity').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check if text component contain onPress prop', () => {
    const input = component.find('TouchableOpacity').prop('onPress');
    expect(input).toBeDefined();
  });
});
