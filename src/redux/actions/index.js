import getContries from './countriesAction';
import productFinder from './productFinderAction';
import getPageData from './pageDataAction';
import getProductList from './productListAction';
import { getSubProductGroups, getSubProductGroupsArr } from './subProductGroupAction';
import {
  getFavourite,
  saveFavouriteContent,
  editFavouriteContent,
  editFavouriteFolder,
  deleteFavouriteContent,
  deleteFavouriteFolder,
  saveFavouriteFolder,
  duplicateFavouriteFolder,
  resetFavouriteData,
  updateFavouritePosition
} from './favouriteAction';
import getProductDetails from './productDetailsAction';
import { toggleProductCompare, setFavouriteProductCompare } from './productCompareAction';
import resetApp from './resetAppAction';
import getTranslationData from './translationAction';
import getProductGroups from './productGroupAction';
import getStructureList from './structureAction';
import {
  getOfflineDownload,
  saveOfflineDownload,
  resetOfflineDownload
} from './offlineDownloadAction';
import {
  getMediaUrl,
  saveMediaUrl
} from './mediaUrlAction';
import {
  getUniversalData,
  saveUniversalData
} from './universalAction';
import {
  getMarkingText,
  saveMarkingText,
  deleteMarkingText
} from './textMarkingAction';

export {
  getContries,
  productFinder,
  getPageData,
  getProductList,
  getSubProductGroups,
  getSubProductGroupsArr,
  getFavourite,
  saveFavouriteContent,
  editFavouriteContent,
  editFavouriteFolder,
  deleteFavouriteContent,
  deleteFavouriteFolder,
  saveFavouriteFolder,
  duplicateFavouriteFolder,
  resetFavouriteData,
  getProductDetails,
  toggleProductCompare,
  setFavouriteProductCompare,
  resetApp,
  getTranslationData,
  getProductGroups,
  getStructureList,
  getOfflineDownload,
  saveOfflineDownload,
  resetOfflineDownload,
  getMarkingText,
  saveMarkingText,
  deleteMarkingText,
  getMediaUrl,
  saveMediaUrl,
  getUniversalData,
  saveUniversalData,
  updateFavouritePosition
};
