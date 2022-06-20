import React from 'react';
import { View } from 'react-native';
import Header from '../../custom/mainHoc/header';
import { appConstants } from '../../../config';
import { Loading } from '../../custom';
import appStyles from '../../../assets/styles/appStyles';

const { routes } = appConstants;

const ScreenLayout = () => (
  <View style={appStyles.appStyles}>
    <Header
      screen={routes.HOME}
      pageId={0}
      setHeaderRef={() => { }}
    />
    <View style={appStyles.appStyles}>
      <Loading />
    </View>
  </View>
);

export default ScreenLayout;
