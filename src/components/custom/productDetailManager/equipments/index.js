import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { appContexts, tr, appConstants } from '../../../../config';
import SectionHeader from '../../generic/sectionHeader';
import Equipments from './equipments';
import Pictograms from './pictograms';

const { textCasing } = appConstants;
const { PageContentContext } = appContexts;

class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { layoutData, productDetailsObj } = this.props;
    const { pageId, translations } = this.context;

    return (
      <View style={styles.wrap}>
        <SectionHeader
          marking
          heading={tr(translations, 'equipment', 'EQUIPMENT', textCasing.U)}
          textKey={`prodD-equipments-head-${pageId}`}
        />
        <View style={styles.wrapInner}>
          <View style={styles.section}>
            <Equipments layoutData={layoutData} />
          </View>
          <View style={styles.section}>
            <Pictograms
              layoutData={layoutData}
              productDetailsObj={productDetailsObj}
            />
          </View>
        </View>
      </View>
    );
  }
}

Equipment.contextType = PageContentContext;
export default Equipment;
