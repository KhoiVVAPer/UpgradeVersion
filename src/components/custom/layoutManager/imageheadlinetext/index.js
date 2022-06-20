/**
 * @fileoverview This component renders design template
 * for image headline text manual content.
 * @package
 */
import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { DcaImage } from '../../elements';
import { HtmlParser } from '../../generic';
import { appContexts, appStyles, helpers } from '../../../../config';
import styles from './styles';

const ImageHeadlineText = ({ layoutData }) => {
  const pageContentContext = useContext(appContexts.PageContentContext);
  const { componentId } = pageContentContext || { componentId: 100 };
  return (
    <View>
      <FlatList
        data={layoutData.values}
        renderItem={({ item, index }) => {
          const headlineStyle = item.headlinetype ? { ...appStyles[item.headlinetype] } : {};
          const cardKey = helpers.strToKey(item.headline);
          return (
            <View style={styles.wrap}>
              <DcaImage
                url={item.image}
                useApectRatio
                showEnlargedImage
              />
              <View style={styles.headingWrap}>
                <HtmlParser
                  html={item.headline}
                  textKey={`imageHeadlineText-headline-${cardKey}-${componentId}-${index}`}
                  style={[styles.heading, headlineStyle]}
                />
              </View>
              <View style={styles.descWrap}>
                <HtmlParser
                  html={item.text}
                  textKey={`imageHeadlineText-desc-${cardKey}-${componentId}-${index}`}
                  style={styles.description}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => `headlineText_${index}`}
        scrollEnabled={false}
      />
    </View>
  );
};

ImageHeadlineText.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};
export default ImageHeadlineText;
