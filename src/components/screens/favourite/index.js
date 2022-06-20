/* eslint-disable object-curly-newline */
/**
 * @fileoverview This is favourite screen component.
 * @package
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Popover from 'react-native-popover-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import analytics from '@react-native-firebase/analytics';
import {
  appConstants,
  icons,
  colors,
  globals,
  appContexts,
  tr,
  exportFavourite,
  importFavourite,
  helpers
} from '../../../config';
import {
  MainHoc,
  FontIcon,
  Loading,
  Button,
  HtmlParser
} from '../../custom';
import appStyles from '../../../assets/styles/appStyles';
import {
  getFavourite as fetchFavourite,
  saveFavouriteContent,
  saveFavouriteFolder as persistFavouriteFolder,
  deleteFavouriteContent as removeFavouriteContent,
  deleteFavouriteFolder as removeFavouriteFolder,
  editFavouriteFolder as replaceFavouriteFolder,
  duplicateFavouriteFolder as matchingFavouriteFolder,
  getProductDetails as fetchProductDetails,
  resetFavouriteData as reconstructFavouriteData,
  getPageData as fetchPageData,
  getProductList as fetchProductList,
  setFavouriteProductCompare as placeFavouriteProductCompare,
  updateFavouritePosition as upgradeFavouritePosition,
  getProductGroups as fetchProductGroups,
  getSubProductGroups as fetchSubProductGroups,
  getSubProductGroupsArr as fetchSubProductGroupsArr
} from '../../../redux/actions';
import FolderList from './folderList';
import FavouriteList from './favouriteList';
import styles from './styles';

const { routes, textCasing } = appConstants;
const { PageContentContext } = appContexts;

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: '',
      showMoreTooltip: false,
      enabledScrollView: true,
    };
    this.folderRef = null;
    this.favouriteRef = null;
  }

  componentDidMount() {
    const { getFavourite, favourite, universal } = this.props;
    if (universal.analyticsTracking === null || universal.analyticsTracking) {
      helpers.pageInfoAnalytics({ pageState: 'favorite', pageName: { 'att.favoritesSave': favourite.favouriteContent.map(favId => favId.title).join(',') } });
      analytics().logScreenView('Favorite', appConstants.firebaseGenericPage);
    }
    if (favourite.loading) getFavourite();
    const breadCrumbRef = globals.GET_APP_DATA('breadCrumbRef');
    breadCrumbRef.setBreadcrumbData([]);
  }

  setFolderRef = (ref) => {
    this.folderRef = ref;
  }

  setFavouriteRef = (ref) => {
    this.favouriteRef = ref;
  }

  setActiveFolderId = (folderId) => {
    const { favourite } = this.props;
    this.favouriteRef.setFavouriteData(folderId, favourite.favouriteContent);
  }

  showMoreTooltip = () => {
    this.setState({ showMoreTooltip: true });
  }

  hideMoreTooltip = () => {
    this.setState({ showMoreTooltip: false });
  }

  manuallySetFavContent = (data) => {
    this.favouriteRef.setFavouriteData(0, data);
  }

  sortFolder = () => {
    this.setState({ showMoreTooltip: false });
    this.folderRef.sortFolders();
    this.favouriteRef.sortFavourite();
  }

  addNewFolder = () => {
    this.setState({
      showMoreTooltip: false
    }, () => {
      this.folderRef.showNewFolder();
    });
  }

  exportFavourite = () => {
    const { favourite, translations } = this.props;

    this.setState({
      showMoreTooltip: false
    }, async () => {
      await exportFavourite(favourite, translations);
    });
  }

  importFavourite = async () => {
    const { translations, getFavourite, resetFavouriteData } = this.props;

    this.setState({
      showMoreTooltip: false
    }, async () => {
      await helpers.manualDelay(1000);
      await importFavourite(translations, getFavourite, resetFavouriteData);
    });
  }

  goBack = () => {
    const { componentId } = this.props;
    Navigation.pop(componentId);
  }

  searchInputChange = (t) => {
    this.setState({
      searchTxt: t
    });
    this.favouriteRef.setSearchData(t);
  }

  exportFolderFavourites = (folder) => {
    if (this.favouriteRef) {
      this.favouriteRef.exportFolderPdf(folder);
    }
  }

  renderHeader = (translations) => (
    <View style={styles.headerWrap}>
      <HtmlParser
        html={tr(translations, 'my_favorites', 'MY FAVORITES', textCasing.U)}
        textKey="fav-head"
        style={appStyles.heading}
      />
      <Button
        text={tr(translations, 'return_to_previous_page', 'Return to Previous page', textCasing.U)}
        onPress={() => { this.goBack(); }}
        theme="app"
        style={styles.backBtn}
      />
    </View>
  );

  renderSearchInput = () => {
    const { searchTxt, showMoreTooltip } = this.state;
    const { translations } = this.props;
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrap}>
          <View style={styles.searchInputView}>
            <TextInput
              value={searchTxt}
              onChangeText={(t) => { this.searchInputChange(t); }}
              placeholder={tr(translations, 'search_for_product_or_keyword', 'Search for product as keyword')}
              style={styles.searchInput}
              placeholderTextColor={colors.textLight}
            />
          </View>
          <FontIcon
            type={icons.search_line[1]}
            icon={icons.search_line[0]}
            color={colors.textLight}
            size={12}
          />
        </View>
        <TouchableOpacity
          ref={(ref) => { this.moreTooltipRef = ref; }}
          onPress={() => this.showMoreTooltip()}
        >
          <FontIcon
            type={icons.more[1]}
            icon={icons.more[0]}
            color={colors.black}
            size={14}
            style={styles.morePopover}
          />
        </TouchableOpacity>
        <Popover
          isVisible={showMoreTooltip}
          fromView={this.moreTooltipRef}
          onRequestClose={() => { this.hideMoreTooltip(); }}
        >
          <View style={styles.propover}>
            {/* <Text
              style={styles.propoverTxt}
              onPress={() => { this.sortFolder(); }}
            >
              {tr(translations, 'sort_by_name', 'Sort by name')}
            </Text> */}
            <Text
              style={styles.propoverTxt}
              onPress={() => { this.addNewFolder(); }}
            >
              {tr(translations, 'create_new_folder', 'Create new folder')}
            </Text>
            <Text
              style={styles.propoverTxt}
              onPress={() => { this.exportFavourite(); }}
            >
              {tr(translations, 'export_favorite_as_text', 'Export favorite as Text')}
            </Text>
            <Text
              style={styles.propoverTxt}
              onPress={() => { this.importFavourite(); }}
            >
              {tr(translations, 'import_favorites', 'Import Favorites')}
            </Text>
          </View>
        </Popover>
      </View>
    );
  }

  renderFolders = () => {
    const {
      favourite,
      saveFavouriteFolder,
      translations,
      deleteFavouriteFolder,
      editFavouriteFolder,
      duplicateFavouriteFolder
    } = this.props;
    return (
      <View style={styles.folderWrap}>
        <FolderList
          favourite={favourite}
          saveFavouriteFolder={saveFavouriteFolder}
          setFolderRef={this.setFolderRef}
          setActiveFolderId={this.setActiveFolderId}
          translations={translations}
          deleteFavouriteFolder={deleteFavouriteFolder}
          manuallySetFavContent={this.manuallySetFavContent}
          editFavouriteFolder={editFavouriteFolder}
          duplicateFavouriteFolder={duplicateFavouriteFolder}
          exportFolderFavourites={this.exportFolderFavourites}
        />
      </View>
    );
  }

  renderFavourites = () => {
    const {
      favourite,
      componentId,
      getFavouriteModalRef,
      deleteFavouriteContent,
      getProductDetails,
      translations,
      structureData,
      productDetails,
      toggleLoader,
      getPageData,
      pageData,
      getProductList,
      setFavouriteProductCompare,
      updateFavouritePosition,
      getSubProductGroups,
      getProductGroups,
      getSubProductGroupsArr
    } = this.props;
    const { activeFolderId } = this.state;
    return (
      <View style={styles.favouriteWrap}>
        <FavouriteList
          favouriteContent={favourite.favouriteContent}
          favouriteFolder={favourite.favouriteFolder}
          activeFolderId={activeFolderId}
          setFavouriteRef={this.setFavouriteRef}
          componentId={componentId}
          getFavouriteModalRef={getFavouriteModalRef}
          deleteFavouriteContent={deleteFavouriteContent}
          translations={translations}
          getProductDetails={getProductDetails}
          structureData={structureData}
          productDetails={productDetails}
          toggleLoader={toggleLoader}
          getPageData={getPageData}
          pageData={pageData}
          getProductList={getProductList}
          setFavouriteProductCompare={setFavouriteProductCompare}
          toggleScrollView={(value) => this.setState({ enabledScrollView: value })}
          updateFavouritePosition={updateFavouritePosition}
          getProductGroups={getProductGroups}
          getSubProductGroups={getSubProductGroups}
          getSubProductGroupsArr={getSubProductGroupsArr}
        />
      </View>
    );
  }

  render() {
    const {
      favourite,
      getMarkingModalRef,
      textMarking,
      translations
    } = this.props;
    const { enabledScrollView } = this.state;
    if (favourite.loading) return <Loading />;
    return (
      <PageContentContext.Provider
        value={{
          getMarkingModalRef,
          textMarking
        }}
      >
        <View style={styles.container}>
          <KeyboardAwareScrollView
            contentContainerStyle={appStyles.container}
            behavior="padding"
            enabled
            scrollEnabled={enabledScrollView}
            resetScrollToCoords={{ x: 0, y: 0 }}
          >
            {this.renderHeader(translations)}
            {this.renderSearchInput()}
            <View style={styles.content}>
              {this.renderFolders()}
              {this.renderFavourites()}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </PageContentContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  favourite: state.favourite,
  textMarking: state.textMarking,
  translations: state.translations.arr,
  structureData: state.structureData,
  productDetails: state.productDetails,
  pageData: state.pageData,
  universal: state.universal
});

const mapDispatchToProps = (dispatch) => ({
  getFavourite: () => fetchFavourite(dispatch),
  saveFavouriteContent: (favouriteData) => saveFavouriteContent(dispatch, favouriteData),
  saveFavouriteFolder: (favouriteFolderData) => persistFavouriteFolder(dispatch, favouriteFolderData),
  deleteFavouriteContent: (favouriteData) => removeFavouriteContent(dispatch, favouriteData),
  deleteFavouriteFolder: (folderData) => removeFavouriteFolder(dispatch, folderData),
  editFavouriteFolder: (folderData) => replaceFavouriteFolder(dispatch, folderData),
  duplicateFavouriteFolder: (folderData, folderName) => matchingFavouriteFolder(dispatch, folderData, folderName),
  resetFavouriteData: () => reconstructFavouriteData(dispatch),
  getProductDetails: (productId) => fetchProductDetails(dispatch, productId),
  getPageData: (pageId) => fetchPageData(dispatch, pageId),
  getProductList: (productgroupId) => fetchProductList(dispatch, productgroupId),
  setFavouriteProductCompare: (productList) => placeFavouriteProductCompare(dispatch, productList),
  updateFavouritePosition: (favouriteData) => upgradeFavouritePosition(dispatch, favouriteData),
  getProductGroups: (productgroupId) => fetchProductGroups(dispatch, productgroupId),
  getSubProductGroups: (productgroupId) => fetchSubProductGroups(dispatch, productgroupId),
  getSubProductGroupsArr: (productgroupIdArr) => fetchSubProductGroupsArr(dispatch, productgroupIdArr),
});

const FavouriteRedux = connect(mapStateToProps, mapDispatchToProps)(Favourite);
export default MainHoc({
  screen: routes.FAVOURITE,
  breadCrumb: true
})(FavouriteRedux);
