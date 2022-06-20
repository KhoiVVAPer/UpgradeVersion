import React from 'react';
import { View, Text } from 'react-native';
import { tr, appConstants } from '../../../config';
import { TouchableDebounce } from '../../custom';
import styles from './styles';

const { textCasing } = appConstants;

const TabItem = ({
  loading,
  tabs,
  activeNav,
  switchTab,
  translations
}) => {
  if (loading) return null;
  return (
    <View style={styles.tabWrap}>
      {
        tabs.map((item) => {
          const isActive = activeNav.key === item.key;
          const tabItemStyle = isActive ? styles.activeTabItem : {};
          const tabItemTxtStyle = isActive ? styles.activeTabItemTxt : {};
          return (
            <TouchableDebounce
              onPress={() => { switchTab(item); }}
              style={[styles.tabItem, tabItemStyle]}
              key={`tab-${item.key}`}
            >
              <Text style={[styles.tabItemTxt, tabItemTxtStyle]}>{tr(translations, item.key, item.lable, textCasing.U)}</Text>
            </TouchableDebounce>
          );
        })
      }
    </View>
  );
};

export default TabItem;
