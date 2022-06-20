import React, { Component } from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import { HtmlParser } from '../../../custom';
import {
  icons,
  tr,
  helpers,
  appConstants
} from '../../../../config';
import styles from '../styles';
import appStyle from '../../../../assets/styles/appStyles';
import CardHead from '../cardHeader';
import Strings from '../../../../assets/data/settings';
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
    const settingsPrivacyTxt = helpers.addAnchorToUrl(tr(translations, 'privacy_policy_text', Strings.settingsPrivacyTxt));
    return (
      <View style={styles.card}>
        <ScrollView
          style={appStyle.container}
          nestedScrollEnabled
        >
          <CardHead
            heading={tr(translations, 'privacy_statement', 'Privacy Statement')}
            iconType={icons.paragraph[1]}
            icon={icons.paragraph[0]}
            isPrivacyPolicy
            callback={this.toggleMagnify}
          />
          <View style={appStyle.container}>
            <HtmlParser
              style={styles.textContent}
              html={settingsPrivacyTxt}
              textKey="Card2"
            />
          </View>
        </ScrollView>
        {
          !showMagnifyModal ? false : (
            <MagnifyModal
              type={settingsModal.PRIVACY_POLICY}
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
