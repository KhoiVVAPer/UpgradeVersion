import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import { AllHtmlEntities } from 'html-entities';
import { Navigation } from 'react-native-navigation';
import TextHighlighter from '../textHighlighter';
import { rootNavigation } from '../../../../navigation';
import {
  appStyles,
  colors,
  fonts,
  helpers,
  globals
} from '../../../../config';
import styles from './styles';

const JSON = require('circular-json');

const anchorStyle = {
  color: 'rgb(0, 0, 238)'
};

const getDataFromProps = (passProps) => {
  let data = ' ';
  if (passProps.data) {
    data += passProps.data;
  } else {
    passProps.rawChildren.map((item) => {
      if (item.data) data += item.data;
      return null;
    });
  }
  return data;
};

const renderers = {
  DCAText: (obj, node, dom, passProps) => (
    <TextHighlighter
      {...passProps.textProps}
      value={passProps.data}
      textKey={`${passProps.textKey}-${passProps.key}`}
      style={passProps.style}
      key={`${passProps.textKey}-${passProps.key}-key`}
    />
  ),
  a: (obj, node, dom, passProps) => {
    const anchorStr = getDataFromProps(passProps);
    if (anchorStr.indexOf(')}}>') === -1) {
      return (
        <TextHighlighter
          {...passProps.textProps}
          value={anchorStr}
          textKey={`${passProps.textKey}-${passProps.key}`}
          style={helpers.combineStylesArr([
            passProps.style,
            anchorStyle
          ])}
          onPress={() => {
            const link = passProps.rawChildren
              && passProps.rawChildren[0]
              && passProps.rawChildren[0].parent
              && passProps.rawChildren[0].parent.attribs
              && passProps.rawChildren[0].parent.attribs.href
              ? passProps.rawChildren[0].parent.attribs.href : '';
            Linking.openURL(link);
          }}
          key={`${passProps.textKey}-${passProps.key}-key`}
        />
      );
    }
    const anchorDataArr = anchorStr.split(')}}>');
    const anchorText = anchorDataArr[1];
    let anchorLink = anchorDataArr[0].split('globalAppNavigation(')[1];
    return (
      <TextHighlighter
        {...passProps.textProps}
        value={anchorText}
        textKey={`${passProps.textKey}-${passProps.key}`}
        style={helpers.combineStylesArr([
          passProps.style,
          anchorStyle
        ])}
        onPress={() => {
          if (anchorLink.includes('http') || anchorLink.includes('https') || Number.isNaN(anchorLink)) {
            // eslint-disable-next-line prefer-destructuring
            if (anchorLink.charAt(0) === "'") anchorLink = anchorLink.split("'")[1];
            // eslint-disable-next-line prefer-destructuring
            else if (anchorLink.charAt(0) === '"') anchorLink = anchorLink.split('"')[1];
            Linking.openURL(anchorLink);
          } else {
            const componentId = globals.GET_APP_DATA('activeComponentId');
            Navigation.push(
              componentId,
              rootNavigation.pageContent({
                passProps: {
                  pageId: anchorLink,
                  checkParent: true
                },
                pageId: String(anchorLink)
              })
            );
          }
        }}
        key={`${passProps.textKey}-${passProps.key}-key`}
      />
    );
  }
};

class HtmlParser extends Component {
  // getHtmldom = (rnDomArr) => {
  //   let arr = rnDomArr;
  //   const buildHtmlDom = (innerArr) => {
  //     arr = innerArr.map((item) => {
  //       if (item.data) {
  //         // eslint-disable-next-line no-param-reassign
  //         item.tagName = 'DCAText';
  //       } else if (item.children) {
  //         // eslint-disable-next-line no-param-reassign
  //         item.children = buildHtmlDom(item.children);
  //       }
  //       return item;
  //     });
  //   };
  //   buildHtmlDom(rnDomArr);
  //   return arr;
  // };

  onHTMLParsed = (dom, RNElements) => {
    // RNElements[0].children[3].children[0].children[0].tagName = 'DCAText';
    // return this.getHtmldom(RNElements);

    let nodeStr = JSON.stringify(RNElements);
    nodeStr = nodeStr.split('rawtext').join('DCAText');
    const arr = JSON.parse(nodeStr);
    return arr;
  }

  onLinkPress = (link) => {
    console.log({ link });
  }

  render() {
    const {
      html,
      style,
      wrapStyle,
      textKey,
      onPress
    } = this.props;

    const textProps = {};
    if (onPress) {
      textProps.onPress = onPress;
    }

    const entities = new AllHtmlEntities();
    const formatedHtml = entities.decode(html);

    return (
      <View style={wrapStyle || {}}>
        <HTML
          html={formatedHtml}
          baseFontStyle={helpers.combineStylesObj([
            { color: colors.text, ...fonts.default, fontSize: 9 },
            ...helpers.combineStylesArr(style),
          ])}
          renderers={renderers}
          renderersProps={{
            // onPress: () => {
            //   console.log('sdfsdfsfd');
            // }
          }}
          textProps={textProps}
          textKey={textKey}
          onParsed={this.onHTMLParsed}
          onLinkPress={this.onLinkPress}
          style={helpers.combineStylesObj([
            styles.baseFontStyle,
            ...helpers.combineStylesArr(style),
          ])}
        />
      </View>
    );
  }
}

export default HtmlParser;
