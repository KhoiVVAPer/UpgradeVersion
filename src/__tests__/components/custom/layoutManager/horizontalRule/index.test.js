import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import HorizontalRule from '../../../../../components/custom/layoutManager/horizontalRule';
import { headlineText } from '../../../../../assets/data/pageContent';

const setUp = (props) => {
  const component = shallow(<HorizontalRule {...props} />);
  return component;
};

describe('components > custom > layoutManager > HorizontalRule', () => {
  let component;
  const props = {
    layoutData: JSON.parse(headlineText.config)
  };
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders HorizontalRule', () => {
    const input = component.find('View').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders HorizontalRule', () => {
    const input = component.find('View').prop('style');
    expect(input).toBeDefined();
  });
});
