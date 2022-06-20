import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {
  icons,
  colors,
  tr,
  appConstants
} from '../../../config';
import {
  FontIcon,
  TouchableDebounce,
  HtmlParser
} from '../../custom';
import styles from './styles';

const { textCasing } = appConstants;

class TechData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  componentDidMount() {
  }

  renderLabel = (name, index) => {
    const { productDetailsArr, techDataLabels } = this.props;
    let lableWithUnit = techDataLabels[index];
    // eslint-disable-next-line no-restricted-syntax
    for (const { techdata } of productDetailsArr) {
      let toBreak = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const item of techdata) {
        if (item.name === name) {
          lableWithUnit = `${lableWithUnit} (${item.unit})`;
          toBreak = true;
          break;
        }
      }
      if (toBreak) break;
    }
    return (
      <View
        style={styles.techDataItem}
        key="tech_data_label_0"
      >
        <HtmlParser
          html={lableWithUnit}
          textKey={`prodCompare-techData-label${index}`}
        />
      </View>
    );
  }

  renderLabelValue = (offset, name, index) => {
    const { productDetailsArr } = this.props;

    if (!productDetailsArr[offset]) return null;

    const productData = productDetailsArr[offset];
    let value = '';
    productData.techdata.map((item) => {
      if (item.name === name) {
        value = item.value;
      }
      return null;
    });

    return (
      <View
        style={styles.techDataItem}
        key={`tech_data_col_${productData.id}`}
      >
        <HtmlParser
          html={value || '-'}
          textKey={`prodCompare-techData-value-${index}-${productData.id}`}
        />
      </View>
    );
  }

  renderTechDataRow = ({ item, index }) => {
    const activeRow = index % 2 ? {} : styles.activeRow;
    return (
      <View style={[styles.techDataRow, activeRow]}>
        {this.renderLabel(item, index)}
        {this.renderLabelValue(0, item, index)}
        {this.renderLabelValue(1, item, index)}
        {this.renderLabelValue(2, item, index)}
        {this.renderLabelValue(3, item, index)}
      </View>
    );
  }

  render() {
    const { isOpen } = this.state;
    const { translations, techDataNames } = this.props;
    return (
      <View style={styles.techDataSection}>
        <TouchableDebounce
          style={styles.sectionHead}
          onPress={() => this.setState({ isOpen: !isOpen })}
        >
          <HtmlParser
            style={styles.sectionHeadTxt}
            html={tr(translations, 'technical_data', 'TECHNICAL DATA', textCasing.U)}
            textKey="prodCompare-techData"
          />
          <FontIcon
            type={!isOpen ? icons.downArrowIon[1] : icons.upArrowIon[1]}
            icon={!isOpen ? icons.downArrowIon[0] : icons.upArrowIon[0]}
            size={16}
            color={colors.text}
          />
        </TouchableDebounce>
        <View style={{ display: isOpen ? 'flex' : 'none' }}>
          <FlatList
            extraData={this.state}
            data={techDataNames}
            renderItem={this.renderTechDataRow}
            keyExtractor={(item, index) => `tech_data_${index}`}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }
}

export default TechData;
