import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  ScrollView
} from 'react-native';
import Popover from 'react-native-popover-view';
import {
  icons,
  colors,
  appStyles,
  texts,
  tr,
  appConstants
} from '../../../config';
import {
  FontIcon,
  Button,
  Loading,
  HtmlParser
} from '../../custom';
import appStyle from '../../../assets/styles/appStyles';
import styles from './styles';
import FavFolderEdit from './favFolderEdit';
import FavFolderDuplicate from './favFolderDuplicate';

const { textCasing } = appConstants;

class FolderList extends Component {
  constructor(props) {
    super(props);
    const { favourite } = this.props;
    let tooltipState = {};
    favourite.favouriteFolder.map((item) => {
      tooltipState = { ...tooltipState, [`fav_folder_${item.id}`]: false };
      return null;
    });
    this.state = {
      newFolderTxt: '',
      showNewFolder: false,
      activeFolder: 0,
      activeFolderArr: [0],
      favourite,
      tooltipState,
      loading: false
    };
    this.activeParentFolderArr = [];
    this.editFavFolderRef = null;
    this.duplicateFavFolderRef = null;
  }

  componentDidMount() {
    const { setFolderRef } = this.props;
    setFolderRef(this);
  }

  setEditFavFolderRef = (ref) => {
    this.editFavFolderRef = ref;
  }

  setDuplicateFavFolderRef = (ref) => {
    this.duplicateFavFolderRef = ref;
  }

  editFolderName = async (id, folderName) => {
    const { editFavouriteFolder, translations } = this.props;
    const data = await editFavouriteFolder({ id, folderName });
    this.editFavFolderRef.hideEditFolderModal();
    setTimeout(() => {
      let tooltipState = {};
      data.favouriteFolder.forEach((favItem) => {
        tooltipState = { ...tooltipState, [`fav_folder_${favItem.id}`]: false };
      });

      Alert.alert(
        tr(translations, 'success', 'Success'),
        tr(translations, 'favorite_folder_edited', 'Favorite folder name edited')
      );
      this.setState({
        loading: false,
        favourite: data,
        tooltipState,
        activeFolder: 0,
        activeFolderArr: [0]
      });
    }, 500);
  }

  duplicateFolder = async (folderData, folderName) => {
    const { duplicateFavouriteFolder, translations } = this.props;
    const data = await duplicateFavouriteFolder(folderData, folderName);
    this.duplicateFavFolderRef.hideDuplicateFolderModal();
    setTimeout(() => {
      let tooltipState = {};
      data.favouriteFolder.forEach((favItem) => {
        tooltipState = { ...tooltipState, [`fav_folder_${favItem.id}`]: false };
      });

      Alert.alert(
        tr(translations, 'success', 'Success'),
        tr(translations, 'favorite_folder_duplicate', 'Favorite folder duplicated')
      );
      this.setState({
        loading: false,
        favourite: data,
        tooltipState,
        activeFolder: 0,
        activeFolderArr: [0]
      });
    }, 500);
  }

  getParentIdArr = (parentId) => {
    const { favourite } = this.state;
    if (parentId === 0) return this.activeParentFolderArr;
    const obj = favourite.favouriteFolder.find((item) => item.id === parentId);
    if (obj) {
      this.activeParentFolderArr.push(obj.id);
      this.getParentIdArr(obj.parentId);
    }
    return this.activeParentFolderArr;
  }

  setActiveFolder = (folderId, parentId) => {
    const { setActiveFolderId, translations } = this.props;
    const { activeFolderArr, showNewFolder } = this.state;
    if (folderId === 0) {
      this.setState({
        activeFolder: 0,
        activeFolderArr: [0]
      });
      setActiveFolderId(0);
      return;
    }

    if (activeFolderArr.includes(folderId)) {
      if (folderId === null) return;

      setActiveFolderId(folderId);
      const index = activeFolderArr.indexOf(folderId);
      if (index > -1) {
        activeFolderArr.splice(index, 1);
      }
      this.setState({
        activeFolder: parentId,
        activeFolderArr
      });
      return;
    }

    setActiveFolderId(folderId);
    this.activeParentFolderArr = [];
    const parentArr = this.getParentIdArr(parentId);
    this.setState({
      activeFolder: folderId,
      activeFolderArr: [0, folderId, ...parentArr]
    }, () => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.activeFolderArr.length >= 4 && showNewFolder) {
        Alert.alert(
          tr(translations, 'warning', texts.alerts.warning),
          tr(translations, 'three_folder_validation_alert', 'We can only save upto three folder in tree')
        );
        this.setState({
          showNewFolder: false,
          newFolderTxt: ''
        });
      }
    });
  }

  showNewFolder = () => {
    const { activeFolderArr } = this.state;
    const { translations } = this.props;
    if (activeFolderArr.length >= 4) {
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'three_folder_validation_alert', 'We can only save upto three folder in tree'),
      );
      return;
    }
    this.setState({
      showNewFolder: true
    });
  }

  hideNewFolder = () => {
    this.setState({
      showNewFolder: false,
      newFolderTxt: ''
    });
  }

  sortFolders = () => {
    const { favourite } = this.state;
    // eslint-disable-next-line no-confusing-arrow, no-nested-ternary
    const favouriteFolder = favourite.favouriteFolder.sort((a, b) => (a.folderName > b.folderName) ? 1 : ((b.folderName > a.folderName) ? -1 : 0));
    this.setState({
      favourite: { ...favourite, favouriteFolder }
    });
  }

  saveFolder = () => {
    const { saveFavouriteFolder, translations } = this.props;
    const { newFolderTxt, activeFolder } = this.state;

    if (newFolderTxt === '') {
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'enter_the_foldername', 'Please enter the folder name')
      );
      return;
    }

    this.setState({
      loading: true
    }, () => {
      const FolderData = {
        parentId: activeFolder === null ? 0 : activeFolder,
        folderName: newFolderTxt
      };
      saveFavouriteFolder(FolderData).then((data) => {
        this.setState({
          favourite: data,
          loading: false
        });
        this.hideNewFolder();
      });
    });
  }

  renderNewFolderInput = (folderId) => {
    const { activeFolder, newFolderTxt, showNewFolder } = this.state;
    const { translations } = this.props;
    if (folderId !== activeFolder || !showNewFolder) return null;

    const style = folderId === 0 ? {} : { marginLeft: 20 };

    return (
      <View style={[styles.newFolderInputWrap, style]}>
        <FontIcon
          type={icons.folder_open[1]}
          icon={icons.folder_open[0]}
          color={colors.black}
          size={18}
          style={{ ...appStyles.mgR10 }}
        />
        <TextInput
          placeholder={tr(translations, 'enter_new_foldername', 'Enter new folder name')}
          value={newFolderTxt}
          onChangeText={(folderText) => this.setState({ newFolderTxt: folderText })}
          style={styles.newFolderInput}
          placeholderTextColor={colors.textLight}
        />
      </View>
    );
  }

  renderFolderIcon = (folderId, isVisible) => {
    const { activeFolder } = this.state;
    const caretIcon = activeFolder === folderId ? 'caretDown' : 'caretRight';
    const folderIcon = activeFolder === folderId ? 'folder' : 'folder_open';
    return (
      <View style={styles.folderIconWrap}>
        {
          isVisible ? (
            <FontIcon
              type={icons[caretIcon][1]}
              icon={icons[caretIcon][0]}
              color={colors.black}
              size={12}
              style={{ ...appStyles.w(15) }}
            />
          ) : <View style={{ ...appStyles.w(folderId === 0 ? 0 : 15) }} />
        }
        <FontIcon
          type={icons[folderIcon][1]}
          icon={icons[folderIcon][0]}
          color={colors.black}
          size={18}
          style={{ ...appStyles.mgR(10) }}
        />
      </View>
    );
  }

  getChildFolderCount = (parentId) => {
    const { favourite } = this.state;
    let flag = false;
    favourite.favouriteFolder.map((item) => {
      if (item.parentId === parentId) flag = true;
      return true;
    });
    return flag;
  }

  showMoreOption = (item) => {
    const { tooltipState } = this.state;
    this.setState({
      tooltipState: { ...tooltipState, [item]: true }
    });
  }

  hideMoreOption = (item) => {
    const { tooltipState } = this.state;
    this.setState({
      tooltipState: { ...tooltipState, [item]: false }
    });
  }

  deleteFavouriteInit = (item) => {
    const { translations } = this.props;
    Alert.alert(
      tr(translations, 'warning', texts.alerts.warning),
      tr(translations, 'delete_fav_folder_warning', 'Do you want to delete folder?'),
      [{
        text: tr(translations, 'cancel', 'Cancel', textCasing.U),
      }, {
        text: tr(translations, 'ok', 'OK', textCasing.U),
        onPress: () => {
          this.deleteFavourite(item);
        }
      }]
    );
  }

  deleteFavourite = (item) => {
    const { deleteFavouriteFolder, translations, manuallySetFavContent } = this.props;
    this.hideMoreOption(`fav_folder_${item.id}`);

    this.setState({ loading: true }, () => {
      setTimeout(() => {
        deleteFavouriteFolder(item.id).then((data) => {
          let tooltipState = {};
          data.favouriteFolder.forEach((favItem) => {
            tooltipState = { ...tooltipState, [`fav_folder_${favItem.id}`]: false };
          });

          Alert.alert(
            tr(translations, 'success', 'Success'),
            tr(translations, 'favorite_deleted', 'Favorite deleted')
          );
          this.setState({
            loading: false,
            favourite: data,
            tooltipState,
            activeFolder: 0,
            activeFolderArr: [0]
          });
          manuallySetFavContent(data.favouriteContent);
        });
      }, 500);
    });
  }

  renderOptionPopover = (item, onlyExport) => {
    const { tooltipState } = this.state;
    const { translations, exportFolderFavourites } = this.props;
    if (!onlyExport) {
      return (
        <Popover
          isVisible={tooltipState[`fav_folder_${item.id}`]}
          fromView={this[`fav_folder_${item.id}`]}
          onRequestClose={() => this.hideMoreOption(`fav_folder_${item.id}`)}
          placement="right"
        >
          <View style={styles.propover}>
            <Text
              style={styles.propoverTxt}
              onPress={() => {
                this.setState({
                  tooltipState: { ...tooltipState, [`fav_folder_${item.id}`]: false }
                }, () => {
                  setTimeout(() => {
                    this.editFavFolderRef.setupEditFolder(item.id, item.folderName);
                  }, 500);
                });
              }}
            >
              {tr(translations, 'edit', 'Edit')}
            </Text>
            <Text
              style={styles.propoverTxt}
              onPress={() => {
                this.setState({
                  tooltipState: { ...tooltipState, [`fav_folder_${item.id}`]: false }
                }, () => {
                  setTimeout(() => {
                    this.duplicateFavFolderRef.setupDuplicateFolder(item, item.folderName);
                  }, 500);
                });
              }}
            >
              {tr(translations, 'duplicate', 'Duplicate')}
            </Text>
            <Text
              style={styles.propoverTxt}
              onPress={() => { this.deleteFavouriteInit(item); }}
            >
              {tr(translations, 'delete', 'Delete')}
            </Text>
            <Text
              style={styles.propoverTxt}
              onPress={() => {
                this.setState({
                  tooltipState: { ...tooltipState, [`fav_folder_${item.id}`]: false }
                }, () => {
                  exportFolderFavourites(item);
                });
              }}
            >
              {tr(translations, 'export', 'Export')}
            </Text>
          </View>
        </Popover>
      );
    }
    return (
      <Popover
        isVisible={!!tooltipState[`fav_folder_${item.id}`]}
        fromView={this[`fav_folder_${item.id}`]}
        onRequestClose={() => this.hideMoreOption(`fav_folder_${item.id}`)}
        placement="right"
      >
        <View style={styles.propover}>
          <Text
            style={styles.propoverTxt}
            onPress={() => {
              this.setState({
                tooltipState: { ...tooltipState, [`fav_folder_${item.id}`]: false }
              }, () => {
                exportFolderFavourites(item);
              });
            }}
          >
            {tr(translations, 'export', 'Export')}
          </Text>
        </View>
      </Popover>
    );
  }

  renderFolder = (parentId) => {
    const { favourite, activeFolderArr } = this.state;
    const folderStyle = { marginLeft: parentId === 0 ? 0 : 25 };
    const arr = [];
    favourite.favouriteFolder.map((item) => {
      if (parentId === item.parentId) {
        const displayStyle = activeFolderArr.includes(item.id) ? { display: 'flex' } : { display: 'none' };
        arr.push((
          <View
            style={[styles.folderContainer, folderStyle]}
            key={`folderId_${item.id}`}
          >
            <TouchableOpacity
              style={styles.folderTitleWrap}
              onPress={() => { this.setActiveFolder(item.id, item.parentId); }}
            >
              {this.renderFolderIcon(item.id, this.getChildFolderCount(item.id))}
              <Text
                style={styles.folderName}
                onPress={() => { this.setActiveFolder(item.id, item.parentId); }}
              >
                {item.folderName}
              </Text>
              <TouchableOpacity
                style={{}}
                ref={(ref) => { this[`fav_folder_${item.id}`] = ref; }}
                onPress={() => this.showMoreOption(`fav_folder_${item.id}`)}
              >
                <FontIcon
                  type={icons.more[1]}
                  icon={icons.more[0]}
                  color={colors.black}
                  size={12}
                  style={{ ...appStyles.mgL(10) }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <View style={displayStyle}>
              {this.renderFolder(item.id)}
              {this.renderNewFolderInput(item.id)}
            </View>
            {this.renderOptionPopover(item)}
          </View>
        ));
      }
      return null;
    });
    return (
      <View>
        {arr}
      </View>
    );
  }

  renderButton = () => {
    const { showNewFolder } = this.state;
    const { translations } = this.props;

    if (!showNewFolder) return null;
    return (
      <View style={styles.folderBtnWrap}>
        <Button
          onPress={() => this.hideNewFolder()}
          text={tr(translations, 'cancel', 'CANCEL', textCasing.U)}
          theme="white"
          style={{ ...appStyles.mgH10 }}
        />
        <Button
          onPress={() => this.saveFolder()}
          text={tr(translations, 'save_new_folder', 'SAVE NEW FOLDER', textCasing.U)}
          theme="app"
          style={{ ...appStyles.mgH10 }}
        />
      </View>
    );
  }

  render() {
    const {
      loading,
      favourite,
      showNewFolder
    } = this.state;
    const { translations } = this.props;

    const myFavStyle = favourite.favouriteFolder.length || showNewFolder ? { display: 'flex' } : { display: 'none' };

    if (loading) return <Loading />;
    return (
      <View style={appStyle.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ }}
          nestedScrollEnabled
        >
          <View style={styles.folderContainer}>
            <View style={[styles.folderContainer, styles.folderRow]}>
              <TouchableOpacity
                style={[styles.folderTitleWrap, myFavStyle]}
                onPress={() => { this.setActiveFolder(0, 0); }}
              >
                {this.renderFolderIcon(0, false)}
                <HtmlParser
                  html={tr(translations, 'my_favorites', 'My Favorites')}
                  textKey="fav-folderlist-all"
                  style={styles.folderName}
                  onPress={() => { this.setActiveFolder(0, 0); }}
                />
                <TouchableOpacity
                  style={{}}
                  ref={(ref) => { this[`fav_folder_${'my_favorites'}`] = ref; }}
                  onPress={() => this.showMoreOption(`fav_folder_${'my_favorites'}`)}
                >
                  <FontIcon
                    type={icons.more[1]}
                    icon={icons.more[0]}
                    color={colors.black}
                    size={12}
                    style={{ ...appStyles.mgL(10) }}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              {this.renderOptionPopover({ id: 'my_favorites', folderName: tr(translations, 'my_favorites', 'My Favorites') }, true)}
            </View>
            <View style={{ ...appStyles.mgL(10) }}>
              {this.renderFolder(0)}
              {this.renderNewFolderInput(0)}
              {this.renderNewFolderInput(null)}
            </View>
          </View>
          <View style={[styles.folderContainer, styles.folderRow, { ...appStyles.mgL(-15) }]}>
            <TouchableOpacity
              style={styles.folderTitleWrap}
              onPress={() => { this.setActiveFolder(null, 0); }}
            >
              {this.renderFolderIcon(null, false)}
              <HtmlParser
                html={tr(translations, 'all', 'All')}
                textKey="fav-folderlist-all"
                style={styles.folderName}
                onPress={() => { this.setActiveFolder(null, 0); }}
              />
              <TouchableOpacity
                style={{}}
                ref={(ref) => { this[`fav_folder_${'all'}`] = ref; }}
                onPress={() => this.showMoreOption(`fav_folder_${'all'}`)}
              >
                <FontIcon
                  type={icons.more[1]}
                  icon={icons.more[0]}
                  color={colors.black}
                  size={12}
                  style={{ ...appStyles.mgL(10) }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            {this.renderOptionPopover({ id: 'all', folderName: tr(translations, 'all', 'All') }, true)}
          </View>
          {this.renderButton()}
        </ScrollView>
        <FavFolderEdit
          translations={translations}
          editFolderName={this.editFolderName}
          setEditFavFolderRef={this.setEditFavFolderRef}
        />
        <FavFolderDuplicate
          translations={translations}
          duplicateFolder={this.duplicateFolder}
          setDuplicateFavFolderRef={this.setDuplicateFavFolderRef}
        />
      </View>
    );
  }
}

export default FolderList;
