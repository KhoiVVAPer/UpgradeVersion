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

const ImageHeadlineTextFourCol = ({ layoutData }) => {
  const pageContentContext = useContext(appContexts.PageContentContext);
  const pageId = pageContentContext || { pageId: 100 };
  return (
    <FlatList
      data={layoutData.values}
      renderItem={({ item, index }) => {
        const card1Key = helpers.strToKey(item.headline_first);
        const card2Key = helpers.strToKey(item.headline_second);
        const card3Key = helpers.strToKey(item.headline_thrid);
        const card4Key = helpers.strToKey(item.headline_fourth);
        return (
          <View style={styles.container}>
            <ImageTextCard
              headline={item.headline_first}
              headlineType={item.headlinetype_first}
              text={item.text_first}
              url={item.image_first}
              key={`imageHeadlineTextFourCol1-${card1Key}-${pageId}-${index}`}
              dcaKey={`imageHeadlineTextFourCol1-${card1Key}-${pageId}-${index}`}
            />
            <ImageTextCard
              headline={item.headline_second}
              headlineType={item.headlinetype_second}
              text={item.text_second}
              url={item.image_second}
              key={`imageHeadlineTextFourCol2-${card2Key}-${pageId}-${index}`}
              dcaKey={`imageHeadlineTextFourCol2-${card2Key}-${pageId}-${index}`}
            />
            <ImageTextCard
              headline={item.headline_third}
              headlineType={item.headlinetype_third}
              text={item.text_third}
              url={item.image_third}
              key={`imageHeadlineTextFourCol3-${card3Key}-${pageId}-${index}`}
              dcaKey={`imageHeadlineTextFourCol3-${card3Key}-${pageId}-${index}`}
            />
            <ImageTextCard
              headline={item.headline_fourth}
              headlineType={item.headlinetype_fourth}
              text={item.text_fourth}
              url={item.image_fourth}
              key={`imageHeadlineTextFourCol4-${card4Key}-${pageId}-${index}`}
              dcaKey={`imageHeadlineTextFourCol4-${card4Key}-${pageId}-${index}`}
            />
          </View>
        );
      }}
      keyExtractor={(item, index) => `image_four_col_${index}`}
      scrollEnabled={false}
    />
  );
};

ImageHeadlineTextFourCol.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};
export default ImageHeadlineTextFourCol;
