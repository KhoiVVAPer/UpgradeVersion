import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {
  helpers,
  appContexts,
  tr,
  appConstants
} from '../../../../config';
import { SectionHeader, HtmlParser } from '../../generic';

const { textCasing } = appConstants;
const { PageContentContext } = appContexts;

class DetergentWarnings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.rowCounter = 1;
    this.activeRow = true;
  }

  renderItem = ({ item, index }) => {
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 2, marginHorizontal: 10, padding: 15 }} />;
    const { pageId } = this.context;
    this.rowCounter = this.rowCounter + 1;
    if (this.rowCounter > 2) {
      this.rowCounter = 1;
      this.activeRow = !this.activeRow;
    }
    const activeRow = this.activeRow ? styles.activeRow : {};
    return (
      <View
        style={[styles.listItem, activeRow]}
        dcaTest="listItem"
      >
        <View style={styles.bullet} />
        <HtmlParser
          html={item}
          textKey={`prodD-detergentWarnings-list-${pageId}-${index}`}
          style={styles.listItemTxt}
        />
      </View>
    );
  }

  render() {
    const { layoutData } = this.props;
    const { pageId, translations } = this.context;
    const arrMod = layoutData.length % 2;
    for (let i = 0; i < arrMod; i += 1) {
      layoutData.push({});
    }
    return (
      <View style={styles.wrap}>
        <SectionHeader
          marking
          heading={tr(translations, 'detergent_warning', '"DETERGENT WARNINGS & SAFETY RECOMMENDATIONS"', textCasing.U)}
          textKey={`prodD-detergentWarnings-head-${pageId}`}
        />
        <FlatList
          extraData={this.state}
          data={layoutData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `detergent_warning_${index}`}
          scrollEnabled={false}
          contentContainerStyle={styles.listItemContainer}
          columnWrapperStyle={styles.listItemColContainer}
          numColumns={2}
        />
      </View>
    );
  }
}

DetergentWarnings.propTypes = {
  layoutData: PropTypes.arrayOf(PropTypes.any).isRequired
};

DetergentWarnings.contextType = PageContentContext;
export default DetergentWarnings;
