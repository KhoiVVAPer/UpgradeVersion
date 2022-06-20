/**
 * @fileoverview This component renders design template
 * for image headline text fifty-fifty manual content.
 * @package
 */
import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { DcaImage } from '../../elements';
import { HtmlParser } from '../../generic';
import { appContexts, appStyles, helpers } from '../../../../config';
import styles from './styles';

const ImageHeadlineTextFiftyFifty = ({ layoutData }) => {
  const pageContentContext = useContext(appContexts.PageContentContext);
  const pageId = pageContentContext || { pageId: 100 };
  return (
    <View>
      <FlatList
        data={layoutData.values}
        renderItem={({ item, index }) => {
          const headlineStyle = item.headlinetype ? { ...appStyles[item.headlinetype] } : {};
          const cardKey = helpers.strToKey(item.headline);
          return (
            <View style={styles.wrap}>
              {
                !item.imageRight ? (
                  <DcaImage
                    url={item.image}
                    wrapStyle={[styles.imageWrap, { ...appStyles.mgR(10) }]}
                    useApectRatio
                    showEnlargedImage
                  />
                ) : null
              }
              <View style={styles.content}>
                {
                  item.headline ? (
                    <View style={styles.headingWrap}>
                      <HtmlParser
                        html={item.headline}
                        textKey={`imageHeadlineTextFiftyFifty-headline-${cardKey}-${pageId}-${index}`}
                        style={[styles.heading, headlineStyle]}
                      />
                    </View>
                  ) : null
                }
                {
                  item.text ? (
                    <View style={styles.descWrap}>
                      <HtmlParser
                        html={item.text}
                        textKey={`imageHeadlineTextFiftyFifty-text-${cardKey}-${pageId}-${index}`}
                        style={styles.description}
                      />
                    </View>
                  ) : null
                }
              </View>
              {
                item.imageRight ? (
                  <DcaImage
                    url={item.image}
                    wrapStyle={[styles.imageWrap, { ...appStyles.mgL(10) }]}
                    useApectRatio
                    showEnlargedImage
                  />
                ) : null
              }
            </View>
          );
        }}
        keyExtractor={(item, index) => `headlineText_${index}`}
        scrollEnabled={false}
      />
    </View>
  );
};

ImageHeadlineTextFiftyFifty.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};
export default ImageHeadlineTextFiftyFifty;
