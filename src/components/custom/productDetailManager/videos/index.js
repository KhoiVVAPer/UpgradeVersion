import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {
  appContexts,
  helpers,
  appConstants,
  tr
} from '../../../../config';
import {
  SectionHeader,
} from '../../generic';
import styles from './styles';
import ListItem from './listItem';

const { textCasing } = appConstants;
const { PageContentContext } = appContexts;

class Videos extends Component {
  renderVideos = ({ item }) => {
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 3, margin: 10 }} />;
    const { pageId } = this.context;
    const { type } = this.props;
    return (
      <ListItem
        productData={item}
        textKey={`product_video_list_item-${pageId}-${type}-${item.urls[0].url}`}
      />
    );
  }

  render() {
    const { layoutData } = this.props;
    const { translations } = this.context;

    const arr = layoutData;

    const heading = tr(translations, 'videos', 'VIDEOS', textCasing.U);

    if (arr && arr.length) {
      return (
        <View style={styles.wrap}>
          <SectionHeader heading={heading} />
          <FlatList
            extraData={this.state}
            data={arr}
            renderItem={this.renderVideos}
            contentContainerStyle={styles.listItemContainer}
            columnWrapperStyle={styles.listItemColContainer}
            keyExtractor={(item) => `product_video-${item.urls[0].url}`}
            scrollEnabled={false}
            numColumns={3}
          />
        </View>
      );
    }
    return null;
  }
}

Videos.contextType = PageContentContext;
export default Videos;
