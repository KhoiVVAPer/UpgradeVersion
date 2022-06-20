import * as globals from './globals';
import * as helpers from './helpers';

const refHandler = {
  showDownloadModal: () => {
    const dowloadModalRef = globals.GET_APP_DATA('dowloadModalRef');
    dowloadModalRef.showDownloadModal();
  },
  hideDownloadModal: () => {
    const dowloadModalRef = globals.GET_APP_DATA('dowloadModalRef');
    dowloadModalRef.hideModal();
  },
  setDownoadImageCount: (count) => {
    const dowloadModalRef = globals.GET_APP_DATA('dowloadModalRef');
    dowloadModalRef.setTotalImages(count);
  },
  setDownloadModalLoading: (flag) => {
    const dowloadModalRef = globals.GET_APP_DATA('dowloadModalRef');
    dowloadModalRef.setLoadingState(flag);
  },
  setupDownloadModal: (percent) => {
    const dowloadModalRef = globals.GET_APP_DATA('dowloadModalRef');
    dowloadModalRef.setupModal(percent);
  },
  configDownloadModal: (percent) => {
    const dowloadModalRef = globals.GET_APP_DATA('dowloadModalRef');
    dowloadModalRef.configureDownloadModal(percent);
  },
  showAlert: (alertData) => {
    const alertRef = globals.GET_APP_DATA('alertRef');
    alertRef(alertData);
  },
  checkHeaderDownload: () => {
    const headerRef = globals.GET_APP_DATA('headerRef');
    headerRef.checkDownloadStatus();
  },
  toggleDownloadIco: (flag) => {
    const headerRef = globals.GET_APP_DATA('headerRef');
    headerRef.toggleDownloadingIco(flag);
  },
  toggleLoader: (flag, cb = () => {}) => {
    const toggleLoader = globals.GET_APP_DATA('pageLoaderRef');
    toggleLoader(flag, cb);
  },
  cancelDbDownload: (cb = () => {}) => {
    const dbDownloadTask = globals.GET_APP_DATA('dbDownloadTask');
    if (dbDownloadTask) dbDownloadTask.stop(cb);
  },
  cancelMediaDownload: (cb = () => {}) => {
    const mediaDownloadTask = globals.GET_APP_DATA('mediaDownloadTask');
    if (mediaDownloadTask) mediaDownloadTask.stop(cb);
  },
  processOfflineDownload: async () => {
    const state = await helpers.getConnectionInfo();
    const headerRef = globals.GET_APP_DATA('headerRef');
    headerRef.processOfflineDownload(state);
  },
  downloadInit: (obj) => {
    const dowloadModalRef = globals.GET_APP_DATA('dowloadModalRef');
    dowloadModalRef.downloadInit(obj);
  },
  setUnziping: (zipName) => {
    let mediaUnzipingArr = globals.GET_APP_DATA('mediaUnzipingArr');
    if (zipName) mediaUnzipingArr = [...mediaUnzipingArr, zipName];
    globals.SET_APP_DATA('mediaUnzipingArr', mediaUnzipingArr);

    const dowloadModalRef = globals.GET_APP_DATA('dowloadModalRef');
    dowloadModalRef.setMediaUnzipState(mediaUnzipingArr);
  },
  unsetUnziping: (zipName) => {
    let mediaUnzipingArr = globals.GET_APP_DATA('mediaUnzipingArr');
    mediaUnzipingArr = mediaUnzipingArr.filter((item) => (item !== zipName));
    globals.SET_APP_DATA('mediaUnzipingArr', mediaUnzipingArr);

    const dowloadModalRef = globals.GET_APP_DATA('dowloadModalRef');
    dowloadModalRef.setMediaUnzipState(mediaUnzipingArr);
  },
};

export default refHandler;
