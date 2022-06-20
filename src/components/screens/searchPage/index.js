/**
 * @fileoverview This is app's search page component.
 * It renders dynamic search page result
 * @package
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ScrollView,
  Platform,
  UIManager,
  findNodeHandle,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import {
  appConstants,
  globals,
  colors,
  helpers,
  tr
} from '../../../config';
import {
  MainHoc,
  Loading,
  FontIcon,
  Button,
  TouchableDebounce
} from '../../custom';
import { rootNavigation } from '../../../navigation';
import appStyles from '../../../assets/styles/appStyles';
import { searchData, searchSuggestions } from '../../../services';
import styles from './styles';
import TabItems from './tabItems';
import ProductItem from './productItem';
import ContentItem from './contentItem';

const {
  routes,
  searchTabs,
  textCasing,
  firebaseEvents
} = appConstants;

class SearchPage extends Component {
  constructor(props) {
    super(props);

    const { searchText } = this.props;
    this.state = {
      loading: true,
      searchText,
      tabsArr: [],
      activeTab: {},
      searchResult: [],
      hg: {},
      pro: {},
      accessories: {},
      detergents: {},
      content: {},
      resultCount: 0,
      showTooltip: false,
      suggestionsArr: [],
      suggesstionY: 0,
      suggesstionX: 0,
      suggesstionWidth: 100,

      scrollSearchIndicator: new Animated.Value(0),
      scrollWholeHeight: 1,
      scrollVisibleHeight: 0
    };
  }

  componentDidMount() {
    const { setupInnerSearch } = this.props;
    const breadCrumbRef = globals.GET_APP_DATA('breadCrumbRef');
    breadCrumbRef.setBreadcrumbData([]);
    this.searchData();
    setupInnerSearch(this.resetSuggessionsFromHoc);
  }

  searchData = () => {
    this.setState({
      loading: true
    }, async () => {
      await helpers.manualDelay(1000);
      const { searchText } = this.state;
      const { universal } = this.props;

      helpers.analyticsEvent(
        firebaseEvents.SEARCH_RESULT,
        {
          searchText
        },
        universal
      );
      const searchRes = await searchData(searchText);
      const searchKeys = Object.keys(searchRes);

      let obj = {
        hg: {},
        pro: {},
        accessories: {},
        detergents: {},
        content: {},
      };

      let activeTab = {};
      let resultCount = 0;
      const tabsArr = searchTabs.filter((item) => {
        let found = false;
        if (searchKeys.includes(item.key) && searchRes[item.key].doc_count) {
          resultCount += searchRes[item.key].doc_count;
          obj = { ...obj, [item.key]: searchRes[item.key].items.slice(0, 8) };
          found = true;
          if (helpers.isEmptyObject(activeTab)) activeTab = item;
        }
        return found;
      });

      this.setState({
        searchResult: searchRes,
        ...obj,
        tabsArr,
        resultCount,
        activeTab,
        loading: false
      });
    });
  }

  switchTab = (activeTab) => {
    this.setState({ activeTab });
  }

  renderSearchProduct = (key, data) => {
    const { activeTab, searchResult } = this.state;
    const { translations } = this.props;

    const pending = (searchResult[key].items.length - data.length) > 0 ? searchResult[key].items.length - data.length : 0;
    const loadMoreTxt = `${tr(translations, 'load_more', 'Load more')} (${pending})`;
    let resultForTxt = tr(translations, 'results_for', 'results for');
    if (searchResult[key].doc_count === 1) {
      resultForTxt = tr(translations, 'result_for', 'result for');
    }

    const tabObj = searchTabs.find((item) => (item.key === key));

    const arr = data;
    const arrMod = data.length % 4;
    for (let i = 0; i < arrMod; i += 1) {
      arr.push({});
    }

    let tabKey = tabObj.key;
    if (key === 'hg') tabKey = 'home_garden';
    if (key === 'pro') tabKey = 'professional';

    const tabHeading = `${searchResult[key].doc_count} ${resultForTxt} "${tr(translations, tabKey, tabObj.lable, textCasing.U)}"`;
    return (
      <View
        style={{ flex: 1, display: activeTab.key === key ? 'flex' : 'none' }}
        key={`${key}-view`}
      >
        <Text style={styles.tabHeading}>{tabHeading}</Text>
        <FlatList
          extraData={this.state}
          data={arr}
          renderItem={({ item }) => (<ProductItem productData={item._source || {}} translations={translations} />)}
          contentContainerStyle={styles.listItemContainer}
          columnWrapperStyle={styles.listItemColContainer}
          keyExtractor={(item) => `${key}-${item._source ? item._source.id : 'null'}`}
          // scrollEnabled={false}
          numColumns={4}
          ListFooterComponent={() => (
            <Button
              theme="app"
              onPress={() => {
                this.setState({
                  [key]: searchResult[key].items.slice(0, data.length + 8)
                });
              }}
              text={loadMoreTxt}
              style={[styles.loadMoreButton, { display: pending ? 'flex' : 'none' }]}
            />
          )}
        />
      </View>
    );
  }

  renderSearchContent = (key, data) => {
    const { activeTab, searchResult } = this.state;
    const { translations, componentId } = this.props;

    const pending = (searchResult[key].items.length - data.length) > 0 ? searchResult[key].items.length - data.length : 0;
    const loadMoreTxt = `${tr(translations, 'load_more', 'Load more')} (${pending})`;
    let resultForTxt = tr(translations, 'results_for', 'results for');
    if (searchResult[key].doc_count === 1) {
      resultForTxt = tr(translations, 'result_for', 'result for');
    }

    const tabObj = searchTabs.find((item) => (item.key === key));

    const arr = data;
    const arrMod = data.length % 4;
    for (let i = 0; i < arrMod; i += 1) {
      arr.push({});
    }

    let tabHeading = `${searchResult[key].doc_count} ${resultForTxt}`;
    tabHeading += ` "${tr(translations, tabObj.key, tabObj.lable, textCasing.U)}"`;
    return (
      <View
        style={{ flex: 1, display: activeTab.key === key ? 'flex' : 'none' }}
        key={`${key}-view`}
      >
        <Text style={styles.tabHeading}>{tabHeading}</Text>
        <FlatList
          extraData={this.state}
          data={arr}
          renderItem={({ item, index }) => (
            <ContentItem
              contentData={item || {}}
              componentId={componentId}
              index={index}
            />
          )}
          keyExtractor={(item, index) => `${key}-${index}-${item ? item.pageId : 'null'}`}
          ListFooterComponent={() => (
            <Button
              theme="app"
              onPress={() => {
                this.setState({
                  [key]: searchResult[key].items.slice(0, data.length + 8)
                });
              }}
              text={loadMoreTxt}
              style={[styles.loadMoreButton, { display: pending ? 'flex' : 'none' }]}
            />
          )}
        />
      </View>
    );
  }

  renderSearchTabWrap = () => {
    const {
      activeTab,
      hg,
      pro,
      accessories,
      detergents,
      content
    } = this.state;

    if (helpers.isEmptyObject(activeTab)) return null;

    return (
      <View style={{ flex: 1 }}>
        {
          helpers.isEmptyObject(hg)
            ? null
            : this.renderSearchProduct('hg', hg)
        }
        {
          helpers.isEmptyObject(pro)
            ? null
            : this.renderSearchProduct('pro', pro)
        }
        {
          helpers.isEmptyObject(accessories)
            ? null
            : this.renderSearchProduct('accessories', accessories)
        }
        {
          helpers.isEmptyObject(detergents)
            ? null
            : this.renderSearchProduct('detergents', detergents)
        }
        {
          helpers.isEmptyObject(content)
            ? null
            : this.renderSearchContent('content', content)
        }
      </View>
    );
  }

  searchHandler = () => {
    const { loading } = this.state;
    if (loading) return null;

    return (
      <View style={styles.searchContainer}>
        {this.renderSearchTabWrap()}
      </View>
    );
  }

  setupSuggesstions = (suggestionsArr) => {
    const { showHeaderOverlay } = this.props;
    this.setState({
      suggestionsArr,
      showTooltip: true
    }, () => {
      showHeaderOverlay();
    });
  }

  resetSuggessions = () => {
    const { resetHeaderOverlay } = this.props;
    this.setState({
      suggestionsArr: [],
      showTooltip: false
    }, () => {
      resetHeaderOverlay();
    });
  }

  resetSuggessionsFromHoc = () => {
    this.setState({
      suggestionsArr: [],
      showTooltip: false
    });
  }

  autoCompleteInit = async (searchText) => {
    const isNetConnected = await helpers.isNetConnected();
    UIManager.measure(findNodeHandle(this.inputWrapRef), (x, y, width, height, pageX) => {
      this.setState({
        suggesstionY: (Platform.OS === 'ios' ? y : 35) + height + 2,
        suggesstionX: Platform.OS === 'ios' ? x : pageX,
        suggesstionWidth: width
      });
    });
    this.resetSuggessions();
    this.setState({
      searchText
    }, async () => {
      if (!isNetConnected) return;
      const suggestions = await searchSuggestions(searchText);
      if (suggestions.length > 0) {
        this.setupSuggesstions(suggestions);
      }
    });
  }

  renderSuggesstionItem = (item) => {
    const { resetHeaderOverlay } = this.props;

    if (!item._source || !item._source.name) return null;

    const handleTap = () => {
      this.setState({
        showTooltip: false,
        suggestionsArr: [],
        searchText: item._source.name
      }, () => {
        // this.searchData();
        this.navigateToProduct(item._source.id);
        resetHeaderOverlay();
      });
    };

    return (
      <TouchableDebounce
        onPress={handleTap}
        style={styles.tooltipItem}
        key={`suggessionTooltip-${helpers.strToKey(item._source.name)}`}
      >
        <Text style={styles.tooltipTxt}>{item._source.name}</Text>
      </TouchableDebounce>
    );
  }

  renderSuggesstion = () => {
    const {
      showTooltip,
      suggestionsArr,
      suggesstionY,
      suggesstionX,
      suggesstionWidth,
      scrollVisibleHeight,
      scrollWholeHeight,
      scrollSearchIndicator
    } = this.state;

    if (!showTooltip) return null;

    const indicatorSize = scrollWholeHeight > scrollVisibleHeight
      // eslint-disable-next-line
      ? scrollVisibleHeight * scrollVisibleHeight / scrollWholeHeight
      : scrollVisibleHeight;

    const difference = scrollVisibleHeight > indicatorSize ? scrollVisibleHeight - indicatorSize : 1;

    const arr = suggestionsArr.slice(0, 10);
    return (
      <View style={[
        styles.suggesstionWrapInner,
        {
          top: suggesstionY,
          left: suggesstionX,
          width: suggesstionWidth
        }
      ]}
      >
        <ScrollView
          style={{}}
          contentContainerStyle={{}}

          showsVerticalScrollIndicator={false}
          onContentSizeChange={(width, height) => {
            this.setState({ scrollWholeHeight: height });
          }}
          onLayout={({
            nativeEvent: {
              layout: {
                height // x, y, width,
              }
            }
          }) => this.setState({ scrollVisibleHeight: height })}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollSearchIndicator } } }]
          )}
        >
          {arr.map((item) => this.renderSuggesstionItem(item))}
        </ScrollView>
        <Animated.View
          style={[
            {
              width: 4,
              backgroundColor: '#61616182',
              position: 'absolute',
              right: 0,
              top: 0
            }, {
              height: indicatorSize,
              transform: [{
                translateY: Animated.multiply(scrollSearchIndicator, scrollVisibleHeight / scrollWholeHeight).interpolate({
                  inputRange: [0, difference],
                  outputRange: [0, difference],
                  extrapolate: 'clamp'
                })
              }]
            }]}
        />
      </View>
    );
  }

  navigateToProduct = (pageId) => {
    const { componentId } = this.props;
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

  render() {
    const {
      loading,
      tabsArr,
      activeTab,
      resultCount,
      searchText
    } = this.state;
    const { translations } = this.props;
    helpers.pageInfoAnalytics({ pageState: 'search_result', pageName: { 'pg.ost': searchText, 'pg.osr': resultCount } });
    let result_for = tr(translations, 'results_for', 'RESULTS FOR', textCasing.U);
    if (resultCount <= 1) {
      result_for = tr(translations, 'result_for', 'RESULT FOR', textCasing.U);
    }

    const autoCompleteInit = _.debounce(this.autoCompleteInit, 500);
    return (
      <View
        style={styles.wrap}
        onStartShouldSetResponder={(evt) => {
          evt.persist();
          this.resetSuggessions();
        }}
      >
        <View
          style={[styles.searchWrap, { backgroundColor: loading ? colors.bg : '#fff' }]}
          ref={(ref) => { this.inputWrapRef = ref; }}
        >
          <TextInput
            placeholderTextColor="#989898"
            placeholder={tr(translations, 'search_for_product_or_keyword', 'Search For Product or Keyword')}
            onChangeText={autoCompleteInit}
            // value={searchText}
            style={styles.searchInput}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onSubmitEditing={this.searchData}
            editable={!loading}
          />
          <FontIcon
            type="EvilIcons"
            icon="search"
            color={colors.borderColor}
            size={25}
            onPress={this.searchData}
          />
        </View>
        {this.renderSuggesstion()}
        {
          loading ? null : (
            <Text style={[appStyles.heading, styles.header]}>
              {`${resultCount} ${result_for} "${searchText}"`}
            </Text>
          )
        }
        <TabItems
          tabs={tabsArr}
          activeNav={activeTab}
          switchTab={this.switchTab}
          loading={loading}
          translations={translations}
        />
        <View style={{ flex: 1 }}>
          {loading ? <Loading /> : this.searchHandler()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  universal: state.universal,
  translations: state.translations.arr
});
const mapDispatchToProps = () => ({});
const SearchPageRedux = connect(mapStateToProps, mapDispatchToProps)(SearchPage);
export default MainHoc({
  screen: routes.SEARCH_PAGE,
  breadCrumb: true
})(SearchPageRedux);
