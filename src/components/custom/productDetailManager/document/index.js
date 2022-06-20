import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {
  helpers, appContexts, tr, appConstants
} from '../../../../config';
import styles from './styles';
import SectionHeader from '../../generic/sectionHeader';
import ListItem from './listItem';

const { textCasing } = appConstants;
const { PageContentContext } = appContexts;

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderItem = ({ item, index }) => {
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 6, margin: 10 }} />;
    const { pageId } = this.context;

    return (
      <ListItem
        documentData={item}
        textKey={`prodD-document-item-${pageId}-${index}`}
      />
    );
  }

  render() {
    const { layoutData } = this.props;
    const { pageId, translations } = this.context;

    const arr = [...layoutData];
    let arrMod = 0;
    if (layoutData.length < 6) {
      arrMod = 6 - layoutData.length;
    } else if (layoutData.length > 6) {
      arrMod = layoutData.length - 6;
    }
    for (let i = 0; i < arrMod; i += 1) {
      arr.push({});
    }
    return (
      <View style={styles.wrap}>
        <SectionHeader
          marking
          heading={tr(translations, 'downloads', 'Downloads', textCasing.U)}
          textKey={`prodD-document-head-${pageId}`}
        />
        <FlatList
          extraData={this.state}
          data={arr}
          renderItem={this.renderItem}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.listColContainer}
          keyExtractor={(item, index) => `prodD_document_${index}`}
          scrollEnabled={false}
          numColumns={6}
        />
      </View>
    );
  }
}

Document.contextType = PageContentContext;
export default Document;
