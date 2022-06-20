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

class Recommendations extends Component {
  renderProduct = ({ item }) => {
    const { translations } = this.context;
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 4, margin: 10 }} />;
    const { pageId } = this.context;
    const { type } = this.props;
    return (
      <ListItem
        productData={item}
        textKey={`recommendated_product-${pageId}-${type}-${item.partnumberFormatted}`}
        translations={translations}
      />
    );
  }

  render() {
    const { layoutData } = this.props;
    const { translations } = this.context;

    const arr = layoutData.data;

    const heading = arr.length === 1
      ? tr(translations, 'recommendation', 'RECOMMENDATION', textCasing.U)
      : tr(translations, 'recommendations', 'RECOMMENDATIONS', textCasing.U);

    if (arr && arr.length) {
      return (
        <View style={styles.wrap}>
          <SectionHeader heading={heading} />
          <FlatList
            extraData={this.state}
            data={arr}
            renderItem={this.renderProduct}
            contentContainerStyle={styles.listItemContainer}
            columnWrapperStyle={styles.listItemColContainer}
            keyExtractor={(item) => `recommendated_product-${item.partnumberFormatted}`}
            scrollEnabled={false}
            numColumns={4}
          />
        </View>
      );
    }
    return null;
  }
}

Recommendations.contextType = PageContentContext;
export default Recommendations;
