import React from 'react';
import { View, Platform, requireNativeComponent } from 'react-native';

const MarkText = Platform.OS === 'ios' ? View : requireNativeComponent('MarkText');

const MarkTextWrap = (props) => (
  <MarkText {...props} />
);

export default MarkTextWrap;
