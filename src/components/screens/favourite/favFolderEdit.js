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

class FavFolderEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: '',
      isVisible: false,
      id: null
    };
  }

  componentDidMount() {
    const { setEditFavFolderRef } = this.props;
    setEditFavFolderRef(this);
  }

  setupEditFolder = (id, folderName) => {
    this.setState({
      isVisible: true,
      id,
      folderName
    });
  }

  hideEditFolderModal = () => {
    this.setState({ isVisible: false });
  }

  editFolder = () => {
    const { editFolderName } = this.props;
    const { id, folderName } = this.state;

    editFolderName(id, folderName);
  }

  renderHeader = (translations) => (
    <View>
      <Text style={styles.editFavModalHead}>{tr(translations, 'edit_folder_name', 'EDIT FOLDER NAME', textCasing.U)}</Text>
      <FontIcon
        type={icons.closeIon[1]}
        icon={icons.closeIon[0]}
        color={colors.black}
        size={20}
        wrapStyle={styles.editFavModalCloseWrap}
        onPress={() => { this.setState({ isVisible: false }); }}
      />
    </View>
  )

  renderInput = () => {
    const { folderName } = this.state;
    return (
      <TextInput
        ref={(ref) => { this.commentInput = ref; }}
        value={folderName}
        onChangeText={(t) => { this.setState({ folderName: t }); }}
        style={styles.editFavModalInput}
        placeholderTextColor={colors.textLight}
      />
    );
  }

  renderFooter = () => {
    const { translations } = this.props;
    return (
      <View style={styles.editFavModalFooter}>
        <Button
          onPress={() => { this.setState({ isVisible: false }); }}
          text={tr(translations, 'cancel', 'CANCEL', textCasing.U)}
          theme="gray"
        />
        <Button
          onPress={() => { this.editFolder(); }}
          text={tr(translations, 'edit_folder', 'EDIT FOLDER', textCasing.U)}
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
            contentContainerStyle={styles.editFavModalWrap}
            behavior="padding"
            // behavior={(Platform.OS === 'ios') ? 'padding' : null}
            // keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            enabled
          >
            <View style={styles.editFavModalWrapInner}>
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

export default FavFolderEdit;
