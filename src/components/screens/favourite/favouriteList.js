import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Popover from 'react-native-popover-view';
import { rootNavigation } from '../../../navigation';
import SortableList from '../../custom/elements/SortableList/SortableList';
import {
  icons,
  colors,
  appStyles,
  appConstants,
  tr,
  productDetailsPdf,
  manualContentPdf,
  productListPdf,
  helpers
} from '../../../config';
import {
  FontIcon,
  EmptyList,
  Loading,
  HtmlParser
} from '../../custom';
import styles from './styles';
import { folderExportPdf, productComparePdf, productGroupListPdf } from '../../../config/createPdf';
import { getProductCompareLabels } from '../../../config/libs/helpers';

const { favouriteModalTypes, favouriteTypes, textCasing } = appConstants;

const favTypeIcons = {
  [favouriteTypes.PRODUCT_DETAILS]: icons.machine_filled,
  [favouriteTypes.PRODUCT_GROUP_LIST]: icons.minimize_screen,
  [favouriteTypes.PRODUCT_LIST]: icons.user_profile_filled,
  [favouriteTypes.MANUAL_CONTENT]: icons.off_canvas_menu,
  [favouriteTypes.COMPARE_FAVOURITE]: icons.user_profile_filled,
};

class FavouriteList extends Component {
  constructor(props) {
    super(props);
    const { favouriteContent } = this.props;
    let tooltipState = {};
    favouriteContent.map((item) => {
      tooltipState = { ...tooltipState, [`fav_${item.id}`]: false };
      return null;
    });
    this.state = {
      activeFolderId: 0,
      favouriteContent,
      tooltipState,
      searchTxt: '',
      loading: false,
      enbleScrollView: true,
    };
    this.favouriteHtmlStr = null;
    this.exportingFolder = false;
  }

  componentDidMount() {
    const { setFavouriteRef } = this.props;
    setFavouriteRef(this);
  }

  navigateToProduct = (item) => {
    const { setFavouriteProductCompare, componentId } = this.props;
    setFavouriteProductCompare(item.pageIds);
    Navigation.push(componentId, rootNavigation.productCompare);
  }

  navigate = (item) => {
    const { componentId, translations } = this.props;
    const { pageId, type } = item;
    const typeArr = type.split('-');
    if (typeArr[0] === favouriteTypes.COMPARE_FAVOURITE) {
      Alert.alert(
        tr(translations, 'warning', 'Warning'),
        tr(translations, 'product_comparison_override_warning', 'The products that are currently in product comparison will be removed and replaced with the saved comparison.'),
        [
          {
            text: tr(translations, 'cancel', 'Cancel'),
            onPress: () => { },
            style: 'cancel'
          },
          {
            text: tr(translations, 'ok', 'OK', textCasing.U),
            onPress: () => this.navigateToProduct({ ...item, pageIds: typeArr.slice(1) })
          }
        ],
        { cancelable: true }
      );
    } else {
      Navigation.push(
        componentId,
        rootNavigation.pageContent({
          passProps: {
            pageId,
            checkParent: true
          }
        })
      );
    }
  }

  sortFavourite = () => {
    const { favouriteContent } = this.state;
    const arr = favouriteContent.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (b.title > a.title) return -1;
      return 0;
    });
    this.setState({ favouriteContent: arr });
  }

  setFavouriteData = (activeFolderId, favouriteContent) => {
    let tooltipState = {};
    favouriteContent.map((item) => {
      tooltipState = { ...tooltipState, [`fav_${item.id}`]: false };
      return null;
    });
    this.setState({
      activeFolderId,
      favouriteContent,
      tooltipState
    });
  }

  setSearchData = (searchTxt) => {
    this.setState({ searchTxt });
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

  duplicateFavourite = (item) => {
    const { getFavouriteModalRef } = this.props;
    const duplicateFavouriteCb = () => { };

    this.hideMoreOption(`fav_${item.id}`);
    setTimeout(() => {
      const favouriteModalRef = getFavouriteModalRef();
      const obj = {
        title: item.title,
        pageId: item.pageId,
        type: item.type
      };
      favouriteModalRef.showFavouriteModal(obj, duplicateFavouriteCb, favouriteModalTypes.DUPLICATE);
    }, 500);
  }

  editFavourite = (item) => {
    const { favouriteFolder, getFavouriteModalRef } = this.props;

    const editFavouriteCb = () => { };

    let parentId = 0;
    favouriteFolder.map((favouriteItem) => {
      if (favouriteItem.id === item.id) {
        parentId = favouriteItem.parentId;
      }
      return null;
    });

    const activeFolderObj = {
      folderId: item.folderId,
      parentId
    };

    this.hideMoreOption(`fav_${item.id}`);
    setTimeout(() => {
      const favouriteModalRef = getFavouriteModalRef();
      const obj = {
        title: item.title,
        pageId: item.pageId,
        type: item.type,
        favouriteId: item.id
      };
      favouriteModalRef.showFavouriteModal(obj, editFavouriteCb, favouriteModalTypes.EDIT, activeFolderObj);
    }, 500);
  }

  deleteFavourite = (item) => {
    const { deleteFavouriteContent, translations } = this.props;
    this.hideMoreOption(`fav_${item.id}`);
    setTimeout(() => {
      this.setState({ loading: true }, () => {
        deleteFavouriteContent(item.id).then((data) => {
          let tooltipState = {};
          data.map((favItem) => {
            tooltipState = { ...tooltipState, [`fav_${favItem.id}`]: false };
            return null;
          });

          Alert.alert(
            tr(translations, 'success', 'Success'),
            tr(translations, 'favorite_deleted', 'Favorite deleted')
          );
          this.setState({
            loading: false,
            favouriteContent: data,
            tooltipState
          });
        });
      });
    }, 500);
  }

  exportManualContentPdf = async (item) => {
    const {
      getPageData,
      structureData,
      toggleLoader
    } = this.props;
    if (!this.exportingFolder) {
      this.hideMoreOption(`fav_${item.id}`);
      await helpers.manualDelay(500);
      toggleLoader(true);
      await getPageData(item.pageId);
      // eslint-disable-next-line react/destructuring-assignment
      const pageData = this.props.pageData[item.pageId].obj.content;
      await helpers.manualDelay(500);
      toggleLoader(false);
      await helpers.manualDelay(200);
      manualContentPdf(pageData, structureData, item.pageId);
    } else {
      await getPageData(item.pageId);
      // eslint-disable-next-line react/destructuring-assignment
      const pageData = this.props.pageData[item.pageId].obj.content;
      this.favouriteHtmlStr = await manualContentPdf(pageData, structureData, item.pageId, true);
    }
  }

  exportProductListPdf = async (item) => {
    const {
      getProductList,
      structureData,
      toggleLoader
    } = this.props;
    if (!this.exportingFolder) {
      this.hideMoreOption(`fav_${item.id}`);
      await helpers.manualDelay(500);
      toggleLoader(true);
      await helpers.manualDelay(500);
      const res = await getProductList(item.pageId);
      const productListArr = res.data;
      const ribbonData = JSON.parse(res.productGroupData);

      const headline = ribbonData.name;
      let description = '';
      const ribbonTxt = ribbonData.texts.find((itemType) => (itemType.type === 'header'));
      if (ribbonTxt) {
        if (ribbonTxt.headline) {
          description += `<strong>${ribbonTxt.headline}</strong> `;
        }
        description += ribbonTxt.text;
      }

      toggleLoader(false);
      await helpers.manualDelay(200);
      await productListPdf({
        productListArr,
        headline,
        description
      }, item.pageId, structureData);
    } else {
      const res = await getProductList(item.pageId);
      const productListArr = res.data;
      const ribbonData = JSON.parse(res.productGroupData);
      const headline = ribbonData.name;
      let description = '';
      const ribbonTxt = ribbonData.texts.find((itemType) => (itemType.type === 'header'));
      if (ribbonTxt) {
        if (ribbonTxt.headline) {
          description += `<strong>${ribbonTxt.headline}</strong> `;
        }
        description += ribbonTxt.text;
      }
      this.favouriteHtmlStr = await productListPdf({
        productListArr,
        headline,
        description
      }, item.pageId, structureData, true);
    }
  }

  exportProductDetailsPdf = async (item) => {
    const {
      getProductDetails,
      structureData,
      toggleLoader
    } = this.props;
    if (!this.exportingFolder) {
      this.hideMoreOption(`fav_${item.id}`);
      await helpers.manualDelay(500);
      toggleLoader(true);
      await getProductDetails(item.pageId);
      // eslint-disable-next-line react/destructuring-assignment
      let productData = this.props.productDetails[item.pageId].obj;
      productData = JSON.parse(productData.data);
      await helpers.manualDelay(500);
      toggleLoader(false);
      await helpers.manualDelay(200);
      productDetailsPdf(productData, structureData);
    } else {
      await getProductDetails(item.pageId);
      // eslint-disable-next-line react/destructuring-assignment
      let productData = this.props.productDetails[item.pageId].obj;
      productData = JSON.parse(productData.data);
      this.favouriteHtmlStr = await productDetailsPdf(productData, structureData, true);
    }
  }

  exportProductGroupListPdf = async (item) => {
    const {
      getProductGroups,
      getSubProductGroupsArr,
      structureData,
      toggleLoader
    } = this.props;
    if (!this.exportingFolder) {
      this.hideMoreOption(`fav_${item.id}`);
      await helpers.manualDelay(500);
      toggleLoader(true);
      await helpers.manualDelay(500);
    }

    const res = await getProductGroups(item.pageId);
    const productGroups = res.data;
    const ribbonData = productGroups.find((itemId) => (itemId.id === String(res.productgroupId)));
    const productGroupListArr = productGroups.filter((itemId) => (itemId.id !== String(res.productgroupId)));

    const headline = ribbonData.name;
    let description = '';
    const ribbonTxt = ribbonData.texts.find((itemType) => (itemType.type === 'header'));
    if (ribbonTxt) {
      if (ribbonTxt.headline) {
        description += `<strong>${ribbonTxt.headline}</strong> `;
      }
      description += ribbonTxt.text;
    }
    const idArr = [];
    productGroups.map((itemId) => {
      idArr.push(itemId.id);
      return null;
    });
    const res2 = await getSubProductGroupsArr(idArr);
    const subProductGroupList = {};
    res2.forEach((itemProductId) => {
      subProductGroupList[itemProductId.productgroupId] = { obj: itemProductId };
    });

    if (!this.exportingFolder) {
      toggleLoader(false);
      await helpers.manualDelay(200);
      await productGroupListPdf({
        productGroupListArr,
        headline,
        description,
        subProductGroupList
      }, item.pageId, structureData);
    } else {
      this.favouriteHtmlStr = await productGroupListPdf({
        productGroupListArr,
        headline,
        description,
        subProductGroupList
      }, item.pageId, structureData, true);
    }
  }

  exportProductComparePdf = async (item) => {
    const {
      getProductDetails,
      toggleLoader
    } = this.props;
    if (!this.exportingFolder) {
      this.hideMoreOption(`fav_${item.id}`);
      await helpers.manualDelay(500);
      toggleLoader(true);
    }
    const productIds = item.type.split('-').slice(1);
    const productDetailsArr = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const productId of productIds) {
      // eslint-disable-next-line no-await-in-loop
      const productDetails = await getProductDetails(parseInt(productId, 10));
      productDetailsArr.push(JSON.parse(productDetails.data));
    }
    const data = getProductCompareLabels(productDetailsArr);
    if (!this.exportingFolder) {
      // // eslint-disable-next-line react/destructuring-assignment
      await helpers.manualDelay(500);
      toggleLoader(false);
      await helpers.manualDelay(200);
      const compareData = {
        productDetailsArr,
        techDataLabels: data.techDataLabels,
        equipmentLabels: data.equipmentLabels
      };
      await productComparePdf(compareData);
    } else {
      const compareData = {
        productDetailsArr,
        techDataLabels: data.techDataLabels,
        equipmentLabels: data.equipmentLabels
      };
      this.favouriteHtmlStr = await productComparePdf(compareData, true);
    }
  }

  exportPdf = async (item) => {
    if (item.type === favouriteTypes.PRODUCT_DETAILS) {
      this.exportProductDetailsPdf(item);
    } else if (item.type === favouriteTypes.MANUAL_CONTENT) {
      this.exportManualContentPdf(item);
    } else if (item.type === favouriteTypes.PRODUCT_LIST) {
      this.exportProductListPdf(item);
    } else if (item.type === favouriteTypes.PRODUCT_GROUP_LIST) {
      this.exportProductGroupListPdf(item);
    } else if (item.type.split('-')[0] === favouriteTypes.COMPARE_FAVOURITE) {
      this.exportProductComparePdf(item);
    }
  }

  exportFolderPdf = async (folder) => {
    const { favouriteContent, favouriteFolder, toggleLoader } = this.props;
    await helpers.manualDelay(500);
    toggleLoader(true);
    let folderID = folder.id;
    let folderName = '';
    let favouritesToExport = [];
    if (folderID === 'all') {
      favouritesToExport = favouriteContent;
      folderName = 'All';
    } else if (folderID === 'my_favorites') {
      folderID = 0;
      favouritesToExport = favouriteContent.filter((item) => item.folderId === folderID);
      folderName = 'My favourites';
    } else {
      favouritesToExport = this.getFavouritesToExport(favouritesToExport, folderID);
      const exportFolder = favouriteFolder.find((item) => item.id === folderID);
      // eslint-disable-next-line prefer-destructuring
      folderName = exportFolder.folderName;
    }

    let htmlStr = '';
    this.exportingFolder = true;

    // eslint-disable-next-line no-restricted-syntax
    for (const favourite of favouritesToExport) {
      this.exportPdf(favourite);
      // eslint-disable-next-line no-await-in-loop
      const tempStr = await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (this.favouriteHtmlStr) {
            const temp = this.favouriteHtmlStr;
            this.favouriteHtmlStr = null;
            clearInterval(interval);
            resolve(temp);
          }
        });
      }, 100);
      if (htmlStr === '') {
        htmlStr = tempStr;
      } else {
        htmlStr = `${htmlStr}
        <div style="page-break-after: always;display: block;height: 0;clear: both;margin: 0;">&nbsp;</div>
        ${tempStr}`;
      }
    }
    this.exportingFolder = false;
    await helpers.manualDelay(500);
    toggleLoader(false);
    await helpers.manualDelay(200);
    await folderExportPdf(htmlStr, folderName);
  }

  getFavouritesToExport = (favouritesToExport, folderID) => {
    const { favouriteContent, favouriteFolder } = this.props;
    let temp = [...favouritesToExport, ...favouriteContent.filter((item) => item.folderId === folderID)];
    const subFolders = favouriteFolder.filter((item) => item.parentId === folderID);
    // eslint-disable-next-line no-restricted-syntax
    for (const subFolder of subFolders) {
      temp = this.getFavouritesToExport(temp, subFolder.id);
    }
    return temp;
  }

  getSourceAndDestinationIndex = (rowIndex, newOrder, filteredArr, favoriteContent) => {
    // findIndex
    const temp = {};
    const newOrderRowIndex = newOrder.indexOf(rowIndex);
    const rowObj = filteredArr[parseInt(rowIndex, 10)];
    temp.sourceIndex = favoriteContent.findIndex((item) => item.id === rowObj.id);
    if (newOrderRowIndex === 0) {
      const tempNextIndex = parseInt(newOrder[newOrderRowIndex + 1], 10);
      const nextDestinationObj = filteredArr[tempNextIndex];
      if (nextDestinationObj) {
        temp.destinationIndex = favoriteContent.findIndex((item) => item.id === nextDestinationObj.id);
      } else temp.destinationIndex = temp.sourceIndex;
    } else {
      const tempPrevIndex = parseInt(newOrder[newOrderRowIndex - 1], 10);
      const prevDestinationObj = filteredArr[tempPrevIndex];
      if (prevDestinationObj) {
        temp.destinationIndex = favoriteContent.findIndex((item) => item.id === prevDestinationObj.id);
        if (temp.sourceIndex > temp.destinationIndex) temp.destinationIndex += 1;
      } else temp.destinationIndex = temp.sourceIndex;
    }
    return temp;
  }

  setPosition = (rowIndex, newOrder, filteredArr) => {
    const { updateFavouritePosition } = this.props;
    const { favouriteContent: favoriteContent } = this.state;
    const { sourceIndex, destinationIndex } = this.getSourceAndDestinationIndex(rowIndex, newOrder, filteredArr, favoriteContent);
    if (sourceIndex !== undefined && destinationIndex !== undefined) {
      const sourceObj = favoriteContent[sourceIndex];
      if (destinationIndex !== sourceIndex) {
        // condition if there is no previous obj
        let newPOS;
        let nextPos = 1000;
        let previousPos = 0;
        if (destinationIndex === 0) {
          nextPos = parseFloat(favoriteContent[0].position);
          newPOS = parseFloat(0 + ((nextPos - 0) / 2), 10);
        } else if (destinationIndex === favoriteContent.length - 1) {
          previousPos = parseFloat(favoriteContent[favoriteContent.length - 1].position);
          newPOS = parseFloat(previousPos + (1000 / 2), 10);
        } else {
          previousPos = parseFloat(favoriteContent[destinationIndex - 1].position);
          nextPos = parseFloat(favoriteContent[destinationIndex].position);
          newPOS = parseFloat(previousPos + ((nextPos - previousPos) / 2), 10);
        }
        sourceObj.position = newPOS;
        favoriteContent.splice(sourceIndex, 1);
        favoriteContent.splice(destinationIndex, 0, sourceObj);
        updateFavouritePosition({ favouriteContent: favoriteContent, position: newPOS, favouriteId: sourceObj.id });
      }
    }
  }


  renderOptionPopover = (item) => {
    const { tooltipState } = this.state;
    const { translations } = this.props;
    const {
      PRODUCT_DETAILS, MANUAL_CONTENT, PRODUCT_LIST, PRODUCT_GROUP_LIST, COMPARE_FAVOURITE
    } = favouriteTypes;

    const enableExport = [
      PRODUCT_DETAILS,
      MANUAL_CONTENT,
      PRODUCT_LIST,
      PRODUCT_GROUP_LIST,
      COMPARE_FAVOURITE
    ].includes(item.type.split('-')[0]) ? 'flex' : 'none';
    return (
      <Popover
        isVisible={tooltipState[`fav_${item.id}`]}
        fromView={this[`fav_${item.id}`]}
        onRequestClose={() => this.hideMoreOption(`fav_${item.id}`)}
      >
        <View style={styles.propover}>
          <Text
            style={styles.propoverTxt}
            onPress={() => { this.editFavourite(item); }}
          >
            {tr(translations, 'edit', 'Edit')}
          </Text>
          <Text
            style={styles.propoverTxt}
            onPress={() => { this.duplicateFavourite(item); }}
          >
            {tr(translations, 'duplicate', 'Duplicate')}
          </Text>
          <Text
            style={styles.propoverTxt}
            onPress={() => { this.deleteFavourite(item); }}
          >
            {tr(translations, 'delete', 'Delete')}
          </Text>
          <Text
            style={[
              styles.propoverTxt,
              { display: enableExport }
            ]}
            onPress={() => { this.exportPdf(item); }}
          >
            {tr(translations, 'export_select', 'Export / Select')}
          </Text>
        </View>
      </Popover>
    );
  }

  renderItem = ({ key, index, data }) => {
    const item = data;
    const activeFavouriteItem = index % 2 === 0 ? styles.activeFavouriteItem : {};
    const type = item.type.split('-')[0];
    return (
      <View key={key} style={[styles.favouriteItem, activeFavouriteItem]}>
        <FontIcon
          type={favTypeIcons[type][1]}
          icon={favTypeIcons[type][0]}
          color={colors.black}
          size={14}
          style={{ ...appStyles.mgR10 }}
        />
        <TouchableOpacity
          onPress={() => { this.navigate(item); }}
          style={styles.favouriteTextWrap}
        >
          <HtmlParser
            html={item.title}
            textKey={`fav-list-${item.pageId}`}
            style={styles.favouriteText}
            onPress={() => { this.navigate(item); }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          ref={(ref) => { this[`fav_${item.id}`] = ref; }}
          onPress={() => this.showMoreOption(`fav_${item.id}`)}
        >
          <FontIcon
            type={icons.more[1]}
            icon={icons.more[0]}
            color={colors.black}
            size={14}
          />
        </TouchableOpacity>
        {this.renderOptionPopover(item)}
      </View>
    );
  }

  render() {
    const {
      favouriteContent,
      activeFolderId,
      searchTxt,
      loading,
      enbleScrollView
    } = this.state;
    const { translations, toggleScrollView } = this.props;
    const searchStr = searchTxt.toLocaleLowerCase();
    const arr = favouriteContent.filter((item) => {
      const titleStr = item.title.toLocaleLowerCase();
      if (searchStr !== '') {
        if (activeFolderId === null && titleStr.indexOf(searchStr) === -1) return false;
        if (activeFolderId === null && titleStr.indexOf(searchStr) !== -1) return true;
        return titleStr.indexOf(searchStr) !== -1 && item.folderId === activeFolderId;
      }
      if (activeFolderId === null) return true;
      return item.folderId === activeFolderId;
    });
    if (loading) {
      return <Loading />;
    }
    return (
      <View style={styles.favouriteWrapInner}>
        {
          arr && arr.length
            ? (
              <SortableList
                data={arr}
                scrollEnabled={enbleScrollView}
                renderRow={this.renderItem}
                onReleaseRow={(data, currentOrder) => {
                  toggleScrollView(true);
                  this.setState({ enbleScrollView: true });
                  this.setPosition(data, currentOrder, arr);
                }}
                onActivateRow={() => {
                  toggleScrollView(false);
                  this.setState({ enbleScrollView: false });
                }}
              />
            )
            : <EmptyList text={tr(translations, 'no_data_available', 'No data available')} />
        }
      </View>
    );
  }
}

export default FavouriteList;
