import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import {
  appContexts,
  helpers,
  appConstants,
  icons,
  colors,
  tr
} from '../../../../config';
import {
  Button,
  SectionHeader,
  FontIcon,
  HtmlParser
} from '../../generic';
import styles from './styles';
import ListItem from './listItem';
import { sortStringsInAscendingOrder } from '../../../../config/libs/helpers';

const { productDetailsDataSequence, textCasing } = appConstants;
const { PageContentContext } = appContexts;
let standardOptionalData = [];

class Accessories extends Component {
  constructor(props, context) {
    super(props);
    const { layoutData, productDetailsObj, type } = this.props;
    const isAcc = type === productDetailsDataSequence.ACCESSORIES;
    this.state = {
      layoutData,
      productsArr: [],
      filteredProductsArr: [],
      categoryArr: [],
      categoryProductIds: isAcc ? productDetailsObj.acc_categories.map : productDetailsObj.det_categories.map,
      selectedFilter: { id: null, title: 'Please Select' },
      offset: 0,
      numOfItemsToLoad: 12,
      standardOptionalArr: [
        {
          id: 1,
          title: 'Standard/Optional',
          translationKey: tr(context.translations, 'standard_optional_accessories', 'Standard/Optional')
        },
        {
          id: 2,
          title: 'Standard',
          translationKey: tr(context.translations, 'standard_accessories', 'Standard')
        },
        {
          id: 3,
          title: 'Optional',
          translationKey: tr(context.translations, 'optional_accessories', 'Optional')
        },
      ],
      standardOptionalStatus: {
        id: 1,
        title: 'Standard/Optional',
        translationKey: tr(context.translations, 'standard_optional_accessories', 'Standard/Optional')
      },
    };
  }

  componentDidMount() {
    const { productDetailsObj, type } = this.props;
    const { translations } = this.context;

    const isAcc = type === productDetailsDataSequence.ACCESSORIES;

    let catagoryArr = isAcc ? productDetailsObj.acc_categories.accCategories : productDetailsObj.det_categories.detCategories;

    catagoryArr = sortStringsInAscendingOrder(catagoryArr, 'title');

    this.setState({
      categoryArr: [{ id: null, title: tr(translations, 'please_select', 'Please Select') }, ...catagoryArr],
      categoryProductIds: isAcc ? productDetailsObj.acc_categories.map : productDetailsObj.det_categories.map,
      selectedFilter: { id: null, title: tr(translations, 'please_select', 'Please Select') }
    }, () => {
      this.getProductDetailsData(true);
    });
  }

  getProductDetailsData = (isInitialLoad) => {
    const {
      layoutData, productsArr, offset, selectedFilter, filteredProductsArr, numOfItemsToLoad
    } = this.state;
    let productChunk = [];
    const offsetToAdd = isInitialLoad ? 4 : numOfItemsToLoad;
    if (selectedFilter.id) {
      productChunk = filteredProductsArr.slice(offset, offset + offsetToAdd);
    } else {
      productChunk = layoutData.slice(offset, offset + offsetToAdd);
    }
    standardOptionalData = [...productsArr, ...productChunk];

    this.setState({
      productsArr: [...productsArr, ...productChunk],
      offset: offset + offsetToAdd,
    });
  }

  renderProduct = ({ item }) => {
    const { translations } = this.context;
    if (helpers.isEmptyObject(item)) return <View style={{ flex: 1 / 4, margin: 10 }} />;
    const { pageId } = this.context;
    const { type } = this.props;
    return (
      <ListItem
        productData={item}
        textKey={`accessories-${pageId}-${type}-${item.id}`}
        translations={translations}
        standardOptionalStatus={this.state.standardOptionalStatus}
      />
    );
  }

  filterProduct = (index, data, status) => {
    if (status === 'standardOptional') {
      this.setState({ standardOptionalStatus: data[index] });
    } else {
      const { categoryProductIds, layoutData } = this.state;
      const selectedFilter = data[index];
      let filteredProductsArr = [];
      if (selectedFilter.id) {
        filteredProductsArr = layoutData.filter((item) => (categoryProductIds[selectedFilter.id].indexOf(item.id) !== -1));
      }

      this.setState({
        offset: 0,
        selectedFilter,
        productsArr: [],
        filteredProductsArr
      }, () => {
        this.getProductDetailsData();
      });
    }
  }

  renderDropdown = (data, status) => {
    const { type } = this.props;
    const { pageId } = this.context;
    return (
      <View style={styles.dropdown}>
        <HtmlParser
          html={status === 'standardOptional' ? data.translationKey : data.title}
          textKey={`accessories-dropdown-${pageId}-${type}`}
          style={styles.dropdownlbl}
        />
        <FontIcon
          type={icons.arrow_down[1]}
          icon={icons.arrow_down[0]}
          color={colors.icons}
          size={7}
        />
      </View>
    );
  }


  render() {
    const {
      layoutData,
      offset,
      filteredProductsArr,
      selectedFilter,
      productsArr, standardOptionalArr, standardOptionalStatus
    } = this.state;
    const { type } = this.props;
    const { categoryArr, numOfItemsToLoad } = this.state;
    const { translations } = this.context;
    const standardFilterArr = [];
    const OptionalFilterArr = [];
    selectedFilter.id ? standardOptionalData.forEach((item) => {
      if (item.isStandardAccessory === true) {
        standardFilterArr.push(item);
      }
      if (item.isStandardAccessory === false) {
        OptionalFilterArr.push(item);
      }
    })
      : layoutData.forEach((item) => {
        if (item.isStandardAccessory === true) {
          standardFilterArr.push(item);
        }
        if (item.isStandardAccessory === false) {
          OptionalFilterArr.push(item);
        }
      });

    const heading = type === productDetailsDataSequence.ACCESSORIES
      ? tr(translations, 'accessories', 'ACCESSORIES', textCasing.U)
      : tr(translations, 'cleaning_agents', 'CLEANING AGENTS', textCasing.U);
    const productLeft = standardOptionalStatus && standardOptionalStatus.title === 'Standard' ? (standardFilterArr.length - offset) <= 0 ? 0 : standardFilterArr.length - offset
      : (layoutData.length - offset) <= 0 ? 0 : layoutData.length - offset;
    const filteredProductLeft = (filteredProductsArr.length - offset) <= 0 ? 0 : filteredProductsArr.length - offset;
    const remaining = selectedFilter.id ? filteredProductLeft : productLeft;
    const showMoreTxt = `${tr(translations, 'show_more', 'SHOW MORE', textCasing.U)} ${heading} (${remaining} ${tr(translations, 'product_left', 'PRODUCTS LEFT', textCasing.U)})`;

    let arr = standardOptionalStatus && standardOptionalStatus.title === 'Standard' ? standardFilterArr : standardOptionalStatus && standardOptionalStatus.title === 'Optional' ? OptionalFilterArr : productsArr;

    const arrMod = arr.length % numOfItemsToLoad;
    for (let i = 0; i < arrMod; i += 1) {
      arr = [...arr, {}];
    }

    return (
      <View style={styles.wrap}>
        <SectionHeader heading={heading} />
        <View style={styles.dropdownItem}>
          <Dropdown
            data={categoryArr}
            valueExtractor={({ title }) => title}
            renderBase={() => this.renderDropdown(selectedFilter)}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            onChangeText={(value, index, data) => this.filterProduct(index, data)}
            itemCount={6}
          />
          {type === productDetailsDataSequence.ACCESSORIES
            && (
              <Dropdown
                data={standardOptionalArr}
                valueExtractor={({ translationKey }) => translationKey}
                renderBase={() => this.renderDropdown(standardOptionalStatus, 'standardOptional')}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                onChangeText={(value, index, data) => this.filterProduct(index, data, 'standardOptional')}
              />
            )}
        </View>
        <FlatList
          extraData={this.state}
          data={arr}
          renderItem={this.renderProduct}
          contentContainerStyle={styles.listItemContainer}
          columnWrapperStyle={styles.listItemColContainer}
          keyExtractor={(item) => `group_${item.id}_${selectedFilter.id}`}
          scrollEnabled={false}
          numColumns={4}
        />
        {
          remaining > 0 && standardOptionalStatus.title !== 'Optional' ? (
            <Button
              onPress={() => this.getProductDetailsData()}
              text={showMoreTxt}
              theme="app"
              dcaTest="showMore"
            />
          ) : null
        }
      </View>
    );
  }
}

Accessories.contextType = PageContentContext;
export default Accessories;
