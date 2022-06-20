import React, { Component } from 'react';
import { View, FlatList, Image } from 'react-native';
import {
  icons,
  colors,
  tr,
  appConstants,
  images
} from '../../../config';
import { FontIcon, TouchableDebounce, HtmlParser } from '../../custom';
import styles from './styles';

const { textCasing } = appConstants;

class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  componentDidMount() {
  }

  renderLabel = (label, index) => (
    <View
      style={styles.equipmentItem}
      key="equipment_label_0"
    >
      <HtmlParser
        html={label}
        textKey={`prodCompare-equipment-${index}`}
      />
    </View>
  );

  renderLabelValue = (offset, label, index) => {
    const { productDetailsArr } = this.props;

    if (!productDetailsArr[offset]) return null;

    const productData = productDetailsArr[offset];
    let value = '';
    productData.equipment.map((item) => {
      if (item.label === label) {
        value = item.value;
      }
      return null;
    });

    return (
      <View
        style={styles.equipmentItem}
        key={`equipment_col_${productData.id}`}
      >
        {
          value === '1'
            ? (
              <Image
                source={images.tick}
                style={styles.checkboxImg}
                resizeMode="contain"
              />
            )
            : null
        }
        {
          value === '1'
            ? null
            : (
              <HtmlParser
                html={value || '-'}
                textKey={`prodCompare-equipment-value-${index}-${productData.id}`}
              />
            )
        }
      </View>
    );
  }

  renderEquipmentRow = ({ item, index }) => {
    const activeRow = index % 2 ? {} : styles.activeRow;
    return (
      <View style={[styles.equipmentRow, activeRow]}>
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
    const { equipmentLabels, translations } = this.props;

    return (
      <View style={styles.equipmentSection}>
        <TouchableDebounce
          style={styles.sectionHead}
          onPress={() => this.setState({ isOpen: !isOpen })}
        >
          <HtmlParser
            style={styles.sectionHeadTxt}
            html={tr(translations, 'equipment', 'EQUIPMENT', textCasing.U)}
            textKey="prodCompare-equipment"
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
            data={equipmentLabels}
            renderItem={this.renderEquipmentRow}
            keyExtractor={(item, index) => `equipment_${index}`}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }
}

export default Equipment;
