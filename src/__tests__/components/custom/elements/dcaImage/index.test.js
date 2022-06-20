import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import DcaImage from '../../../../../components/custom/elements/dcaImage';

const setUp = (props) => {
  const component = shallow(<DcaImage {...props} />);
  return component;
};


describe('components > custom > elements > dcaImage', () => {
  let component;
  let props = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png',
    wrapStyle: {},
    imageStyle: {}
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
    const input = component.find({ dcaTest: 'dcaImage' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });

  it('Check if component contains imageWithAspectRatio function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.imageWithAspectRatio;
    expect(input).toBeDefined();
  });

  it('Check if component contains imageWithoutAspectRatio function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.imageWithoutAspectRatio;
    expect(input).toBeDefined();
  });

  it('Check if component contains configureImage function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.configureImage;
    expect(input).toBeDefined();
  });

  it('Check if component contains changeImage function', () => {
    const componentInstance = component.instance();
    const input = componentInstance.changeImage;
    expect(input).toBeDefined();
  });

  it('Check if component render images with proper aspect ratio', () => {
    props = {
      ...props,
      useApectRatio: true
    };
    component = setUp(props);
    component.setState({ loading: false });
    const input = component.find({ dcaTest: 'imageWithAspectRatio' }).length;
    const output = 1;
    expect(input).toEqual(output);
  });
});
