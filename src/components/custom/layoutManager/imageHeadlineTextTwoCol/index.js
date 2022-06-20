/**
 * @fileoverview This component renders design template
 * for image headline text four columns manual content.
 * @package
 */
import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { ImageTextCard } from '../../generic';
import { appContexts, helpers } from '../../../../config';
import styles from './styles';

const ImageHeadlineTextTwoCol = ({ layoutData }) => {
  const pageContentContext = useContext(appContexts.PageContentContext);
  const pageId = pageContentContext || { pageId: 100 };

  return (
    <FlatList
      data={layoutData.values}
      renderItem={({ item, index }) => {
        const card1Key = helpers.strToKey(item.headline_left);
        const card2Key = helpers.strToKey(item.headline_right);
        return (
          <View style={styles.container}>
            <ImageTextCard
              headline={item.headline_left}
              headlineType={item.headlinetype_left}
              text={item.text_left}
              url={item.image_left}
              key={`imageHeadlineTextTwoCol1-${card1Key}-${pageId}-${index}`}
              dcaKey={`imageHeadlineTextTwoCol1-${card1Key}-${pageId}-${index}`}
            />
            <ImageTextCard
              headline={item.headline_right}
              headlineType={item.headlinetype_right}
              text={item.text_right}
              url={item.image_right}
              key={`imageHeadlineTextTwoCol2-${card2Key}-${pageId}-${index}`}
              dcaKey={`imageHeadlineTextTwoCol2-${card2Key}-${pageId}-${index}`}
            />
          </View>
        );
      }}
      keyExtractor={(item, index) => `imageHeadlineTextTwoCol-${index}`}
      scrollEnabled={false}
    />
  );
};

ImageHeadlineTextTwoCol.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};
export default ImageHeadlineTextTwoCol;
