import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BusinessUnitEntry from '../../../../../components/custom/layoutManager/businessUnitEntry';
import { businessUnitEntry } from '../../../../../assets/data/pageContent';

const setUp = (props) => {
  const component = shallow(<BusinessUnitEntry {...props} />);
  return component;
};

describe('components > custom > layoutManager > BusinessUnitEntry', () => {
  let component;
  const props = {
    layoutData: businessUnitEntry
  };
  beforeEach(() => {
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Check if contains renderCatalogue function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.renderCatalogue;
    expect(input).toBeDefined();
  });

  it('Check if contains navigate function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.navigate;
    expect(input).toBeDefined();
  });

  it('Check if renders images properly', () => {
    const input = component.find({ dcaTest: 'image' }).length;
    const output = 2;
    expect(input).toEqual(output);
  });

  it('Check if renders buttons properly', () => {
    const input = component.find('Button').length;
    const output = 2;
    expect(input).toEqual(output);
  });

  it('Check if renders headline with marking properly', () => {
    const input = component.find('HtmlParser').length;
    const output = 2;
    expect(input).toEqual(output);
  });

  it('Check if renders TouchableDebounce for navigation components', () => {
    const input = component.find('TouchableDebounce').length;
    const output = 2;
    expect(input).toEqual(output);
  });
});
