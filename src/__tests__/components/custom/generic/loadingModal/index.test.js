import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import LoadingModal from '../../../../../components/custom/generic/loadingModal';

const setUp = (props) => {
  const component = shallow(<LoadingModal {...props} />);
  return component;
};

describe('components > custom > elements > LoadingModal', () => {
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

  it('Renders Modal component', () => {
    const input = component.find('Modal').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders loading image', () => {
    const input = component.find('Image').length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
