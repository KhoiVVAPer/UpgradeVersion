import React, { Component } from 'react';
import {
  View,
  Modal,
  TextInput,
  Text
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { Button, FontIcon } from '../../custom';
import {
  appConstants,
  tr,
  icons,
  colors,
  appStyles
} from '../../../config';

const { textCasing } = appConstants;

class FavFolderDuplicate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderData: {},
      folderName: null,
      isVisible: false
    };
  }

  componentDidMount() {
    const { setDuplicateFavFolderRef } = this.props;
    setDuplicateFavFolderRef(this);
  }

  setupDuplicateFolder = (folderData, folderName) => {
    this.setState({
      isVisible: true,
      folderData,
      folderName: `${folderName} (1)`
    });
  }

  hideDuplicateFolderModal = () => {
    this.setState({ isVisible: false });
  }

  duplicateFolder = () => {
    const { duplicateFolder } = this.props;
    const { folderData, folderName } = this.state;

    duplicateFolder(folderData, folderName);
  }

  renderHeader = (translations) => (
    <View>
      <Text style={styles.duplicateFavModalHead}>{tr(translations, 'duplicate_folder', 'DUPLICATE FOLDER', textCasing.U)}</Text>
      <FontIcon
        type={icons.closeIon[1]}
        icon={icons.closeIon[0]}
        color={colors.black}
        size={20}
        wrapStyle={styles.duplicateFavModalCloseWrap}
        onPress={() => { this.setState({ isVisible: false }); }}
      />
    </View>
  )

  renderInput = () => {
    const { folderName } = this.state;
    return (
      <TextInput
        ref={(ref) => { this.duplicateInput = ref; }}
        value={folderName}
        onChangeText={(t) => { this.setState({ folderName: t }); }}
        style={styles.duplicateFavModalInput}
      />
    );
  }

  renderFooter = () => {
    const { translations } = this.props;
    return (
      <View style={styles.duplicateFavModalFooter}>
        <Button
          onPress={() => { this.setState({ isVisible: false }); }}
          text={tr(translations, 'cancel', 'CANCEL', textCasing.U)}
          theme="gray"
        />
        <Button
          onPress={() => { this.duplicateFolder(); }}
          text={tr(translations, 'duplicate', 'DUPLICATE', textCasing.U)}
          theme="app"
          style={{ ...appStyles.mgL(15) }}
        />
      </View>
    );
  }

  render() {
    const { isVisible } = this.state;
    const { translations } = this.props;

    return (
      <Modal
        transparent
        visible={isVisible}
        onRequestClose={() => { }}
      >
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.duplicateFavModalWrap}
            behavior="padding"
            // behavior={(Platform.OS === 'ios') ? 'padding' : null}
            // keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            enabled
          >
            <View style={styles.duplicateFavModalWrapInner}>
              {this.renderHeader(translations)}
              {this.renderInput()}
              {this.renderFooter()}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    );
  }
}

export default FavFolderDuplicate;
