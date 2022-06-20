import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ImageTextCard from '../../../../../components/custom/generic/imageTextCard';

const setUp = (props) => {
  const component = shallow(<ImageTextCard {...props} />);
  return component;
};

describe('components > custom > elements > ImageTextCard', () => {
  let component;
  beforeEach(() => {
    const props = {
      headline: 'heading',
      text: '<p>description</p>',
      url: 'https://s1.kaercher-media.com/products/13171300/main/1/d3.jpg'
    };
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders image component', () => {
    const input = component.find({ dcaTest: 'image' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders heading', () => {
    const input = component.find({ dcaTest: 'heading' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders description', () => {
    const input = component.find({ dcaTest: 'description' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
