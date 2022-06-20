/**
 * @fileoverview This component renders design template
 * for image headline text manual content.
 * @package
 */
import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { HtmlParser } from '../../generic';
import { appContexts } from '../../../../config';
import styles from './styles';

const TextContent = ({ layoutData }) => {
  const pageContentContext = useContext(appContexts.PageContentContext);
  const { componentId } = pageContentContext || { componentId: 100 };
  return (
    <View>
      <FlatList
        data={layoutData.values}
        renderItem={({ item, index }) => (
          <View style={styles.wrap}>
            <HtmlParser
              html={item.text}
              textKey={`manual-content-text-${componentId}-${index}`}
              style={styles.descWrap}
            />
          </View>
        )}
        keyExtractor={(item, index) => `manual-content-text_${index}`}
        scrollEnabled={false}
      />
    </View>
  );
};

TextContent.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};
export default TextContent;
