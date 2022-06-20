import React from 'react';
import { Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AllHtmlEntities } from 'html-entities';
import { rootNavigation } from '../../../navigation';
import { TouchableDebounce, HtmlParser } from '../../custom';
import styles from './styles';

const ContentItem = ({ contentData, componentId, index }) => {
  let { headline } = contentData;
  const regex = /(<([^>]+)>)/ig;
  headline = headline ? headline.replace(regex, '') : '';

  headline = headline.length > 80 ? `${headline.substr(0, 80)}...` : headline;

  if (!headline) return null;

  const entities = new AllHtmlEntities();
  const formatedheadline = entities.decode(headline);
  return (
    <TouchableDebounce
      style={styles.contentTypeWrap}
      onPress={() => {
        Navigation.push(
          componentId,
          rootNavigation.pageContent({
            passProps: {
              pageId: contentData.pageId,
              checkParent: true
            }
          })
        );
      }}
    >
      <Text style={styles.contentTypeHead}>{formatedheadline}</Text>
      {
        contentData.text ? (
          <HtmlParser
            html={contentData.text}
            textKey={`search-desc-${contentData.pageId}-${index}`}
          />
        ) : null
      }

    </TouchableDebounce>
  );
};

export default ContentItem;
