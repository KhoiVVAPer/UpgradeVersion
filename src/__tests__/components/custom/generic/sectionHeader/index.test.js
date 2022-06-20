import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import SectionHeader from '../../../../../components/custom/generic/sectionHeader';

const setUp = (props) => {
  const component = shallow(<SectionHeader {...props} />);
  return component;
};

describe('components > custom > elements > SectionHeader', () => {
  let component;
  let props = {
    heading: 'Heading'
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

  it('Renders heading', () => {
    const input = component.find('Text').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders heading with marking feature', () => {
    props = {
      ...props,
      marking: true
    };
    component = setUp(props);
    const input = component.find('HtmlParser').length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
