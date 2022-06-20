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
  // icons, colors,
  helpers, appContexts
} from '../../../../config';
import { rootNavigation } from '../../../../navigation';
import styles from './styles';
import ErrorView from '../../generic/errorView';
// import FontIcon from '../../generic/fontIcon/_fontIcon';
import Loading from '../../generic/loading';
import { store } from '../../../../redux/configureStrore';
import ListItem from './listItem';

const { PageContentContext } = appContexts;

class ProductGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      productGroups: [],
    };
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
      this.setState({
        loading: false,
        productGroups
      });
    }
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

        this.setState({
          productGroups,
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

  navigate = (pageId) => {
    const { componentId } = this.context;
    Navigation.push(
      componentId,
      rootNavigation.pageContent({
        passProps: { pageId }
      })
    );
  }

  renderItem = ({ item, index }) => {
    const { layoutType, getSubProductGroups } = this.props;
    const { pageId } = this.context;
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 4, margin: 10 }} />;
    if (!item.texts[0]) return <View />;

    return (
      <ListItem
        layoutType={layoutType}
        productGroupData={item}
        navigate={this.navigate}
        getSubProductGroups={getSubProductGroups}
        textKey={`productGroupOverview-${pageId}-${item.id}-${index}`}
      />
    );
  }

  render() {
    const {
      loading, error, productGroups
    } = this.state;
    // eslint-disable-next-line
    const { moveToTop } = this.props;

    if (loading) return <Loading />;
    if (error) return <ErrorView reloadPage={this.reloadPage} />;

    const arrMod = productGroups.length % 4;
    for (let i = 0; i < arrMod; i += 1) {
      productGroups.push({});
    }

    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          {/* <Text style={styles.heading}>Product Groups:</Text> */}
          <FlatList
            extraData={this.state}
            data={productGroups}
            renderItem={this.renderItem}
            contentContainerStyle={styles.listItemContainer}
            columnWrapperStyle={styles.listItemColContainer}
            keyExtractor={(item, index) => `productGroupOverview_${index}`}
            scrollEnabled={false}
            numColumns={4}
          />
        </View>
        {/* <View style={styles.moveTopWrap}>
          <FontIcon
            type={icons.upArrowNew[1]}
            icon={icons.upArrowNew[0]}
            color={colors.text}
            size={40}
            onPress={() => moveToTop()}
            delayDuration={0}
          />
        </View> */}
      </View>
    );
  }
}

ProductGroup.propTypes = {
  layoutData: PropTypes.objectOf(PropTypes.any).isRequired,
  getProductGroups: PropTypes.func.isRequired,
  moveToTop: PropTypes.func.isRequired
};

ProductGroup.contextType = PageContentContext;
export default ProductGroup;
