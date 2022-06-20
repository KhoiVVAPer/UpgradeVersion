import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  ScrollView,
  // Alert,
  Vibration
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  icons,
  colors,
  // texts,
  appStyles,
  appConstants,
  helpers,
  tr,
  globals
} from '../../../../config';
import Button from '../../generic/button';
import FontIcon from '../../generic/fontIcon/_fontIcon';
import appStyle from '../../../../assets/styles/appStyles';
import styles from './styles';
import {
  getFavourite as fetchFavourite,
  saveFavouriteContent as persistFavouriteContent,
  editFavouriteContent as editingFavouriteContent,
  saveFavouriteFolder as persistFavouriteFolder
} from '../../../../redux/actions';
import { deleteFolderContentDb } from '../../../../realm/queries/favourite';
import FavouriteContent from './favouriteContent';
import Loading from '../../generic/loading';

const { favouriteModalTypes, textCasing, firebaseEvents } = appConstants;

const saveBtnTxt = {
  [favouriteModalTypes.SAVE]: 'save',
  [favouriteModalTypes.EDIT]: 'edit',
  [favouriteModalTypes.DUPLICATE]: 'duplicate',
};

class FavouriteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      title: '',
      pageId: 0,
      activeFolderId: 0,
      type: '',
      favouriteId: null,
      isNewFolder: false,
      loading: '',
      modalType: favouriteModalTypes.SAVE,
      saveLoading: false
    };
    this.saveCb = null;
    this.favContentRef = null;
  }

  componentDidMount() {
    const { getFavourite, favourite, setFavouriteModalRef } = this.props;
    setFavouriteModalRef(this);
    if (favourite.loading) getFavourite();
  }

  setFavContentRef = (ref) => {
    this.favContentRef = ref;
  }

  showFavouriteModal = (obj, saveCb, modalType = favouriteModalTypes.SAVE, activeFolderObj = {}) => {
    this.setState({
      isVisible: true,
      title: obj.title,
      pageId: obj.pageId,
      type: obj.type,
      modalType,
      favouriteId: obj.favouriteId || null
    }, () => {
      if (!helpers.isEmptyObject(activeFolderObj)) {
        this.favContentRef.setActiveFolderFromRef(activeFolderObj.folderId, activeFolderObj.parentId);
        this.setState({
          activeFolderId: activeFolderObj.folderId
        });
      }
    });
    this.saveCb = saveCb;
  }

  hideFavouriteModal = () => {
    this.setState({
      isVisible: false,
      isNewFolder: false
    });
  }

  deleteFavouriteModal = async (pageId, deleteCb) => {
    await deleteFolderContentDb(null, pageId);
    deleteCb();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getFavourite(pageId);
  }

  renderTitle = () => {
    const { title } = this.state;
    return (
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          onChangeText={(titleText) => this.setState({ title: titleText })}
          value={title}
          placeholderTextColor={colors.textLight}
        />
      </View>
    );
  }

  renderContent = () => {
    const { loading } = this.state;
    const { favourite, saveFavouriteFolder, translations } = this.props;
    return (
      <ScrollView
        style={styles.contentWrap}
        contentContainerStyle={styles.contentWrapInner}
        nestedScrollEnabled
      >
        {
          loading
            ? <Loading />
            : (
              <FavouriteContent
                favourite={favourite}
                saveFavouriteFolder={saveFavouriteFolder}
                setFavContentRef={this.setFavContentRef}
                toggleNewFolder={this.toggleNewFolder}
                toggleSaveLoading={this.toggleSaveLoading}
                setActiveFolderId={this.setActiveFolderId}
                hideNewFolder={this.hideNewFolder}
                showNewFolder={this.showNewFolder}
                translations={translations}
              />
            )
        }
        <View />
      </ScrollView>
    );
  }

  setActiveFolderId = (folderId) => {
    this.setState({
      activeFolderId: folderId
    });
  }

  saveFavouriteModal = () => {
    const { saveFavouriteContent, universal } = this.props;
    const {
      title,
      pageId,
      activeFolderId,
      type,
      modalType
    } = this.state;

    if (modalType === favouriteModalTypes.EDIT) {
      this.editFavouriteModal();
      return;
    }

    const obj = {
      title,
      pageId,
      activeFolderId,
      type
    };

    this.setState({
      loading: true,
      saveLoading: true
    }, () => {
      saveFavouriteContent(obj).then(() => {
        this.toggleSaveLoading(false);
        helpers.pageInfoAnalytics({ pageState: 'product_details', pageName: { 'att.favoritesSave': 'true' } });
        helpers.analyticsEvent(
          firebaseEvents.FAVORITE_ADDED,
          {
            pageId,
            title
          },
          universal
        );
        Vibration.vibrate(globals.VIBRATE_DURATION);
        this.resetModal();
      });
    });
  }

  editFavouriteModal = () => {
    const { editFavouriteContent } = this.props;
    const {
      title, pageId, activeFolderId, type, favouriteId
    } = this.state;

    const obj = {
      title, pageId, activeFolderId, type, favouriteId
    };

    this.setState({
      loading: true
    }, () => {
      editFavouriteContent(obj).then(() => {
        Vibration.vibrate(globals.VIBRATE_DURATION);
        this.resetModal();
      });
    });
  }

  resetModal = () => {
    this.saveCb();
    this.setState({
      isVisible: false,
      loading: false,
      title: '',
      pageId: 0,
      activeFolderId: 0,
      type: ''
    });
    // Alert.alert(
    //   texts.alerts.success,
    //   'Added to favorites',
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         this.setState({
    //           isVisible: false,
    //           loading: false,
    //           title: '',
    //           pageId: 0,
    //           activeFolderId: 0,
    //           type: ''
    //         });
    //       }
    //     },
    //   ]
    // );
  }

  newFolderInit = () => {
    this.favContentRef.toggleNewFolder();
  }

  newFolderCancel = () => {
    this.setState({
      isNewFolder: false
    }, () => {
      this.favContentRef.toggleNewFolder();
    });
  }

  toggleNewFolder = () => {
    const { isNewFolder } = this.state;
    this.setState({
      isNewFolder: !isNewFolder
    });
  }

  hideNewFolder = () => {
    this.setState({
      isNewFolder: false
    });
  }

  showNewFolder = () => {
    this.setState({
      isNewFolder: true
    });
  }

  toggleSaveLoading = (flag) => {
    this.setState({
      saveLoading: flag
    });
  }

  renderButton = () => {
    const { isNewFolder, modalType, saveLoading } = this.state;
    const { translations } = this.props;

    const btnText = tr(translations, saveBtnTxt[modalType], saveBtnTxt[modalType], textCasing.U);
    return (
      <View style={styles.btnWrap}>
        <View style={styles.btnLeftWrap}>
          {
            isNewFolder ? null
              : (
                <Button
                  onPress={() => this.newFolderInit()}
                  text={tr(translations, 'new_folder', 'NEW FOLDER', textCasing.U)}
                  theme="gray"
                />
              )
          }
          {
            !isNewFolder ? null
              : (
                <Button
                  onPress={() => this.newFolderCancel()}
                  text={tr(translations, 'cancel', 'CANCEL', textCasing.U)}
                  theme="gray"
                />
              )
          }
          {
            !isNewFolder ? null
              : (
                <Button
                  onPress={() => {
                    this.setState({
                      saveLoading: true
                    }, () => {
                      setTimeout(() => {
                        this.favContentRef.saveFolder();
                      }, 10);
                    });
                  }}
                  text={tr(translations, 'save_new_folder', 'SAVE NEW FOLDER', textCasing.U)}
                  theme="app"
                  style={{ ...appStyles.mgH10 }}
                  loading={saveLoading}
                />
              )
          }
        </View>
        <View style={styles.btnRightWrap}>
          <Button
            onPress={() => this.hideFavouriteModal()}
            text={tr(translations, 'quit', 'QUITE', textCasing.U)}
            theme="gray"
          />
          <Button
            onPress={() => {
              setTimeout(() => {
                this.saveFavouriteModal();
              }, 10);
            }}
            text={btnText}
            theme="app"
            style={styles.saveBtn}
            loading={saveLoading}
          />
        </View>
      </View>
    );
  }

  render() {
    const { isVisible } = this.state;
    const { translations } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={() => { }}
      >
        <View style={appStyle.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            behavior="padding"
            // behavior={(Platform.OS === 'ios') ? 'padding' : null}
            // keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            enabled
          >
            <View style={styles.modalWrap}>
              <Text style={styles.heading}>{tr(translations, 'add_to_favorites', 'ADD TO FAVOURITES', textCasing.U)}</Text>
              <View style={styles.closeWrap}>
                <FontIcon
                  type={icons.closeIon[1]}
                  icon={icons.closeIon[0]}
                  color={colors.text}
                  size={20}
                  innerWrapStyle={{ padding: 8 }}
                  onPress={() => this.hideFavouriteModal()}
                />
              </View>
              {this.renderTitle()}
              {this.renderContent()}
              {this.renderButton()}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  universal: state.universal,
  favourite: state.favourite,
  translations: state.translations.arr
});
const mapDispatchToProps = (dispatch) => ({
  getFavourite: () => fetchFavourite(dispatch),
  saveFavouriteContent: (favouriteData) => persistFavouriteContent(dispatch, favouriteData),
  editFavouriteContent: (favouriteData) => editingFavouriteContent(dispatch, favouriteData),
  saveFavouriteFolder: (favouriteFolderData) => persistFavouriteFolder(dispatch, favouriteFolderData)
});
const FavouriteModalRedux = connect(mapStateToProps, mapDispatchToProps)(FavouriteModal);
export default FavouriteModalRedux;
