import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ImageCollection from '../../../../../components/custom/layoutManager/imageCollection';
import { imageCollection } from '../../../../../assets/data/pageContent';

const setUp = (props) => {
  const component = shallow(<ImageCollection {...props} />);
  return component;
};

describe('components > custom > layoutManager > ImageCollection', () => {
  let component;
  const props = {
    layoutData: imageCollection
  };
  beforeEach(() => {
    component = setUp(props);
    component.setState({
      imageSmallTop: 'http://test.png',
      imageSmallMiddle: 'http://test.png',
      imageSmallBottom: 'http://test.png',
      imageBig: 'http://test.png'
    });
    return component;
  });

  it('Check snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders all images', () => {
    const input = component.find('ImageBackground').length;
    const output = 4;
    expect(input).toEqual(output);
  });

  it('Renders banner button', () => {
    const input = component.find('Button').length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Renders links for images', () => {
    const input = component.find('TouchableOpacity').length;
    const output = 4;
    expect(input).toEqual(output);
  });

  it('Renders headline with marking feature', () => {
    const input = component.find('HtmlParser').length;
    const output = 4;
    expect(input).toEqual(output);
  });

  it('Contains navigate method', () => {
    const componentInstance = component.instance();
    const input = componentInstance.navigate;
    expect(input).toBeDefined();
  });
});
