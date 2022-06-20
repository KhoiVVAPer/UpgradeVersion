import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {
  helpers, appContexts, tr, appConstants
} from '../../../../config';
import { SectionHeader, HtmlParser } from '../../generic';

const { textCasing } = appConstants;
const { PageContentContext } = appContexts;

class Applicaions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.rowCounter = 1;
    this.activeRow = true;
  }

  renderItem = ({ item, index }) => {
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 2, marginHorizontal: 10, padding: 15 }} />;
    this.rowCounter = this.rowCounter + 1;
    const activeRow = this.activeRow ? styles.activeRow : {};
    if (this.rowCounter > 2) {
      this.rowCounter = 1;
      this.activeRow = !this.activeRow;
    }
    const { pageId } = this.context;

    return (
      <View
        style={[styles.listItem, activeRow]}
        dcaTest="listItem"
      >
        <View style={styles.bullet} />
        <HtmlParser
          html={item}
          textKey={`prodD-application-list-${pageId}-${index}`}
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
          heading={tr(translations, 'applications', 'APPLICATIONS', textCasing.U)}
          marking
          textKey={`prodD-application-head-${pageId}`}
        />
        <FlatList
          extraData={this.state}
          data={layoutData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `applications_${index}`}
          scrollEnabled={false}
          contentContainerStyle={styles.listItemContainer}
          columnWrapperStyle={styles.listItemColContainer}
          numColumns={2}
        />
      </View>
    );
  }
}

Applicaions.propTypes = {
  layoutData: PropTypes.arrayOf(PropTypes.any).isRequired
};

Applicaions.contextType = PageContentContext;
export default Applicaions;
