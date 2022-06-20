/**
 * @fileoverview This component renders design template
 * for image product group list item manual content.
 * @package
 */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { DcaImage, TouchableDebounce } from '../../elements';
import { HtmlParser } from '../../generic';
import styles from './styles';

const ListItem = ({
  productGroupData,
  navigate,
  textKey
}) => {
  let fullImage = '';
  productGroupData.texts.map((item1) => {
    if (item1.type === 'group') {
      item1.images.map((item2) => {
        if (item2.type === 'full') {
          fullImage = item2.url;
        }
        return null;
      });
    }
    return null;
  });

  return (
    <View style={styles.listItem}>
      <TouchableDebounce onPress={() => navigate(productGroupData.id)}>
        <DcaImage
          url={fullImage}
          imageStyle={styles.listItemImg}
          wrapStyle={styles.listItemImgWrap}
        />
        <View style={styles.listItemContent}>
          <HtmlParser
            html={productGroupData.name}
            textKey={textKey}
            style={styles.listItemImgHeadTxt}
            onPress={() => navigate(productGroupData.id)}
          />
        </View>
      </TouchableDebounce>
    </View>
  );
};

ListItem.propTypes = {
  productGroupData: PropTypes.objectOf(PropTypes.any).isRequired,
  navigate: PropTypes.func.isRequired,
  textKey: PropTypes.string.isRequired
};
export default ListItem;
