import React, { Component } from 'react';
import {
  View, FlatList, Image, Text, Dimensions, UIManager,
  findNodeHandle
} from 'react-native';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { Navigation } from 'react-native-navigation';
import RangeSlider from 'rn-range-slider';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollIntoView, wrapScrollViewConfigured } from 'react-native-scroll-into-view';
import { Tooltip } from 'react-native-elements';
import { productFinder as getProductFinderDetails, toggleProductCompare as switchToggleProductCompare } from '../../../redux/actions';
import {
  MainHoc,
  Loading,
  FontIcon,
  Button,
  TouchableDebounce, DcaImage, HtmlParser, ErrorView, LayoutManager
} from '../../custom';
import RangeItem from '../../custom/layoutManager/productList/filter/rangeItem';
import SelectedFilter from '../../custom/layoutManager/productList/filter/selectedFilter';
import ListItem from '../../custom/layoutManager/productList/listItem';
import CheckboxFilter from './checkboxFilter';
import {
  appConstants,
  globals,
  colors,
  helpers,
  fonts,
  tr,
  appStyles, icons, appContexts, images
} from '../../../config';
import WebView from 'react-native-webview';
import styles from './styles';

const {
  routes,
  searchTabs,
  textCasing,
  firebaseEvents
} = appConstants;
const { height, width } = Dimensions.get('window');
const { PageContentContext } = appContexts;
let productDetailsNavigationData = [];
let valueInput;

class ProductFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.rangeSliderRef = {};
    this.checkboxGroupRef = null;
    this.scrollY = 0;
    this.commandListener = Navigation.events().registerCommandListener((name, params) => {
      this.handlingApiData();
      //  this.getProductFinderGroups(selectedMultipleAnswer ? selectedMultipleAnswer : this.props.productFinderReducer.arr && this.props.productFinderReducer.arr.questions);
      // this.setState({})
    });
  }

  componentDidMount() {
    const env_Status = helpers.getAppEnv().replace(/[()]/g, '').trim();
    if (env_Status === 'Dev' || env_Status === 'Stage') {

    } else {
      this.initPageContent();

      // this.getProductFinderGroups();

      this.handlingApiData('initalChecking');
      // this.getProductFinderGroups(this.props.productFinderReducer.arr && this.props.productFinderReducer.arr.questions);

      // const breadCrumbRef = globals.GET_APP_DATA('breadCrumbRef');
      // console.log("breadCrumbRef in product finder page", breadCrumbRef)
      // breadCrumbRef.setBreadcrumbData([]);
    }
  }

  componentWillUnmount() {
    this.commandListener.remove();
  }

  handlingApiData(status) {
    ;
    if (status === 'initalChecking') {
      this.getProductFinderGroups(this.props.productFinderReducer.arr && this.props.productFinderReducer.arr.questions[0]);
    } else {
      if (this.props.productFinderReducer.arr.length === 0 || this.props.productFinderReducer.arr && this.props.productFinderReducer.arr.questions.length === 1) {
        if (productDetailsNavigationData.length) {
          this.getProductFinderGroups(productDetailsNavigationData);
        } else {
          this.getProductFinderGroups(this.props.productFinderGroupData.productFinderApiData && this.props.productFinderGroupData.productFinderApiData.questions[0]);
        }
      }
      // this.getProductFinderGroups(productDetailsNavigationData?productDetailsNavigationData:this.props.productFinderReducer.arr && this.props.productFinderReducer.arr.questions);
    }
  }

  getProductFinderGroups = async (selectedAnswer) => {
    try {
      const { productFinder } = this.props;
      await productFinder(selectedAnswer).then(() => {
      }).catch(() => {
      });
    } catch (err) {
    }
  }

  initPageContent = async () => {
    const {
      toggleProductCompare,
      productCompare,
    } = this.props;
    if (!productCompare.length) await toggleProductCompare();
  }

  selectedAnswer = (value, index, data, productFinderReducer) => {
    const productGroupFilterData = productFinderReducer;
    const selectedAnswer = [];
    productGroupFilterData.arr.questions[0].Answer = [value];
    selectedAnswer.push(productFinderReducer.arr.questions && productFinderReducer.arr.questions[0]);
    this.getProductFinderGroups(selectedAnswer);
  }

  selectedMultipleAnswer = (value, data, productFinderReducer, selectedIndex, slider, selectedItem) => {
    const filterOptionData = productFinderReducer;
    let selectedValue;
    let selectedMultipleAnswer = [];
    selectedValue = selectedItem && selectedItem.length ? selectedItem : null;
    productFinderReducer.arr && productFinderReducer.arr.questions.forEach((item, index) => {
      if (selectedIndex === index) {
        if (selectedIndex === 0) {
          this.selectedAnswer(value, index, data, productFinderReducer);
        } else {
          filterOptionData.arr.questions[selectedIndex].Answer = selectedValue || null;
          // productFinderReducer.arr.questions[selectedIndex].Answer = selectedValue || null;
          selectedMultipleAnswer = productFinderReducer.arr && productFinderReducer.arr.questions;
          productDetailsNavigationData = selectedMultipleAnswer;
          this.getProductFinderGroups(selectedMultipleAnswer);
        }
      }
    });
  }

  selectedSlider = (low, high, productFinderReducer, index, status) => {
    valueInput = low;
  }

  setRangeRef = (key, ref) => {
    this.rangeSliderRef[key] = ref;
  }

  selectFilter = (initialLowValue, initialHighValue, key, unit) => {

  }

  renderDropdown = (selectedAnswer) => {
    let label;
    label = selectedAnswer && selectedAnswer.Answer && selectedAnswer.Answer[0].value;
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.black,
        ...appStyles.padH(15),
        ...appStyles.padV(10),
        ...appStyles.mgB(15)
      }}
      >
        <Text style={{ fontSize: 13, }}>{typeof label === 'object' || typeof selectedAnswer === 'undefined' ? 'Please select' : label}</Text>
        <FontIcon
          type={icons.arrow_down[1]}
          icon={icons.arrow_down[0]}
          color={colors.icons}
          size={10}
        />
      </View>
    );
  }

  renderItem = ({ item, index }) => {
    const synchroniseData = {
      filterValues: '[]',
      images: [{
        urls: [
          {
            type: item.name,
            url: item.image
          },
          {
            type: item.name,
            url: item.image
          },
          {
            type: item.name,
            url: item.image
          },
          {
            type: item.name,
            url: item.image
          },
          {
            type: item.name,
            url: item.image
          },
        ]
      }],
      name: item.name,
      price: null,
      texts: [{
        type: 'short',
        value: item.text
      },
      {
        type: 'long',
        value: item.text
      }],
      id: item.pageID

    };
    const {
      componentId, translations, productCompare, getCompareModalRef, toggleLoader, toggleProductCompare
    } = this.props;
    return (
      <ListItem
        productData={synchroniseData}
        textKey={`productList-${index}-${item.id}`}
        componentId={componentId}
        translations={translations}
        productCompare={productCompare}
        getCompareModalRef={getCompareModalRef}
        toggleLoader={toggleLoader}
        toggleProductCompare={toggleProductCompare}
        productId={(id) => this.productId(id)}
      // refreshingFilterFlag={(status) => { console.log('status checking of list item ====>', status); }}
      />
    );
  }

  productId(id) {
    let productId;
    productId = id;
  }

  renderCheckBoxGroup = (item, index, productFinderReducer, translations, TranslationIdExplaination) => (
    <View style={{}}>
      <CheckboxFilter
        item={item}
        index={index}
        TranslationIdExplaination={TranslationIdExplaination}
        productFinderReducer={productFinderReducer}
        selectedMultipleAnswers={(value, data, productFinderReducerData, selectedIndex, slider, selectedItem) => this.selectedMultipleAnswer(value, data, productFinderReducerData, selectedIndex, slider, selectedItem)}
        translations={translations}
      />
    </View>
  )

  renderSelectedFilterItem = (selectedFilterItem, selectedFilterIndex) => (
    <View
      key={selectedFilterItem.Translation_ID}
      style={{
        borderWidth: 1, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center', paddingHorizontal: '1%'
      }}
    >
      <Text style={{ fontSize: 14, ...fonts.banner }}>{selectedFilterItem.value}</Text>
    </View>
  )

  resetFilter = async (filterData) => {
    const { productFinderReducer } = this.props;
    const alterFilterData = [];
    await filterData.selectedFiltersArr.Answer.forEach((compareData) => {
      if (compareData.Translation_ID === filterData.item.Translation_ID) {
        if (alterFilterData && !alterFilterData.length) {
          this.selectedMultipleAnswer(null, filterData.index, productFinderReducer, filterData.selectedFiltersIndex, null, null);
        }
      } else {
        alterFilterData.push(compareData);
        this.selectedMultipleAnswer(null, filterData.index, productFinderReducer, filterData.selectedFiltersIndex, null, alterFilterData);
      }
    });
  }

  sliderDragsComplete(productFinderReducer, index, status) {
    this.selectedMultipleAnswer(null, null, productFinderReducer, index, status, [{ value: valueInput && valueInput.toString() }]);
  }

  render() {
    const {
      productFinderReducer, pageId, translations, componentId, universal, productCompare
    } = this.props;
    const env_Status = helpers.getAppEnv().replace(/[()]/g, '').trim();

    if (productFinderReducer.loading) {
      return <Loading />;
    }
    if (productFinderReducer.error) {
      return (
        <View style={{ flex: 1 }}>
          <ErrorView reloadPage={this.getUserToken} />
        </View>
      );
    }
    return (

      <View style={styles.wrap}>
        {
          env_Status === 'Dev' || env_Status === 'Stage' ?
            <View style={styles.productFilterWrap}>

              <View style={styles.productFilterHeaderWrap}>
                <Text style={{ fontSize: 27, ...fonts.banner }}>PRODUCT FINDER</Text>
              </View>
              <View style={styles.productFilterFooterWrap}>
                <WebView
                  scalesPageToFit={true}
                  source={{ uri: 'https://tiger-cdn.zoovu.com/advisor-fe-web/api/v1/advisors/SdTZMDDc/iframe-loader?locale=de-DE' }}

                />
              </View>

            </View>
            :
            productFinderReducer.arr && productFinderReducer.arr.questions && productFinderReducer.arr.questions.length > 1
              ? (
                <View style={styles.productFilterWrap}>

                  <View style={styles.productFilterHeaderWrap}>
                    <Text style={{ fontSize: 27, ...fonts.banner }}>PRODUCT FINDER</Text>
                  </View>
                  {
                    // productFinderReducer.arr.questions[1].Answer &&
                    <View style={styles.productMySelectedFilterWrap}>
                      <ScrollView horizontal>
                        {
                          productFinderReducer.arr.questions.map((filterItem, filterIndex) => (
                            filterItem.QuestionNode !== 'ProductGroup'
                            && (
                              <SelectedFilter
                                selectedFiltersArr={filterItem}
                                selectedFiltersIndex={filterIndex}
                                filtersArr={productFinderReducer.arr.questions}
                                translations={translations}
                                status="productFinder"
                                resetFilter={this.resetFilter}
                              />
                            )
                          ))
                        }
                      </ScrollView>
                    </View>
                  }

                  <View style={styles.productFilterFooterWrap}>

                    <View style={styles.filterListWrap}>
                      <ScrollView contentContainerStyle={{}}>
                        {
                          productFinderReducer.arr && productFinderReducer.arr.questions.map((item, index) => {
                            const TranslationIdExplaination = item.Explanation && item.Explanation.Translation_ID ? item.Explanation.Translation_ID : 'not_foundTranslation';

                            valueInput = item.Minimum && item.Maximum
                              ? productFinderReducer.arr.questions[index].Answer ? parseInt(productFinderReducer.arr.questions[index].Answer[0].value)
                                : item.Minimum : item.Minimum;

                            return (
                              // item.Type === 'distinct' || item.Type === 'interval'
                              //   ?
                              item.QuestionNode === 'ProductGroup'
                                ? null
                                : (
                                  <View>

                                    {this.renderCheckBoxGroup(item, index, productFinderReducer, translations, TranslationIdExplaination)}


                                  </View>
                                )
                            );
                          })
                        }

                      </ScrollView>
                    </View>
                    <View style={styles.productResultWrap}>
                      {
                        productFinderReducer.arr && productFinderReducer.arr.products.length && productFinderReducer.arr.products.length > 0 ?
                          <FlatList
                            extraData={productCompare}
                            data={productFinderReducer.arr && productFinderReducer.arr.products}
                            renderItem={this.renderItem}
                            contentContainerStyle={{ justifyContent: 'flex-start' }}
                            // columnWrapperStyle={{ justifyContent: 'space-between' }}
                            keyExtractor={(item) => `group_${item.id}`}
                            // scrollEnabled={false}
                            numColumns={4}
                          />
                          :
                          <View style={styles.errorWrapper}>
                            <Text style={styles.errorTextStyle}>
                              {tr(translations, 'INFO_NO_RESULTS_FOUND', 'INFO_NO_RESULTS_FOUND', 'upper')}
                            </Text>
                          </View>
                      }
                    </View>
                  </View>

                </View>
              )
              : null

        }
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  productFinderReducer: state.productFinderReducer,
  translations: state.translations.arr,
  productCompare: state.productCompare,
  universal: state.universal
});
const mapDispatchToProps = (dispatch) => ({
  productFinder: (selectedAnswer) => getProductFinderDetails(dispatch, selectedAnswer),
  toggleProductCompare: (productId) => switchToggleProductCompare(dispatch, productId)
});
const ProductFinderRedux = connect(mapStateToProps, mapDispatchToProps)(ProductFinder);
export default MainHoc({
  screen: routes.PRODUCTFINDER,
  breadCrumb: true
})(ProductFinderRedux);
