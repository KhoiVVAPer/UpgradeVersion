import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  appContexts,
  colors,
  globals,
  helpers
} from '../../../../config';
import styles from './styles';

const { PageContentContext } = appContexts;

class TextHighlighter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  openHighlightedText = (activeTextObj, isDelete) => {
    const { value, textKey } = this.props;
    const { getMarkingModalRef } = this.context;

    const markingModalRef = getMarkingModalRef();
    markingModalRef.setData(value, textKey, activeTextObj, isDelete);
  }

  renderTextItem = (item, index) => {
    const { style } = this.props;
    let activeStyle = item.highlightColor ? { backgroundColor: item.highlightColor } : {};
    activeStyle = item.comment ? { backgroundColor: colors.blue } : activeStyle;
    const isDelete = item.highlightColor;

    return (
      <Text
        {...this.props}
        style={helpers.combineStylesObj([
          styles.text,
          ...helpers.combineStylesArr(style),
          activeStyle,
        ])}
        key={`highlight_${item.key}_${index}`}
        onLongPress={() => {
          if (isDelete) {
            this.openHighlightedText(item, isDelete);
          } else {
            this.openHighlightedText(item, isDelete);
          }
        }}
        textBreakStrategy="simple"
      >
        {item.text}
      </Text>
    );
  }

  render() {
    // Ternery condition for test case
    const { textMarking } = this.context || { textMarking: [] };
    const { value, textKey, style } = this.props;

    const activeLanguageData = globals.GET_APP_DATA('activeLanguageData');

    const arr = textMarking.filter((item) => (
      item.key === textKey
      && item.languageCode === activeLanguageData.languageCode
      && item.countryCode === activeLanguageData.countryCode
    ));

    arr.sort((a, b) => {
      if (a.startOffset > b.startOffset) return 1;
      if (b.startOffset > a.startOffset) return -1;
      return 0;
    });

    const textArr = [];
    if (arr.length === 0) {
      textArr.push({
        key: textKey,
        text: value,
        startOffset: 0,
        endOffset: value ? value.length : 0,
      });
    }
    arr.map((item, index) => {
      const startOffset = index === 0 ? 0 : arr[index - 1].endOffset;
      const diff = item.startOffset - startOffset;
      textArr.push({
        key: textKey,
        text: value.substr(startOffset, diff),
        startOffset,
        endOffset: item.startOffset,
      });
      textArr.push(item);
      if ((index + 1) === arr.length) {
        const difference = value.length - item.endOffset;
        textArr.push({
          key: textKey,
          text: value.substr(item.endOffset, difference),
          startOffset: item.endOffset,
          endOffset: value.length,
        });
      }
      return null;
    });

    return (
      <Text
        {...this.props}
        style={helpers.combineStylesObj([
          styles.textContainer,
          ...helpers.combineStylesArr(style),
        ])}
        textBreakStrategy="simple"
      >
        {textArr.map((item, index) => this.renderTextItem(item, index))}
      </Text>
    );
  }
}

TextHighlighter.contextType = PageContentContext;
export default TextHighlighter;
