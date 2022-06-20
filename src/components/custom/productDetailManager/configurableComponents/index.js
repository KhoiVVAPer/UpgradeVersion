import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { SectionHeader } from '../../generic';
import ListItem from './listItem';
import { appContexts, tr, appConstants } from '../../../../config';

const { textCasing } = appConstants;
const { PageContentContext } = appContexts;

class ConfigurableComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderItem = ({ item, index }) => {
    const { pageId } = this.context;
    return (
      <ListItem
        listItem={item}
        textKey={`prodD-configurableComponents-item-${pageId}-${index}`}
      />
    );
  }

  render() {
    const { layoutData } = this.props;
    const { pageId, translations } = this.context;

    const listOffset = Math.round(layoutData.length / 2);


    const list1 = layoutData.slice(0, listOffset);
    const list2 = layoutData.slice(listOffset - 1, layoutData.length - 1);
    return (
      <View style={styles.wrap}>
        <SectionHeader
          marking
          heading={tr(translations, 'configurable_component', 'CONFIGURABLE COMPONENTS', textCasing.U)}
          textKey={`prodD-configurableComponents-head-${pageId}`}
        />
        <View style={styles.listContainer}>
          <View style={styles.listContainerItem}>
            <FlatList
              dcaTest="column1Flatlist"
              extraData={this.state}
              data={list1}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `configurablecomponents_${item.id}_${index}`}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.listContainerItem}>
            <FlatList
              dcaTest="column2Flatlist"
              extraData={this.state}
              data={list2}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `configurablecomponents_${item.id}_${index}`}
              scrollEnabled={false}
            />
          </View>
        </View>

      </View>
    );
  }
}

ConfigurableComponents.propTypes = {
  layoutData: PropTypes.arrayOf(PropTypes.any).isRequired
};

ConfigurableComponents.contextType = PageContentContext;
export default ConfigurableComponents;
