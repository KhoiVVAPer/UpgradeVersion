import React, { Component } from 'react';
import {
  View,
  Modal,
  ScrollView
} from 'react-native';
import {
  icons,
  colors,
  helpers,
  tr,
  appConstants
} from '../../../../config';
import {
  FontIcon,
  HtmlParser,
  TouchableDebounce
} from '../../../custom';
import Strings from '../../../../assets/data/settings';
import styles from './styles';

const { settingsModal } = appConstants;
const MAX_MAGNIFY = 8;
const MAX_MINIFY = -1;

class MagnifyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontScale: 1.5
    };
  }

  minify = () => {
    const { fontScale } = this.state;
    this.setState({
      fontScale: fontScale - 0.5
    });
  }

  magnify = () => {
    const { fontScale } = this.state;
    this.setState({
      fontScale: fontScale + 0.5
    });
  }

  renderMagnifyMinify = () => {
    const { fontScale } = this.state;
    return (
      <View style={styles.magnifyMinifyWrap}>
        <TouchableDebounce
          style={styles.magnifyMinifyItem}
          onPress={() => {
            if (fontScale > MAX_MINIFY) this.minify();
          }}
        >
          <FontIcon
            type={icons.minify[1]}
            icon={icons.minify[0]}
            color={fontScale > MAX_MINIFY ? colors.text : colors.textLight}
            size={28}
          />
        </TouchableDebounce>
        <TouchableDebounce
          style={styles.magnifyMinifyItem}
          onPress={() => {
            if (fontScale <= MAX_MAGNIFY) this.magnify();
          }}
        >
          <FontIcon
            type={icons.magnify[1]}
            icon={icons.magnify[0]}
            color={fontScale <= MAX_MAGNIFY ? colors.text : colors.textLight}
            size={28}
          />
        </TouchableDebounce>
      </View>
    );
  }

  renderHeader = () => {
    const { type, translations, callback } = this.props;
    const heading = type === settingsModal.IMPRINTS
      ? tr(translations, 'imprint', 'Imprint')
      : tr(translations, 'privacy_statement', 'Privacy Statement');

    return (
      <View style={styles.header}>
        <HtmlParser
          style={styles.cardHeadTxt}
          html={heading}
          textKey={`settings-cardHead-${heading}`}
        />
        <View style={styles.headIcons}>
          {this.renderMagnifyMinify()}
          <TouchableDebounce onPress={callback} style={styles.closeWrap}>
            <FontIcon
              type={icons.closeIon[1]}
              icon={icons.closeIon[0]}
              color={colors.text}
              size={23}
              onPress={callback}
            />
          </TouchableDebounce>
        </View>
      </View>
    );
  }

  render() {
    const { translations, type } = this.props;
    const { fontScale } = this.state;
    const settingsPrivacyTxt = helpers.addAnchorToUrl(tr(translations, 'privacy_policy_text', Strings.settingsPrivacyTxt));
    return (
      <Modal
        transparent
        visible
        onRequestClose={() => { }}
      >
        <View style={styles.wrap}>
          {this.renderHeader()}
          <ScrollView style={styles.content}>
            <View style={styles.contentInner}>
              {
                type === settingsModal.IMPRINTS ? (
                  <HtmlParser
                    html={tr(translations, 'imprint_policy_text', Strings.imprintText)}
                    textKey="settings-cardHead-sec2-card2-content"
                    style={[
                      styles.textContent,
                      { fontSize: 12 + fontScale, lineHeight: 15 + fontScale }
                    ]}
                  />
                ) : (
                  <HtmlParser
                    html={settingsPrivacyTxt}
                    textKey="Card2"
                    style={[
                      styles.textContent,
                      { fontSize: 12 + fontScale, lineHeight: 15 + fontScale }
                    ]}
                  />
                )
              }
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

export default MagnifyModal;
