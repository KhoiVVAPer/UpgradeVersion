import React, { Component } from 'react';
import { View } from 'react-native';
import {
  icons, colors, helpers, tr, appConstants
} from '../../../config';
import { FontIcon, TouchableDebounce, HtmlParser } from '../../custom';
import styles from './styles';

const { textCasing } = appConstants;

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
  }

  renderItem = (item, index) => {
    if (helpers.isEmptyObject(item)) {
      return (
        <View
          style={styles.descItem}
          key={`compare_description_${index}`}
        />
      );
    }

    let desc = '';
    item.texts.map((item1) => {
      if (item1.type === 'long') desc = item1.value;
      return null;
    });
    return (
      <View
        style={styles.descItem}
        key={`compare_description_${item.id}`}
      >
        {
          desc ? (
            <HtmlParser
              style={styles.descTxt}
              html={desc}
              textKey={`prodCompare-description-${index}`}
            />
          ) : null
        }
      </View>
    );
  }

  render() {
    const { isOpen } = this.state;
    const { productDetailsArr, moveScrollToBottom, translations } = this.props;

    let arr = [{}, ...productDetailsArr];
    if (arr.length === 1) {
      arr = [{}, {}];
    }

    return (
      <View style={styles.descSection}>
        <TouchableDebounce
          style={styles.sectionHead}
          onPress={() => {
            this.setState({ isOpen: !isOpen }, () => {
              if (!isOpen) {
                setTimeout(() => {
                  moveScrollToBottom();
                }, 100);
              }
            });
          }}
        >
          <HtmlParser
            style={styles.sectionHeadTxt}
            html={tr(translations, 'description', 'DESCRIPTION', textCasing.U)}
            textKey="prodCompare-description"
          />
          <FontIcon
            type={!isOpen ? icons.downArrowIon[1] : icons.upArrowIon[1]}
            icon={!isOpen ? icons.downArrowIon[0] : icons.upArrowIon[0]}
            size={16}
            color={colors.text}
          />
        </TouchableDebounce>
        <View style={{ display: isOpen ? 'flex' : 'none', flexDirection: 'row' }}>
          {arr.map((item, index) => (this.renderItem(item, index)))}
        </View>
      </View>
    );
  }
}

export default Description;
