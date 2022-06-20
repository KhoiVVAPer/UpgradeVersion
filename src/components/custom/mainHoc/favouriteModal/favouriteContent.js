import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import Loading from '../../generic/loading';
import FontIcon from '../../generic/fontIcon/_fontIcon';
import {
  icons,
  colors,
  appStyles,
  texts,
  tr
} from '../../../../config';
import styles from './styles';

class FavouriteContent extends React.Component {
  constructor(props) {
    super(props);
    const { favourite } = this.props;
    this.state = {
      newFolderTxt: '',
      showNewFolder: false,
      activeFolder: 0,
      activeFolderArr: [],
      favourite,
      loading: false
    };
    this.activeParentFolderArr = [];
  }

  componentDidMount() {
    const { setFavContentRef } = this.props;
    setFavContentRef(this);
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
    const { setActiveFolderId, hideNewFolder, translations } = this.props;
    const { activeFolderArr, showNewFolder } = this.state;

    if (activeFolderArr.includes(folderId)) {
      setActiveFolderId(0);
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
      activeFolderArr: [folderId, ...parentArr]
    }, () => {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.activeFolderArr.length >= 3 && showNewFolder) {
        this.setState({
          showNewFolder: false,
          newFolderTxt: ''
        });
        hideNewFolder();
        Alert.alert(
          tr(translations, 'warning', texts.alerts.warning),
          tr(translations, 'three_folder_validation_alert', 'We can only save upto three folder in tree')
        );
      }
    });
  }

  setActiveFolderFromRef = (folderId, parentId) => {
    const parentArr = this.getParentIdArr(parentId);
    this.setState({
      activeFolder: folderId,
      activeFolderArr: [folderId, ...parentArr]
    });
  }

  renderNewFolderInput = (folderId) => {
    const { translations } = this.props;
    const { activeFolder, newFolderTxt, showNewFolder } = this.state;
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
          onChangeText={(newText) => this.setState({ newFolderTxt: newText })}
          style={styles.newFolderInput}
          placeholderTextColor={colors.textLight}
        />
      </View>
    );
  }

  toggleNewFolder = () => {
    const {
      showNewFolder: showNewFolderFunc,
      hideNewFolder,
      translations
    } = this.props;
    const { showNewFolder, activeFolderArr } = this.state;
    if (activeFolderArr.length >= 3) {
      hideNewFolder();
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'three_folder_validation_alert', 'We can only save upto three folder in tree')
      );
      return;
    }
    if (!showNewFolder) showNewFolderFunc();
    this.setState({
      showNewFolder: !showNewFolder,
      newFolderTxt: ''
    });
  }

  saveFolder = () => {
    const {
      saveFavouriteFolder,
      toggleNewFolder,
      translations,
      toggleSaveLoading
    } = this.props;
    const { newFolderTxt, activeFolder } = this.state;

    if (newFolderTxt === '') {
      Alert.alert(
        tr(translations, 'warning', texts.alerts.warning),
        tr(translations, 'enter_the_foldername', 'Please enter the folder name')
      );
      toggleSaveLoading(false);
      return;
    }

    this.setState({
      loading: true
    }, () => {
      const FolderData = {
        parentId: activeFolder,
        folderName: newFolderTxt
      };
      saveFavouriteFolder(FolderData).then((data) => {
        toggleSaveLoading(false);
        this.setState({
          favourite: data,
          loading: false
        });
        this.toggleNewFolder();
        toggleNewFolder();
      });
    });
  }

  renderFav = (folderId) => {
    const { favourite } = this.state;
    const arr = [];

    const style = folderId === 0 ? { marginLeft: -5 } : { marginLeft: 20 };

    favourite.favouriteContent.map((item) => {
      if (folderId === item.folderId) {
        arr.push((
          <TouchableOpacity>
            <Text style={styles.favTitle}>{item.title}</Text>
          </TouchableOpacity>
        ));
      }
      return null;
    });
    return (
      <View style={style}>
        {arr}
      </View>
    );
  }

  renderFolderIcon = (folderId, isVisible) => {
    const { activeFolderArr, activeFolder } = this.state;
    const activeFolderIcon = activeFolderArr.includes(folderId) ? 'caretDown' : 'caretRight';
    const folderIcon = activeFolder === folderId ? 'folder' : 'folder_open';
    return (
      <View style={styles.folderIconWrap}>
        {
          isVisible ? (
            <FontIcon
              type={icons[activeFolderIcon][1]}
              icon={icons[activeFolderIcon][0]}
              color={colors.black}
              size={12}
              style={{ ...appStyles.w(15) }}
            />
          ) : <View style={{ ...appStyles.w(15) }} />
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

  renderFolder = (parentId) => {
    const { favourite, activeFolderArr } = this.state;
    const folderStyle = { marginLeft: parentId === 0 ? 0 : 25 };
    const arr = [];
    favourite.favouriteFolder.map((item) => {
      if (parentId === item.parentId) {
        const displayStyle = activeFolderArr.includes(item.id) ? { display: 'flex' } : { display: 'none' };
        arr.push((
          <View style={[styles.folderContainer, folderStyle]}>
            <TouchableOpacity
              style={styles.folderWrap}
              onPress={() => { this.setActiveFolder(item.id, item.parentId); }}
            >
              {this.renderFolderIcon(item.id, this.getChildFolderCount(item.id))}
              <Text style={styles.folderName}>{item.folderName}</Text>
            </TouchableOpacity>
            <View style={displayStyle}>
              {this.renderFolder(item.id)}
              {this.renderFav(item.id)}
              {this.renderNewFolderInput(item.id)}
            </View>
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

  render() {
    const { loading } = this.state;
    const { translations } = this.props;
    if (loading) return <Loading />;
    return (
      <View>
        <TouchableOpacity
          style={[styles.folderWrap]}
          onPress={() => { this.setActiveFolder(0, 0); }}
        >
          {this.renderFolderIcon(0, false)}
          <Text
            style={styles.folderName}
            onPress={() => { this.setActiveFolder(0, 0); }}
          >
            {tr(translations, 'my_favorites', 'My Favorites')}
          </Text>
        </TouchableOpacity>
        <View style={{ ...appStyles.mgL(25) }}>
          {this.renderFolder(0)}
          {this.renderFav(0)}
          {this.renderNewFolderInput(0)}
        </View>
      </View>
    );
  }
}

export default FavouriteContent;
