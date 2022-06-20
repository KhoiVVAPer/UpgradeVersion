import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import SectionSubHeader from '../../../../../components/custom/generic/sectionSubHeader';

const setUp = (props) => {
  const component = shallow(<SectionSubHeader {...props} />);
  return component;
};

describe('components > custom > elements > SectionSubHeader', () => {
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

  it('Renders sub-heading', () => {
    const input = component.find('Text').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders sub-heading with marking feature', () => {
    props = {
      ...props,
      marking: true,
      textKey: 'sub-heading-textKey'
    };
    component = setUp(props);
    const input = component.find('HtmlParser').length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
