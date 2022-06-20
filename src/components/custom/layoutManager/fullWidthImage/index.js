/**
 * @fileoverview This component renders design template
 * for full width image manual content.
 * @package
 */
import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { DcaImage } from '../../elements';
import styles from './styles';

const FullWidthImage = ({ layoutData }) => (
  <View style={styles.wrap}>
    <FlatList
      data={layoutData.values}
      renderItem={({ item }) => (
        <DcaImage
          url={item.image}
          useApectRatio
          showEnlargedImage
        />
      )}
      keyExtractor={(item, index) => `fill_image_${index}`}
      scrollEnabled={false}
    />
  </View>
);

FullWidthImage.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default FullWidthImage;
