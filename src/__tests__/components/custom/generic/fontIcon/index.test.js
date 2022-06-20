import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import FontIcon from '../../../../../components/custom/generic/fontIcon/_fontIcon';

const setUp = (props) => {
  const component = shallow(<FontIcon {...props} />);
  return component;
};

describe('components > custom > elements > FontIcon', () => {
  let component;
  const props = {
    icon: 'star',
    type: 'Entypo',
  };
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders FontWrap component', () => {
    const input = component.find('FontWrap').length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
