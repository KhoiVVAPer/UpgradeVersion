import React, { Component } from 'react';
import {
  Modal, ScrollView, View, SafeAreaView
} from 'react-native';
import { IGNORED_TAGS, alterNode, makeTableRenderer } from 'react-native-render-html-table-bridge';
import WebView from 'react-native-webview';
import HTML from 'react-native-render-html';
import { FontIcon } from '../../generic';
import { colors, icons } from '../../../../config';
import styles from './styles';

const tableStyle = `
  width: 100%;
  border-collapse: collapse;
`;

const tableRowStyle = `
  width: 100%;
  background-color: #fff;
  border-bottom: solid thin;
  border-bottom-color: ${colors.borderColor};
  border-bottom-width: 1px;
`;

const tableColStyle = `
  border: 0;
  text-align: left;
  vertical-align: top;
  padding: 8px 10px;
`;

const tableConfig = {
  WebViewComponent: WebView,
  autoheight: true,
};

const renderers = {
  table: makeTableRenderer(tableConfig)
};

const htmlConfig = {
  alterNode,
  renderers,
  ignoredTags: IGNORED_TAGS
};

const buildTable = (content) => {
  let tableStr = `<table style="${tableStyle}">`;
  content.forEach((rowItem) => {
    tableStr += `<tr style="${tableRowStyle}">`;
    rowItem.forEach((colItem, colIndex) => {
      let colspan = '';
      if (rowItem.length - 1 === colIndex) {
        colspan = 'colspan="100%"';
      }

      let style = '';
      if (colItem.style) {
        style = colItem.style;
      }
      tableStr += `<td ${colspan} style="${style} ${tableColStyle}">${colItem.value || ''}</td>`;
    });
    tableStr += '</tr>';
  });
  tableStr += '</table>';
  return tableStr;
};


class ZoomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHeader = () => {
    const { toggleModal } = this.props;
    return (
      <View style={styles.modalHeader}>
        <FontIcon
          type={icons.close_circle[1]}
          icon={icons.close_circle[0]}
          color={colors.black}
          size={30}
          wrapStyle={{}}
          onPress={toggleModal}
        />
      </View>
    );
  }

  render() {
    const { isVisible, content } = this.props;

    const tableStr = buildTable(content);
    return (
      <Modal
        transparent
        visible={isVisible}
        onRequestClose={() => { }}
      >
        <SafeAreaView style={styles.modalWrap}>
          {this.renderHeader()}
          <ScrollView
            style={styles.modalWrapinner}
            contentContainerStyle={{}}
          >
            <View style={{ flex: 1 }}>
              <HTML html={tableStr} {...htmlConfig} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }
}

export default ZoomTable;
