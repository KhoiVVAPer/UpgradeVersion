import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { appContexts } from '../../../../config';
import { HtmlParser } from '../../generic';
import styles from './styles';

const { PageContentContext } = appContexts;

class Equipments extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderItem = ({ item, index }) => {
    const { pageId } = this.context;
    const activeRow = index % 2 === 0 ? styles.activeRow : {};
    const valueDataFlag = item.value === '1';
    const equipmentData = `${item.label} ${valueDataFlag ? '' : `, ${item.value}`}`;
    return (
      <View style={[styles.equipmentRow, activeRow]}>
        <View style={styles.bullet} />
        <HtmlParser
          html={equipmentData}
          textKey={`prodD-equipment-list-${pageId}-${index}`}
          style={styles.equipmentLabel}
        />
      </View>
    );
  }

  render() {
    const { layoutData } = this.props;
    return (
      <View style={styles.equipmentWrap}>
        <FlatList
          extraData={this.state}
          data={layoutData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `equipment_${index}`}
          scrollEnabled={false}
        />
      </View>
    );
  }
}

Equipments.contextType = PageContentContext;
export default Equipments;
