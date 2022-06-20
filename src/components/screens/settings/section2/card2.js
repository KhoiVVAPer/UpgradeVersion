/* eslint-disable no-unused-vars */
/**
 * @fileoverview This is settings screen section-2 component.
 * @package
 */
// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import {
  icons,
  tr,
  appConstants
} from '../../../../config';
import { HtmlParser } from '../../../custom';
import settingsData from '../../../../assets/data/settings';
import styles from '../styles';
import appStyle from '../../../../assets/styles/appStyles';
import CardHead from '../cardHeader';
import MagnifyModal from '../magnifyModal';

const { settingsModal } = appConstants;

class Card2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMagnifyModal: false
    };
  }

  toggleMagnify = () => {
    const { showMagnifyModal } = this.state;
    this.setState({
      showMagnifyModal: !showMagnifyModal
    });
  }

  render() {
    const { showMagnifyModal } = this.state;
    const { translations } = this.props;
    return (
      <View style={styles.card}>
        <ScrollView
          style={appStyle.container}
          nestedScrollEnabled
        >
          <CardHead
            heading={tr(translations, 'imprint', 'Imprint')}
            iconType={icons.home_filled[1]}
            icon={icons.home_filled[0]}
            isImprint
            callback={this.toggleMagnify}
          />
          <View style={appStyle.container}>
            <HtmlParser
              html={tr(translations, 'imprint_policy_text', settingsData.imprintText)}
              textKey="settings-cardHead-sec2-card2-content"
              style={styles.textContent}
            />
          </View>
        </ScrollView>
        {
          !showMagnifyModal ? false : (
            <MagnifyModal
              type={settingsModal.IMPRINTS}
              translations={translations}
              callback={this.toggleMagnify}
            />
          )
        }
      </View>
    );
  }
}

export default Card2;
