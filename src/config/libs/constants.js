/**
 * @fileoverview All the constants used in aplication are retuned
 * from this config file
 * @package
 */
import { Dimensions } from 'react-native';
import screenTexts from './screenTexts';

/** All constants in application */
export default {
  /** Schemas for realm database */
  schemas: {
    ROOT_PAGE_META: 'rootPageMeta',
    COUNTRY_SCHEMA: 'country',
    ACTIVE_LANGUAGE: 'activeLanguage',
    PAGE_DATA: 'pageData',
    PAGE_CONTENT: 'pageContent',
    PRODUCT_GROUP: 'productGroup',
    PRODUCT_GROUP_LIST: 'productGroupList',
    SUB_PRODUCT_GROUP_META: 'subProductGroupMeta',
    SUB_PRODUCT_GROUP_LIST: 'subProductGroupList',
    PRODUCT_LIST: 'productList',
    PRODUCT_DETAILS: 'productDetails',
    PRODUCT_RECOMMENDATIONS: 'productRecommendations',
    PRODUCT_RECOMMENDATIONS_LIST: 'productRecommendationsList',
    DAILY_API_CHECK: 'dailyApiCheck',
    STRUCTURE: 'structure',
    FAVOURITE_FOLDER: 'favouriteFolder',
    FAVOURITE_CONTENT: 'favouriteContent',
    TRANSLATION: 'translation',
    PRODUCT_COMPARE: 'productCompare',
    TEXT_MARKING: 'textMarking',
    OFFLINE_DOWNLOAD: 'offlineDownload',
    UNIVERSAL: 'universal',
    MEDIA_URL: 'mediaUrl',
  },
  /** Route names for react-native-navigation */
  routes: {
    LANDING_PAGE: 'landingPage',
    HOME: 'Home',
    PAGE_CONTENT: 'pageContent',
    PRODUCT_GROUP_CATAGORY: 'productGroupCatagory',
    SETTINGS: 'settings',
    FAVOURITE: 'favourite',
    PRODUCT_COMPARE: 'productCompare',
    SEARCH_PAGE: 'searchPage',
    PRODUCTFINDER: 'productFinder'
  },
  reduxConst: {
    COUNTRIES_GET: 'COUNTRIES_GET',
    COUNTRIES_GET_SUCCESS: 'COUNTRIES_GET_SUCCESS',
    COUNTRIES_GET_ERROR: 'COUNTRIES_GET_ERROR',
    COUNTRIES_GET_LOADING: 'COUNTRIES_GET_LOADING',

    PRODUCT_FINDER_GET: 'PRODUCT_FINDER_GET',
    PRODUCT_FINDER_GET_SUCCESS: 'PRODUCT_FINDER_GET_SUCCESS',
    PRODUCT_FINDER_GET_ERROR: 'PRODUCT_FINDER_GET_ERROR',
    PRODUCT_FINDER_GET_LOADING: 'PRODUCT_FINDER_GET_LOADING',

    PAGE_DATA_GET: 'PAGE_DATA_GET',
    PAGE_DATA_GET_SUCCESS: 'PAGE_DATA_GET_SUCCESS',
    PAGE_DATA_GET_ERROR: 'PAGE_DATA_GET_ERROR',
    PAGE_DATA_GET_LOADING: 'PAGE_DATA_GET_LOADING',

    PRODUCT_GROUPS_GET: 'PRODUCT_GROUPS_GET',
    PRODUCT_GROUPS_GET_SUCCESS: 'PRODUCT_GROUPS_GET_SUCCESS',
    PRODUCT_GROUPS_GET_ERROR: 'PRODUCT_GROUPS_GET_ERROR',
    PRODUCT_GROUPS_GET_LOADING: 'PRODUCT_GROUPS_GET_LOADING',

    SUB_PRODUCT_GROUPS_GET: 'SUB_PRODUCT_GROUPS_GET',
    SUB_PRODUCT_GROUPS_ARR_GET: 'SUB_PRODUCT_GROUPS_ARR_GET',
    SUB_PRODUCT_GROUPS_GET_SUCCESS: 'SUB_PRODUCT_GROUPS_GET_SUCCESS',
    SUB_PRODUCT_GROUPS_GET_ARR_SUCCESS: 'SUB_PRODUCT_GROUPS_GET_ARR_SUCCESS',
    SUB_PRODUCT_GROUPS_GET_ERROR: 'SUB_PRODUCT_GROUPS_GET_ERROR',
    SUB_PRODUCT_GROUPS_GET_ARR_ERROR: 'SUB_PRODUCT_GROUPS_GET_ARR_ERROR',
    SUB_PRODUCT_GROUPS_GET_LOADING: 'SUB_PRODUCT_GROUPS_GET_LOADING',
    SUB_PRODUCT_GROUPS_GET_ARR_LOADING: 'SUB_PRODUCT_GROUPS_GET_ARR_LOADING',

    PRODUCT_LIST_GET: 'PRODUCT_LIST_GET',
    PRODUCT_LIST_GET_SUCCESS: 'PRODUCT_LIST_GET_SUCCESS',
    PRODUCT_LIST_GET_ERROR: 'PRODUCT_LIST_GET_ERROR',
    PRODUCT_LIST_GET_LOADING: 'PRODUCT_LIST_GET_LOADING',

    PRODUCT_DETAILS_GET: 'PRODUCT_DETAILS_GET',
    PRODUCT_DETAILS_GET_SUCCESS: 'PRODUCT_DETAILS_GET_SUCCESS',
    PRODUCT_DETAILS_GET_ERROR: 'PRODUCT_DETAILS_GET_ERROR',
    PRODUCT_DETAILS_GET_LOADING: 'PRODUCT_DETAILS_GET_LOADING',

    FAVOURITE_GET: 'FAVOURITE_GET',
    FAVOURITE_CONTENT_SAVE: 'FAVOURITE_CONTENT_SAVE',
    FAVOURITE_CONTENT_EDIT: 'FAVOURITE_CONTENT_EDIT',
    FAVOURITE_FOLDER_EDIT: 'FAVOURITE_FOLDER_EDIT',
    FAVOURITE_CONTENT_DELETE: 'FAVOURITE_CONTENT_DELETE',
    FAVOURITE_FOLDER_DELETE: 'FAVOURITE_FOLDER_DELETE',
    FAVOURITE_FOLDER_SAVE: 'FAVOURITE_FOLDER_SAVE',
    FAVOURITE_FOLDER_DUPLICATE: 'FAVOURITE_FOLDER_DUPLICATE',
    FAVOURITE_SET: 'FAVOURITE_SET',
    FAVOURITE_LIST_SET: 'FAVOURITE_LIST_SET',
    UPDATE_FAVOURITE_POSITION: 'UPDATE_FAVOURITE_POSITION',
    FAVOURITE_LOADING: 'FAVOURITE_LOADING',
    RESET_APP_FAVOURITE: 'RESET_APP_FAVOURITE',

    PRODUCT_COMPARE_TOGGLE_INIT: 'PRODUCT_COMPARE_TOGGLE_INIT',
    PRODUCT_COMPARE_TOGGLE: 'PRODUCT_COMPARE_TOGGLE',
    REPLACE_PRODUCT_COMPARE_DATA: 'REPLACE_PRODUCT_COMPARE_DATA',

    TRANSLATION_DATA_GET_INIT: 'TRANSLATION_DATA_GET_INIT',
    TRANSLATION_DATA_SUCCESS: 'TRANSLATION_DATA_SUCCESS',
    TRANSLATION_DATA_ERROR: 'TRANSLATION_DATA_ERROR',
    TRANSLATION_DATA_LOADING: 'TRANSLATION_DATA_LOADING',

    STRUCTURE_LIST_SET_INIT: 'STRUCTURE_LIST_SET_INIT',
    STRUCTURE_LIST_SET: 'STRUCTURE_LIST_SET',

    MARKING_DATA_SET_INIT: 'MARKING_DATA_SET_INIT',
    MARKING_DATA_SET: 'MARKING_DATA_SET',
    MARKING_DATA_SAVE_INIT: 'MARKING_DATA_SAVE_INIT',
    MARKING_DATA_DELETE_INIT: 'MARKING_DATA_DELETE_INIT',

    OFFLINE_DOWNLOAD_GET_INIT: 'OFFLINE_DOWNLOAD_GET_INIT',
    OFFLINE_DOWNLOAD_SET: 'OFFLINE_DOWNLOAD_SET',
    OFFLINE_DOWNLOAD_SAVE_INIT: 'OFFLINE_DOWNLOAD_SAVE_INIT',
    OFFLINE_DOWNLOAD_RESET_INIT: 'OFFLINE_DOWNLOAD_RESET_INIT',
    OFFLINE_DOWNLOAD_RESET: 'OFFLINE_DOWNLOAD_RESET',

    MEDIA_URL_GET_INIT: 'MEDIA_URL_GET_INIT',
    MEDIA_URL_GET: 'MEDIA_URL_GET',
    MEDIA_URL_SAVE_INIT: 'MEDIA_URL_SAVE_INIT',
    MEDIA_URL_LOADING: 'MEDIA_URL_LOADING',

    UNIVERSAL_DATA_SET: 'UNIVERSAL_DATA_SET',
    UNIVERSAL_DATA_GET: 'UNIVERSAL_DATA_GET',
    UNIVERSAL_DATA_SAVE: 'UNIVERSAL_DATA_SAVE',

    RESET_APP_INIT: 'RESET_APP_INIT',
    RESET_APP: 'RESET_APP',
  },
  validationFor: {
    LANDING_PAGE: 'LANDING_PAGE'
  },
  validationMsg: {
    success: 'Success',
    warning: 'Warning',
    error: 'error',
    selectCountry: 'Please select country',
    selectLanguage: 'Please select language',
    offline: 'Data can not be loaded as you are offline'
  },
  screenTxt: screenTexts,
  window: {
    WINDOW: Dimensions.get('window'),
    WINDOW_HEIGHT: Dimensions.get('window').height,
    WINDOW_WIDTH: Dimensions.get('window').width,
  },
  layouts: {
    CONTENT_PREFIX: 'manualcontent',
    TEXT_CONTENT: 'manualcontent_text',
    BUSINESS_ENTRY: 'manualcontent_businessunitentry',
    BUSINESS_ENTRY_OLD: 'businessunitentry',
    IMAGE_COLLECTION: 'manualcontent_imagegrid',
    PRODUCT_GROUPS: 'PRODUCT_GROUPS',
    PRODUCT_GROUPS_OVERVIEW: 'productgroupoverview',
    PRODUCT_GROUP_LIST: 'productgrouplist',
    PRODUCT_LIST: 'productlist',
    PRODUCT_DETAILS: 'productdetails',
    RIBBON: 'manualcontent_ribbon',
    HEADLINE_TEXT: 'manualcontent_headlinetext',
    IMAGE_HEADLINE_TEXT: 'manualcontent_imageheadlinetext',
    IMAGE_HEADLINE_TEXT_FIFTY_FIFTY: 'manualcontent_imageheadlinetextfiftyfifty',
    FULLWIDTHIMAGE: 'manualcontent_image',
    IMAGEHEADLINETEXTTWOCOL: 'manualcontent_imageheadlinetexttwocol',
    IMAGEHEADLINETEXTTHREECOL: 'manualcontent_imageheadlinetextthreecol',
    IMAGEHEADLINETEXTFOURCOL: 'manualcontent_imageheadlinetextfourcol',
    HORIZOANTAL_RULE: 'manualcontent_horizontalrule',
    ANCHOR: 'manualcontent_anchor',
    TABLE: 'manualcontent_table',
  },
  // manualcontent_text
  apiNames: {
    COUNTRY_LANGUAGE_GET: 'country',
    PRODUCT_FINDER_GET: 'productFinder',
    PAGE_CONTENT_GET: 'content',
    PRODUCT_GROUP_GET: 'productgroup',
    SUB_PRODUCT_GROUP_GET: 'subProductGroupGet',
    PRODUCT_LIST: 'productlist',
    PRODUCT_DETAILS: 'productDetails',
    STRUCTURE_GET: 'structure',
    TRANSLATION_GET: 'translation',
    SEARCH: 'search'
  },
  productDetailsDataSequence: {
    RIBBON: 'ribbon',
    ANCHOR: 'anchor',
    TECH_DATA: 'techdata',
    EQUIPMENT: 'equipment',
    FEATURE_BENEFITS: 'featureBenefits',
    DOCUMENTS: 'documents',
    VIDEOS: 'videos',
    ROOTLINE: 'rootline',
    ACCESSORIES: 'accessories',
    // DETERGENTS: 'detergents',
    CLEANING_AGENTS: 'detergents',
    DETERGENT_WARNINGS: 'detergentWarnings',
    RECOMMENDATIONS: 'recommendations',
    APPLICATIONS: 'applications',
    COMPATIBLEMACHINES: 'compatibleProducts',
    CONFIGURABLECOMPONENTS: 'configurableComponents'
  },
  favouriteTypes: {
    PRODUCT_DETAILS: 'productDetails',
    PRODUCT_LIST: 'productgrouplist',
    PRODUCT_GROUP_LIST: 'productgroupoverview',
    MANUAL_CONTENT: 'manualcontent',
    COMPARE_FAVOURITE: 'compareFavourite'
  },
  favouriteModalTypes: {
    SAVE: 'save',
    EDIT: 'edit',
    DUPLICATE: 'duplicate'
  },
  navDirection: {
    LEFT_NAV: 'leftNav',
    RIGHT_NAV: 'rightNav'
  },
  downloadingFlags: {
    NONE: 'none',
    DOWNLOADING: 'downloading',
    DOWNLOADED: 'downloaded'
  },
  catelogueTypes: {
    PROFFESSIONAL: 'pro',
    HOME_AND_GARDEN: 'hg'
  },
  searchTabs: [
    { key: 'hg', lable: 'HOME & GARDEN' },
    { key: 'pro', lable: 'PROFESSIONAL' },
    { key: 'accessories', lable: 'ACCESSORIES' },
    { key: 'detergents', lable: 'DETERGENTS' },
    { key: 'content', lable: 'CONTENT' },
  ],
  firebaseGenericPage: 'Generic',
  firebaseEvents: {
    PRODUCT_COMPARE_ADDED: 'Product_added_to_comparison',
    FAVORITE_ADDED: 'Favorite_created',
    TEXT_MARKED: 'Text_marked',
    COMMENT_ADDED: 'Comment_created',
    SEARCH_RESULT: 'Search_request',
    EXPORT_PRODUCT_DETAILS: 'Export_triggered',
    POWER_SAVING_TOGGLE: 'Power_Saving_Toggle',
    PRODUCT_RECOMMENDATION: 'Product_recommendation'
  },
  analyticsEvents: {
    PAGE_STATE: 'a.state',
    PRODUCT_COMPARE_ADDED: 'Product_added_to_comparison',
    FAVORITE_ADDED: 'Favorite_created',
    TEXT_MARKED: 'Text_marked',
    COMMENT_ADDED: 'Comment_created',
    SEARCH_RESULT: 'Search_request',
    EXPORT_PRODUCT_DETAILS: 'Export_triggered',
    POWER_SAVING_TOGGLE: 'Power_Saving_Toggle',
    PRODUCT_RECOMMENDATION: 'Product_recommendation'
  },
  onBoardingFlags: {
    PENDING: 'pending',
    VIEWED: 'viewed'
  },
  textCasing: {
    U: 'upperCase',
    L: 'lowerCase',
    UF: 'firstLetterUpperCase',
    N: 'Normal'
  },
  onBoardingSteps: {
    ROOT: 'root',
    LOGO: 'logo',
    SCANNER: 'scanner',
    ONLINE_OFFLINE_INDICATOR: 'onlineOfflineIndicator',
    FAVORITE: 'favorite',
    PRODUCT_COMPARE: 'productCompare',
    MORE_INFORMATION_RIBBON: 'moreInformationRibbon',
    ORDER_NUMBER: 'orderNumber',
    EXPORT: 'export',
    DOWNLOAD: 'download',
    CHANGE_LANGUAGE: 'changeLanguage',
    PLAY_ONBOARDING: 'playOnboarding'
  },
  filterTypes: {
    SLIDER: 'slider',
    CHECKBOX_GROUP: 'group',
    CHECKBOX: 'checkbox'
  },
  resetAllFilter: 'RESET_ALL_FILTER',
  alertTypes: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
  },
  netType: {
    WIFI: 'wifi',
    CELLULAR: 'cellular'
  },
  updatedAppVersionType: {
    MAJOR: 'major',
    MINOR: 'minor',
    PATCH: 'patch',
    NONE: 'none'
  },
  appFonts: {
    clanProNarrBold: 'ClanPro-NarrBold.otf',
    clanProNarrBook: 'ClanPro-NarrBook.otf',
  },
  settingsModal: {
    IMPRINTS: 'imprints',
    PRIVACY_POLICY: 'privacyPolicy'
  },
  PAST_PRODUCT: 'pastproduct'
};
