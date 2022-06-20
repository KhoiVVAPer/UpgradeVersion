import { all } from 'redux-saga/effects';
import getTranslation from './translationSaga';
import getStructure from './structureSaga';
import getCountriesSaga from './countriesSaga';
import getProductFinderSaga from './productFinderSaga';
import getPageDataSaga from './pageDataSaga';
import getProductsSaga from './productGroupSaga';
import getSubProductGroupSaga from './subProductGroupSaga';
import getSubProductGroupArrSaga from './subProductGroupArrSaga';
import { toggleProductCompareSaga, setFavouriteProductCompareSaga } from './productCompareSaga';
import getProductListSaga from './productListSaga';
import getProductDetailsSaga from './productDetailsSaga';
import {
  saveFavouriteContent,
  saveFavouriteFolder,
  getFavouriteContent,
  editFavouriteContent,
  editFavouriteFolder,
  deleteFavouriteContent,
  deleteFavouriteFolder,
  duplicateFavouriteFolder,
  updateFavouritePositionSaga
} from './favouriteSaga';
import {
  getMarkingDataSaga,
  saveMarkingDataSaga,
  deleteMarkingDataSaga
} from './textMarkingSaga';
import {
  getOfflineDownload,
  saveOfflineDownload,
  resetOfflineDownload
} from './offlineDownloadSaga';
import {
  getMediaUrl,
  saveMediaUrl
} from './mediaUrlSaga';
import {
  getUniversalData, saveUniversal
} from './universalSaga';
import resetAppSaga from './resetAppSaga';

function* rootSaga() {
  yield all([
    getTranslation(),
    getStructure(),
    getCountriesSaga(),
    getProductFinderSaga(),
    getPageDataSaga(),
    getProductsSaga(),
    getSubProductGroupSaga(),
    getSubProductGroupArrSaga(),
    getProductListSaga(),
    getProductDetailsSaga(),
    saveFavouriteContent(),
    saveFavouriteFolder(),
    updateFavouritePositionSaga(),
    getFavouriteContent(),
    editFavouriteContent(),
    editFavouriteFolder(),
    deleteFavouriteContent(),
    deleteFavouriteFolder(),
    duplicateFavouriteFolder(),
    toggleProductCompareSaga(),
    setFavouriteProductCompareSaga(),
    resetAppSaga(),
    getMarkingDataSaga(),
    saveMarkingDataSaga(),
    deleteMarkingDataSaga(),
    getOfflineDownload(),
    saveOfflineDownload(),
    resetOfflineDownload(),
    getMediaUrl(),
    saveMediaUrl(),
    getUniversalData(),
    saveUniversal()
  ]);
}

export default rootSaga;
