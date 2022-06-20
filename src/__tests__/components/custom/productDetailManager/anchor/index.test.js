import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Anchor from '../../../../../components/custom/productDetailManager/anchor';
import { anchorArr } from '../../../../../assets/data/productDetails';

const setUp = (props) => {
  const component = shallow(<Anchor {...props} />);
  return component;
};


describe('components > productDetailManager > anchor', () => {
  let component;
  beforeEach(() => {
    const props = {
      layoutData: anchorArr,
      setAnchorData: () => {},
      navigateTo: () => {}
    };
    component = setUp(props);
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Render wrapper View compoents', () => {
    const input = component.find('View').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Render all anchors from data', () => {
    const input = component.find('TouchableDebounce').length;
    const output = 4;
    expect(input).toEqual(output);
  });

  it('Is navigate function added', () => {
    const inputInstance = component.instance();
    const input = inputInstance.navigate;
    expect(input).toBeDefined();
  });

  it('Is setActiveAnchor function added', () => {
    const inputInstance = component.instance();
    const input = inputInstance.setActiveAnchor;
    expect(input).toBeDefined();
  });
});
