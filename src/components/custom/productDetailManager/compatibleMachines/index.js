import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import styles from './styles';
import {
  helpers, colors, icons, appContexts, tr, appConstants
} from '../../../../config';
import {
  SectionHeader, SectionSubHeader, FontIcon, HtmlParser
} from '../../generic';
import { rootNavigation } from '../../../../navigation';

const { textCasing } = appConstants;
const { PageContentContext } = appContexts;

class CompatibleMachines extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigateToProduct = (item) => {
    const { componentId } = this.context;
    Navigation.push(
      componentId,
      rootNavigation.pageContent({
        passProps: { pageId: item.id }
      })
    );
  }

  renderItemCurrent = ({ item, index }) => {
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 4, marginRight: 10 }} />;
    const { pageId } = this.context;
    return (
      <View
        style={[styles.listItem]}
        dcaTest="listItem"
      >
        <FontIcon
          type={icons.arrow_right[1]}
          icon={icons.arrow_right[0]}
          color={colors.black}
          size={8}
        />
        <TouchableOpacity onPress={() => { this.navigateToProduct(item); }}>
          <HtmlParser
            html={item.name}
            textKey={`prodD-compatibleMachines-current-list-${pageId}-${index}`}
            style={styles.listItemTxt}
            onPress={() => { this.navigateToProduct(item); }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderItemOld = ({ item, index }) => {
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 4, marginRight: 10 }} />;
    const { pageId } = this.context;
    return (
      <View
        style={[styles.listItem]}
        dcaTest="listItem"
      >
        <FontIcon
          type={icons.arrow_right[1]}
          icon={icons.arrow_right[0]}
          color={colors.black}
          size={8}
        />
        <TouchableOpacity onPress={() => { this.navigateToProduct(item); }}>
          <HtmlParser
            html={item.name}
            textKey={`prodD-compatibleMachines-old-list-${pageId}-${index}`}
            style={styles.listItemTxt}
            onPress={() => { this.navigateToProduct(item); }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { layoutData } = this.props;
    const { pageId, translations } = this.context;

    const currentArr = layoutData.current;
    const pastArr = layoutData.past;

    let arrMod = currentArr.length % 4;
    for (let i = 0; i < arrMod; i += 1) {
      currentArr.push({});
    }
    arrMod = pastArr.length % 4;
    for (let i = 0; i < arrMod; i += 1) {
      pastArr.push({});
    }
    return (
      <View style={styles.wrap}>
        <SectionHeader
          marking
          heading={tr(translations, 'compatible_machines', 'COMPATIBLE MACHINES', textCasing.U)}
          textKey={`prodD-compatibleMachines-head-list-${pageId}`}
        />
        {
          currentArr.length > 0 ? (
            <SectionSubHeader
              dcaTest="SectionSubHeader"
              marking
              heading={tr(translations, 'actual_machines', 'Actual Machines')}
              fade={false}
              textKey={`prodD-compatibleMachines-subHead-current-list-${pageId}`}
            />
          ) : null
        }
        <FlatList
          dcaTest="currentFlatlist"
          extraData={this.state}
          data={currentArr}
          renderItem={this.renderItemCurrent}
          keyExtractor={(item, index) => `compatiblemachines_current_${index}`}
          scrollEnabled={false}
          contentContainerStyle={styles.listItemContainer}
          columnWrapperStyle={styles.listItemColContainer}
          numColumns={4}
        />
        {
          pastArr.length > 0 ? (
            <SectionSubHeader
              dcaTest="SectionSubHeader"
              marking
              heading={tr(translations, 'old_machines', 'Old Machines')}
              fade
              textKey={`prodD-compatibleMachines-subHead-old-list-${pageId}`}
            />
          ) : null
        }
        <FlatList
          dcaTest="pastFlatlist"
          extraData={this.state}
          data={pastArr}
          renderItem={this.renderItemOld}
          keyExtractor={(item, index) => `compatiblemachines_old_${index}`}
          scrollEnabled={false}
          contentContainerStyle={styles.listItemContainer}
          columnWrapperStyle={styles.listItemColContainer}
          numColumns={4}
        />
      </View>
    );
  }
}

CompatibleMachines.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};

CompatibleMachines.contextType = PageContentContext;
export default CompatibleMachines;
