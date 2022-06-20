import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Anchors from '../../../../../components/custom/layoutManager/anchors';
import { anchors } from '../../../../../assets/data/pageContent';

const setUp = (props) => {
  const component = shallow(<Anchors {...props} />);
  return component;
};

describe('components > custom > layoutManager > Anchors', () => {
  let component;
  const props = {
    layoutData: JSON.parse(anchors.config)
  };
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders Anchors component', () => {
    const input = component.find('ScrollView').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Scrollview rendered with horizontal prop', () => {
    const input = component.find('ScrollView').prop('horizontal');
    expect(input).toBeDefined();
  });

  it('All anchors are rendered properly', () => {
    const input = component.find('TouchableDebounce').length;
    const output = 8;
    expect(input).toEqual(output);
  });

  it('Renders renderAnchor function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.renderAnchor;
    expect(input).toBeDefined();
  });

  it('Renders navigate function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.navigate;
    expect(input).toBeDefined();
  });
});
