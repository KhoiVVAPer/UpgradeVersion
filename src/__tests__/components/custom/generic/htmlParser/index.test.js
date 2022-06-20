import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import HtmlParser from '../../../../../components/custom/generic/htmlParser';

const setUp = (props) => {
  const component = shallow(<HtmlParser {...props} />);
  return component;
};

describe('components > custom > elements > HtmlParser', () => {
  let component;
  const props = {
    html: '<p>hello</p>'
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

  it('Renders HTML component', () => {
    const input = component.find('HTML').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders HTML component html prop', () => {
    const input = component.find('HTML').prop('html');
    expect(input).toBeDefined();
  });
});
