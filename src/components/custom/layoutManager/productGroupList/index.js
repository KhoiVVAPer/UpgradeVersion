/**
 * @fileoverview This component renders design template
 * for image product group manual content.
 * @package
 */
import React, { Component } from 'react';
import {
  View, FlatList
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import {
  // icons,
  // colors,
  helpers,
  appContexts,
  appConstants, images, globals, tr
} from '../../../../config';
import { rootNavigation } from '../../../../navigation';
import styles from './styles';
import ErrorView from '../../generic/errorView';
// import FontIcon from '../../generic/fontIcon/_fontIcon';
import Loading from '../../generic/loading';
import HeadlineText from '../headlineText';
import { store } from '../../../../redux/configureStrore';
import ListItem from './listItem';
import Products from './products';

const { favouriteTypes } = appConstants;
const { PageContentContext } = appContexts;

class ProductGroupList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      productGroups: [],
      isDropdownAvailable: false,
      dropdown: ''
    };
    this.commandListener = Navigation.events().registerCommandListener((name, params) => {
      // this.setState({})
    });
  }

  componentDidMount() {
    const { layoutData } = this.props;
    const { productGroupList } = store.getState();

    const layoutId = layoutData.productgroupId;

    if (!productGroupList[layoutId]
      || productGroupList[layoutId].loading
      || productGroupList[layoutId].error) {
      this.reloadPage();
    } else {
      let productGroups = productGroupList[layoutId].obj
        && productGroupList[layoutId].obj.data
        ? productGroupList[layoutId].obj.data : [];
      productGroups = productGroups.filter((item) => item.texts[0]);

      this.getSubProductGroupsList(productGroups);


      this.setState({
        loading: false,
        productGroups,
        isDropdownAvailable: (productGroupList[layoutId]
          && productGroupList[layoutId].obj
          && productGroupList[layoutId].obj.isDropdownAvailable)
          || false,
        dropdown: (productGroupList[layoutId]
          && productGroupList[layoutId].obj
          && productGroupList[layoutId].obj.dropdown)
          || '',
      });
    }
  }

  componentWillUnmount() {
    this.commandListener.remove();
  }

  reloadPage = () => {
    const { layoutData, getProductGroups } = this.props;
    const layoutId = layoutData.productgroupId;

    this.setState({
      loading: true
    }, async () => {
      try {
        const res = await getProductGroups(layoutId);
        const productGroups = res.data.filter((item) => item.texts[0]);

        this.getSubProductGroupsList(productGroups);

        this.setState({
          productGroups,
          isDropdownAvailable: res.isDropdownAvailable,
          dropdown: res.dropdown,
          loading: false,
          error: false
        });
      } catch (err) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  }

  getSubProductGroupsList = (productGroups) => {
    const { getSubProductGroupsArr, subProductGroupList } = this.context;
    const { layoutData } = this.props;

    const arr = productGroups.filter((item) => (item.id !== String(layoutData.productgroupId)));
    const idArr = [];
    arr.map((item) => {
      idArr.push(item.id);
      return null;
    });

    let flag = true;
    idArr.map((item) => {
      if (!subProductGroupList[item]) flag = false;
      return null;
    });

    if (!flag) getSubProductGroupsArr(idArr);
  }

  navigate = (pageId) => {
    const { componentId } = this.context;
    Navigation.push(
      componentId,
      rootNavigation.pageContent({
        passProps: { pageId }
      })
    );
  }

  renderRibbon = () => {
    const { productGroups } = this.state;
    const { layoutData } = this.props;
    const { subProductGroupList } = this.context;

    if (!layoutData.ribbon) return false;

    const ribbonData = productGroups.find((item) => (item.id === String(layoutData.productgroupId)));
    const productGroupListArr = productGroups.filter((item) => (item.id !== String(layoutData.productgroupId)));

    if (!ribbonData) return null;
    const headline = ribbonData.name;
    let text = '';
    const ribbonTxt = ribbonData.texts.find((item) => (item.type === 'header'));
    if (ribbonTxt) {
      if (ribbonTxt.headline) {
        text += `<strong>${ribbonTxt.headline}</strong> `;
      }
      text += ribbonTxt.text;
    }

    return (
      <HeadlineText
        layoutData={{
          values: [{
            headline,
            text
          }],
          ribbonButtonTarget: layoutData.ribbonButtonTarget
        }}
        favType={favouriteTypes.PRODUCT_GROUP_LIST}
        isExport
        productGroupListArr={productGroupListArr}
        subProductGroupList={subProductGroupList}
      />
    );
  }

  renderItem = ({ item, index }) => {
    const { layoutType, getSubProductGroups, productFinderContent } = this.props;
    const { pageId } = this.context || { pageId: 100 };
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 4, margin: 10 }} />;
    if (!item.texts[0]) return <View />;

    return (
      <ListItem
        layoutType={layoutType}
        productGroupData={item}
        navigate={this.navigate}
        getSubProductGroups={getSubProductGroups}
        productFinderContent={productFinderContent}
        textKey={`productGroupList-${pageId}-${index}`}
        productFinderGroupData={{
          productFinderApiData: productFinderContent
        }}
        status="productFinder"
      />
    );
  }

  render() {
    const {
      loading,
      error,
      productGroups,
      isDropdownAvailable,
      dropdown
    } = this.state;
    const { translations } = this.context;
    // eslint-disable-next-line
    const { layoutData, moveToTop, productFinderContent, } = this.props;
    const ProductFinderGroupData = productFinderContent && productFinderContent.questions && productFinderContent.questions[0];
    const isNetConnected = globals.GET_APP_DATA('isNetConnected');
    let ProductFinderId;
    const current_Country = productFinderContent && productFinderContent.country;
    const DEV_ENV_COUNTRY = current_Country === 'dcf' || current_Country === 'ro' || current_Country === 'cz' || current_Country === 'ee' || current_Country === 'fr'
      || current_Country === 'lv' || current_Country === 'pl' || current_Country === 'at' || current_Country === 'be'
      || current_Country === 'hu' || current_Country === 'ua' || current_Country === 'ch' || current_Country === 'nl' || current_Country === 'gb'
      || current_Country === 'jp' || current_Country === 'ae' || current_Country === 'hk' || current_Country === 'au' || current_Country === 'de';
    const STAGE_ENV_COUNTRY = current_Country === 'dcf';

    const DummyData = {
      id: '20035427',
      name: tr(translations, 'product_finder_header', 'Looking for the right product?'),
      parentId: '20035426',
      productgroupId: 200335427,
      texts: [
        {
          headline: '',
          text: tr(translations, 'product_finder_description', 'Use the Kärcher Product Finder and have the appropriate product displayed based on your selected criteria.'),
          type: 'class',
          images: [
            {
              type: 'full',
              url: 'https://dca-stage.app.kaercher.com/product_finder_logo.jpg'
            }
          ]
        }
      ],

    };
    const env_Status = helpers.getAppEnv().replace(/[()]/g, '').trim();
    let testingCountryCode;
    if (env_Status === 'Dev') {
      testingCountryCode = DEV_ENV_COUNTRY;
    } else {
      testingCountryCode = STAGE_ENV_COUNTRY;
    }


    if (loading) return <Loading />;
    if (error) return <ErrorView reloadPage={this.reloadPage} />;

    const arr = productGroups.filter((item) => (item.id !== String(layoutData.productgroupId)));
    if (testingCountryCode && isNetConnected) {
      arr.forEach((productGroupData) => {
        // ignore the below as will resolve and add in next sprint
        // eslint-disable-next-line no-unused-expressions
        ProductFinderGroupData && ProductFinderGroupData.Answer_Options.forEach((item) => {
          if (parseInt(productGroupData.parentId) === item.entryPointPageId) {
            ProductFinderId = item.entryPointPageId;
            ProductFinderGroupData.Answer = [item];
          }
        });
      });
      if (ProductFinderId) {
        arr.push(DummyData);
      }
    }

    const arrMod = arr.length % 4;
    for (let i = 0; i < arrMod; i += 1) {
      arr.push({});
    }
    if (isDropdownAvailable) {
      return (
        <View>
          {this.renderRibbon()}
          <Products
            dataContent={dropdown}
            layoutData={layoutData}
          />
        </View>
      );
    }

    return (
      <View>
        {this.renderRibbon()}
        <View style={styles.wrap}>
          {/* <Text style={styles.heading}>Product Groups:</Text> */}
          <FlatList
            extraData={this.state}
            data={arr}
            renderItem={this.renderItem}
            contentContainerStyle={styles.listItemContainer}
            columnWrapperStyle={styles.listItemColContainer}
            keyExtractor={(item, index) => `group_${index}`}
            scrollEnabled={false}
            numColumns={4}
          />
        </View>
        {
          // !arr.length ? null : (
          //   <View style={styles.moveTopWrap}>
          //     <FontIcon
          //       type={icons.upArrowNew[1]}
          //       icon={icons.upArrowNew[0]}
          //       color={colors.text}
          //       size={40}
          //       onPress={() => moveToTop()}
          //       delayDuration={0}
          //     />
          //   </View>
          // )
        }
      </View>
    );
  }
}

ProductGroupList.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired,
  getProductGroups: PropTypes.func.isRequired,
  moveToTop: PropTypes.func.isRequired
};
ProductGroupList.contextType = PageContentContext;
export default ProductGroupList;
