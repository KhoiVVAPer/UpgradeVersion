/**
 * @fileoverview This component renders design template
 * for table manual content.
 * @package
 */
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { HtmlParser, FontIcon } from '../../generic';
import {
  appContexts,
  appStyles,
  helpers,
  icons,
  colors
} from '../../../../config';
import ZoomTable from './zoomtable';
import styles from './styles';

const { PageContentContext } = appContexts;

const CSS_STYLES = {
  backgroundColor: 'background-color',
  color: 'color',
  fontWeight: 'font-weight',
  fontStyle: 'font-style',
  textAlign: 'text-align'
};

const getWrapStyle = (styleArr) => {
  let wrapStyle = {};
  styleArr.forEach((styleItem) => {
    const activeStyleArr = styleItem.split(': ');
    if (activeStyleArr[0]) {
      switch (activeStyleArr[0].trim()) {
        case CSS_STYLES.backgroundColor:
          wrapStyle = { ...wrapStyle, backgroundColor: activeStyleArr[1] };
          break;

        default:
          break;
      }
    }
  });
  return wrapStyle;
};

const getTextStyle = (styleArr) => {
  let textStyle = {};
  styleArr.forEach((styleItem) => {
    const activeStyleArr = styleItem.split(': ');
    if (activeStyleArr[0]) {
      switch (activeStyleArr[0].trim()) {
        case CSS_STYLES.color:
          textStyle = { ...textStyle, color: activeStyleArr[1] };
          break;

        case CSS_STYLES.fontWeight:
          textStyle = { ...textStyle, fontWeight: activeStyleArr[1] };
          break;

        case CSS_STYLES.fontStyle:
          textStyle = { ...textStyle, fontStyle: activeStyleArr[1] };
          break;

        case CSS_STYLES.textAlign:
          textStyle = { ...textStyle, textAlign: activeStyleArr[1] };
          break;

        default:
          break;
      }
    }
  });
  return textStyle;
};

class Table extends Component {
  constructor(props) {
    super(props);
    const { layoutData } = this.props;
    this.state = {
      isVisible: false
    };

    this.colCount = layoutData.values[0] && layoutData.values[0][0] ? layoutData.values[0][0].length : 0;
  }

  componentDidMount() {
  }

  toggleModal = () => {
    const { isVisible } = this.state;
    this.setState({
      isVisible: !isVisible
    });
  }

  renderZoomedTable = () => {
    if (this.colCount <= 5) return null;
    return (
      <View style={styles.zoomIconWrap}>
        <FontIcon
          type={icons.magnify[1]}
          icon={icons.magnify[0]}
          color={colors.black}
          size={25}
          wrapStyle={styles.zoomIcon}
          onPress={this.toggleModal}
        />
      </View>
    );
  }

  renderItem = ({ item, index }) => {
    const { pageId } = this.context;
    const tableData = [];

    const minifyWrapStyle = this.colCount > 5 ? { paddingHorizontal: 5 } : {};
    const minifyTxtStyle = this.colCount > 5 ? { fontSize: 7 } : {};

    item.map((col, colIndex) => {
      let wrapStyle = { backgroundColor: '#fff' };
      let textStyle = {};
      if (col.style) {
        const styleArr = col.style.split(';');
        wrapStyle = getWrapStyle(styleArr);
        textStyle = getTextStyle(styleArr);
      }
      const colKey = `table_col_${helpers.strToKey(col.value)}-${index}-${colIndex}`;
      tableData.push((
        <View
          key={`table_col_${colKey}`}
          style={[styles.column, wrapStyle, minifyWrapStyle]}
        >
          {
            col.value ? (
              <HtmlParser
                html={col.value}
                textKey={`table_col-${pageId}-${index}-${colIndex}`}
                style={{ ...appStyles.headFontSizeMedium, ...textStyle, ...minifyTxtStyle }}
              />
            ) : null
          }
        </View>
      ));
      return null;
    });

    return (
      <View style={[styles.wrap]}>
        {tableData}
      </View>
    );
  };

  render() {
    const { isVisible } = this.state;
    const { layoutData } = this.props; // toggleModal
    const content = layoutData.values[0];

    return (
      <View style={styles.container}>
        {this.renderZoomedTable()}
        <FlatList
          extraData={this.state}
          data={content}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `table_${index}`}
          scrollEnabled={false}
        />
        <ZoomTable
          isVisible={isVisible}
          content={content}
          toggleModal={this.toggleModal}
        />
      </View>
    );
  }
}

Table.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired
};

Table.contextType = PageContentContext;
export default Table;
